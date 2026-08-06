const crypto = require('crypto');

function parseCookie(header) {
  const m = (header || '').match(/(?:^|;\s*)_klot_admin=([^;]+)/);
  return m ? m[1] : null;
}

function validateSession(cookie, secret) {
  if (!cookie || !secret) return false;
  const parts = cookie.split('.');
  if (parts.length < 2) return false;
  const [ts, mac] = parts;
  if (!ts || !mac) return false;
  if (Date.now() - parseInt(ts, 10) > 8 * 3600 * 1000) return false;
  const expected = crypto.createHmac('sha256', secret).update(ts).digest('hex');
  try {
    return crypto.timingSafeEqual(Buffer.from(mac, 'hex'), Buffer.from(expected, 'hex'));
  } catch { return false; }
}

// Confirms a Paystack transaction actually succeeded — the client-side "callback"
// firing is not proof of payment, so orders must never be trusted without this.
async function verifyPaystackTransaction(reference, secretKey) {
  const r = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
    headers: { Authorization: `Bearer ${secretKey}` },
  });
  if (!r.ok) return null;
  const data = await r.json();
  if (!data || !data.status || !data.data) return null;
  return data.data;
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'same-origin');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,x-klot-session');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const redisUrl   = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
  const secret     = process.env.KLOT_ADMIN_SECRET || '';

  if (!redisUrl || !redisToken) return res.status(500).json({ error: 'Redis not configured' });

  // POST — public: called from storefront after the Paystack popup reports success.
  // That report alone is client-controlled and not trustworthy — verify with Paystack
  // directly before ever writing an order.
  if (req.method === 'POST') {
    const o = req.body || {};
    if (!o.id || !o.email) return res.status(400).json({ error: 'Missing id or email' });

    const paystackSecret = process.env.PAYSTACK_SECRET_KEY;
    if (!paystackSecret) return res.status(503).json({ error: 'Payment verification not configured' });

    const tx = await verifyPaystackTransaction(o.id, paystackSecret).catch(() => null);
    if (!tx || tx.status !== 'success') {
      return res.status(402).json({ error: 'Payment could not be verified' });
    }
    const expectedKobo = Math.round((o.total || 0) * 100);
    if (tx.amount !== expectedKobo) {
      return res.status(402).json({ error: 'Payment amount does not match order total' });
    }

    // Idempotency: if this reference was already saved (e.g. a client retry), confirm
    // success without duplicating it — checked against the actual order list, not a
    // separate flag, so a failed write below can never leave behind a permanent false
    // "already recorded" block on a reference that was never actually saved.
    const existing = await fetch(`${redisUrl}/lrange/klot:orders/0/999`, {
      headers: { Authorization: `Bearer ${redisToken}` },
    }).then(r => r.json()).catch(() => ({ result: [] }));
    const alreadySaved = (existing.result || []).some(s => {
      try { return JSON.parse(s).id === o.id; } catch { return false; }
    });
    if (alreadySaved) return res.status(200).json({ ok: true });

    const entry = JSON.stringify({
      id:          o.id,
      customer:    o.customer    || '',
      email:       o.email       || '',
      phone:       o.phone       || '',
      address:     o.address     || '',
      items:       o.items       || 0,
      itemDetails: o.itemDetails || [],
      total:       o.total       || 0,
      status:      'processing',
      date:        o.date        || new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      ts:          new Date().toISOString(),
    });
    const pipeRes = await fetch(`${redisUrl}/pipeline`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${redisToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify([
        ['LPUSH', 'klot:orders', entry],
        ['LTRIM', 'klot:orders', '0', '999'],
      ]),
    }).catch(() => null);
    const pipeData = pipeRes ? await pipeRes.json().catch(() => null) : null;
    const writeFailed = !pipeRes || !pipeRes.ok || !Array.isArray(pipeData) || pipeData.some(r => r && r.error);
    if (writeFailed) {
      return res.status(500).json({ error: 'Failed to save order — please contact support with your payment reference' });
    }
    return res.status(200).json({ ok: true });
  }

  // GET and PATCH require a valid admin session (x-klot-session header preferred; cookie fallback)
  const sessionToken = req.headers['x-klot-session'] || parseCookie(req.headers.cookie);
  if (!validateSession(sessionToken, secret)) return res.status(401).json({ error: 'Unauthorized' });

  // GET — return all orders newest-first
  if (req.method === 'GET') {
    const r = await fetch(`${redisUrl}/lrange/klot:orders/0/999`, {
      headers: { Authorization: `Bearer ${redisToken}` },
    });
    const data = await r.json();
    const orders = (data.result || []).map(s => {
      try { return JSON.parse(s); } catch { return null; }
    }).filter(Boolean);
    return res.status(200).json({ orders });
  }

  // PATCH — update order status in place
  if (req.method === 'PATCH') {
    const { id, status } = req.body || {};
    if (!id || !status) return res.status(400).json({ error: 'Missing id or status' });
    const validStatuses = ['processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) return res.status(400).json({ error: 'Invalid status' });

    const r = await fetch(`${redisUrl}/lrange/klot:orders/0/999`, {
      headers: { Authorization: `Bearer ${redisToken}` },
    });
    const data = await r.json();
    const entries = data.result || [];

    let foundIndex = -1;
    let updatedEntry = null;
    for (let i = 0; i < entries.length; i++) {
      try {
        const o = JSON.parse(entries[i]);
        if (o.id === id) { o.status = status; updatedEntry = JSON.stringify(o); foundIndex = i; break; }
      } catch {}
    }

    if (foundIndex === -1) return res.status(404).json({ error: 'Order not found' });

    await fetch(`${redisUrl}/pipeline`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${redisToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify([['LSET', 'klot:orders', String(foundIndex), updatedEntry]]),
    });
    return res.status(200).json({ ok: true });
  }

  return res.status(405).end();
};

export default async function handler(req, res) {
  // Always respond 200 immediately so Resend doesn't retry
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(200).json({ ok: true });

  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  // Parse body — Vercel may pass it already parsed or as raw string
  let event = req.body;
  if (typeof event === 'string') {
    try { event = JSON.parse(event); } catch { event = null; }
  }

  // Store raw debug entry regardless of type so we can inspect Resend payloads
  if (redisUrl && redisToken) {
    const debug = {
      ts: new Date().toISOString(),
      type: event?.type || 'unknown',
      raw: JSON.stringify(event || req.body || '').slice(0, 2000),
    };
    await fetch(`${redisUrl}/pipeline`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${redisToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify([
        ['LPUSH', 'klot:webhook-log', JSON.stringify(debug)],
        ['LTRIM', 'klot:webhook-log', '0', '19'],
      ]),
    }).catch(() => {});
  }

  if (!event || event.type !== 'email.received') return res.status(200).json({ ok: true });

  if (!redisUrl || !redisToken) return res.status(200).json({ ok: true });

  try {
    const d = event.data || {};
    const fromAddr = (d.from || '').toLowerCase();

    // Skip our own outbound notification emails (contact form → info@klotworld.com)
    // These are already stored with full body by /api/store-contact
    if (fromAddr.includes('klotworld.com')) return res.status(200).json({ ok: true });

    const email = {
      id: d.email_id || String(Date.now()),
      from: d.from || '',
      to: Array.isArray(d.to) ? d.to[0] : (d.to || ''),
      subject: d.subject || '(no subject)',
      text: (d.text || '').slice(0, 5000),
      html: (d.html || '').slice(0, 10000),
      receivedAt: event.created_at || new Date().toISOString(),
    };

    await fetch(`${redisUrl}/pipeline`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${redisToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify([
        ['LPUSH', 'klot:inbox', JSON.stringify(email)],
        ['LTRIM', 'klot:inbox', '0', '99'],
      ]),
    });
  } catch (e) {
    // Swallow — Resend must always get 200
  }

  return res.status(200).json({ ok: true });
}

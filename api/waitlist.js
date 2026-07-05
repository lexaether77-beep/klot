export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'same-origin');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-klot-token');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const redisUrl   = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
  const adminSecret = process.env.KLOT_ADMIN_SECRET;

  if (!redisUrl || !redisToken) return res.status(500).json({ error: 'Redis not configured' });

  // POST — add a waitlist entry (public)
  if (req.method === 'POST') {
    const { email, product, productId } = req.body || {};
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Valid email required' });
    }
    const entry = JSON.stringify({ email, product: product || '', productId: productId || null, ts: new Date().toISOString() });
    await fetch(`${redisUrl}/rpush/klot:waitlist`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${redisToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify([entry]),
    });
    return res.status(200).json({ ok: true });
  }

  // GET — return all entries (admin only)
  if (req.method === 'GET') {
    const token = req.headers['x-klot-token'];
    if (!adminSecret || !token || token !== adminSecret) return res.status(401).json({ error: 'Unauthorized' });
    const r = await fetch(`${redisUrl}/lrange/klot:waitlist/0/-1`, {
      headers: { Authorization: `Bearer ${redisToken}` },
    });
    const data = await r.json();
    const entries = (data.result || []).map(function(s) {
      try { return JSON.parse(s); } catch(e) { return { raw: s }; }
    });
    return res.status(200).json({ entries });
  }

  return res.status(405).end();
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'same-origin');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-klot-token');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const redisUrl    = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken  = process.env.UPSTASH_REDIS_REST_TOKEN;
  const adminSecret = process.env.KLOT_ADMIN_SECRET;

  if (!redisUrl || !redisToken) return res.status(500).json({ error: 'Redis not configured' });

  const productId = req.query?.productId ?? req.body?.productId;
  const key       = productId != null ? `klot:reviews:${productId}` : null;

  // GET — fetch reviews for a product (public)
  if (req.method === 'GET') {
    if (!key) return res.status(400).json({ error: 'productId required' });
    const r = await fetch(`${redisUrl}/lrange/${key}/0/-1`, {
      headers: { Authorization: `Bearer ${redisToken}` },
    });
    const data = await r.json();
    const reviews = (data.result || []).map(s => {
      try { return JSON.parse(s); } catch(e) { return null; }
    }).filter(Boolean);
    return res.status(200).json({ reviews });
  }

  // POST — submit a new review (public)
  if (req.method === 'POST') {
    if (!key) return res.status(400).json({ error: 'productId required' });
    const { name, rating, body } = req.body || {};
    if (!name || !rating || !body) return res.status(400).json({ error: 'name, rating, and body are required' });
    if (typeof rating !== 'number' || rating < 1 || rating > 5) return res.status(400).json({ error: 'rating must be 1–5' });
    if (body.length < 10 || body.length > 600) return res.status(400).json({ error: 'Review must be 10–600 characters' });

    const entry = JSON.stringify({
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      productId,
      name: name.slice(0, 40),
      rating,
      body: body.slice(0, 600),
      ts: new Date().toISOString(),
    });

    await fetch(`${redisUrl}/rpush/${key}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${redisToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify([entry]),
    });

    return res.status(200).json({ ok: true });
  }

  // DELETE — remove a review by id (admin only)
  if (req.method === 'DELETE') {
    const token = req.headers['x-klot-token'];
    if (!adminSecret || !token || token !== adminSecret) return res.status(401).json({ error: 'Unauthorized' });
    if (!key) return res.status(400).json({ error: 'productId required' });
    const { id } = req.body || {};
    if (!id) return res.status(400).json({ error: 'id required' });

    const r = await fetch(`${redisUrl}/lrange/${key}/0/-1`, {
      headers: { Authorization: `Bearer ${redisToken}` },
    });
    const data = await r.json();
    const kept = (data.result || []).filter(s => {
      try { return JSON.parse(s).id !== id; } catch(e) { return true; }
    });

    // Rewrite the list atomically
    const pipeline = [['DEL', key], ...kept.map(s => ['RPUSH', key, s])];
    await fetch(`${redisUrl}/pipeline`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${redisToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(pipeline),
    });

    return res.status(200).json({ ok: true });
  }

  return res.status(405).end();
}

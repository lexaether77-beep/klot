export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'same-origin');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-klot-token');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const redisUrl   = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
  const adminSecret = process.env.KLOT_ADMIN_SECRET;

  if (!redisUrl || !redisToken) {
    return res.status(500).json({ error: 'Redis not configured' });
  }

  // ── GET: return products stored in Redis ──────────────────────────────────
  if (req.method === 'GET') {
    try {
      const r = await fetch(`${redisUrl}/get/klot:products`, {
        headers: { Authorization: `Bearer ${redisToken}` },
      });
      const data = await r.json();
      if (!data.result) return res.status(200).json({ products: null });
      const products = typeof data.result === 'string'
        ? JSON.parse(data.result)
        : data.result;
      return res.status(200).json({ products });
    } catch (e) {
      return res.status(200).json({ products: null });
    }
  }

  // ── POST: save products to Redis (admin only) ─────────────────────────────
  if (req.method === 'POST') {
    const token = req.headers['x-klot-token'];
    if (!adminSecret || !token || token !== adminSecret) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const { products } = req.body || {};
    if (!Array.isArray(products) || !products.length) {
      return res.status(400).json({ error: 'products must be a non-empty array' });
    }
    try {
      await fetch(`${redisUrl}/pipeline`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${redisToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify([
          ['SET', 'klot:products', JSON.stringify(products)],
        ]),
      });
      return res.status(200).json({ ok: true, count: products.length });
    } catch (e) {
      return res.status(500).json({ error: 'Failed to save' });
    }
  }

  return res.status(405).end();
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!redisUrl || !redisToken) {
    return res.status(200).json({ emails: [], configured: false });
  }

  try {
    const r = await fetch(`${redisUrl}/lrange/klot:inbox/0/99`, {
      headers: { Authorization: `Bearer ${redisToken}` },
    });
    const data = await r.json();
    const emails = (data.result || []).map(item => {
      try { return JSON.parse(item); } catch { return null; }
    }).filter(Boolean);
    return res.status(200).json({ emails, configured: true });
  } catch (e) {
    return res.status(500).json({ error: e.message, emails: [], configured: true });
  }
}

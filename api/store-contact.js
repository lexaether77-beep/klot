export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!redisUrl || !redisToken) return res.status(500).json({ error: 'Redis not configured' });

  const { from, subject, html, text } = req.body || {};
  if (!from || !subject) return res.status(400).json({ error: 'Missing fields' });

  const email = {
    id: 'cf-' + Date.now(),
    from,
    to: 'info@klotworld.com',
    subject,
    html: html || '',
    text: text || '',
    receivedAt: new Date().toISOString(),
  };

  await fetch(`${redisUrl}/pipeline`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${redisToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify([
      ['LPUSH', 'klot:inbox', JSON.stringify(email)],
      ['LTRIM', 'klot:inbox', '0', '99'],
    ]),
  });

  return res.status(200).json({ ok: true });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!redisUrl || !redisToken) {
    return res.status(500).json({ error: 'UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN not configured' });
  }

  const event = req.body;
  if (!event || event.type !== 'email.received') return res.status(200).json({ ok: true });

  const d = event.data || {};
  const email = {
    id: d.email_id || crypto.randomUUID(),
    from: d.from || '',
    to: Array.isArray(d.to) ? d.to[0] : (d.to || ''),
    subject: d.subject || '(no subject)',
    text: d.text || '',
    html: d.html || '',
    receivedAt: event.created_at || new Date().toISOString(),
  };

  const pipeline = [
    ['LPUSH', 'klot:inbox', JSON.stringify(email)],
    ['LTRIM', 'klot:inbox', '0', '99'],
  ];

  await fetch(`${redisUrl}/pipeline`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${redisToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(pipeline),
  });

  return res.status(200).json({ ok: true });
}

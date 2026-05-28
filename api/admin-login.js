module.exports = function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'same-origin');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const adminPassword = process.env.KLOT_ADMIN_PASSWORD;

  if (!adminPassword) {
    return res.status(503).json({ error: 'Server not configured' });
  }

  const body     = req.body || {};
  const username = (body.username || '').trim().toLowerCase();
  const password = body.password || '';

  if (username !== 'admin' || password !== adminPassword) {
    return res.status(200).json({ ok: false, error: 'Invalid credentials' });
  }

  return res.status(200).json({ ok: true });
};

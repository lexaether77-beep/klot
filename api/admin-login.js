const crypto = require('crypto');

function createSessionToken(secret) {
  const ts  = Date.now().toString();
  const mac = crypto.createHmac('sha256', secret).update(ts).digest('hex');
  return `${ts}.${mac}`;
}

module.exports = function handler(req, res) {
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const adminPassword = process.env.KLOT_ADMIN_PASSWORD;
  const adminSecret   = process.env.KLOT_ADMIN_SECRET;

  if (!adminPassword || !adminSecret) {
    return res.status(503).send('Server misconfigured: set KLOT_ADMIN_PASSWORD and KLOT_ADMIN_SECRET in Vercel.');
  }

  const body = req.body || {};
  const password = typeof body === 'string' ? JSON.parse(body).password : body.password;

  if (!password || password !== adminPassword) {
    return res.status(401).json({ error: 'Incorrect password' });
  }

  const token  = createSessionToken(adminSecret);
  const maxAge = 8 * 60 * 60;
  res.setHeader('Set-Cookie', `_klot_admin=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${maxAge}`);
  return res.status(200).json({ ok: true });
};

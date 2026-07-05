const crypto = require('crypto');

function createAdminToken(secret) {
  const ts  = Date.now().toString();
  const mac = crypto.createHmac('sha256', secret).update(ts).digest('hex');
  return `${ts}.${mac}`;
}

module.exports = function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'same-origin');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const adminPassword = process.env.KLOT_ADMIN_PASSWORD;
  const adminSecret   = process.env.KLOT_ADMIN_SECRET || '';

  if (!adminPassword) {
    return res.status(503).json({ error: 'Server not configured' });
  }

  const body     = req.body || {};
  const username = (body.username || '').trim().toLowerCase();
  const password = body.password || '';

  if (username !== 'admin' || password !== adminPassword) {
    return res.status(200).json({ ok: false, error: 'Invalid credentials' });
  }

  if (adminSecret) {
    const token = createAdminToken(adminSecret);
    res.setHeader('Set-Cookie', `_klot_admin=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${8 * 3600}`);
  }

  return res.status(200).json({ ok: true, token: adminSecret });
};

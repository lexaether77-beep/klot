import crypto from 'crypto';

function createSessionToken(secret) {
  const ts = Date.now().toString();
  const mac = crypto.createHmac('sha256', secret).update(ts).digest('hex');
  return `${ts}.${mac}`;
}

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'same-origin');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const adminPassword = process.env.KLOT_ADMIN_PASSWORD;
  const adminSecret   = process.env.KLOT_ADMIN_SECRET;

  if (!adminPassword || !adminSecret) {
    return res.status(503).send(loginPage('Server not configured. Set KLOT_ADMIN_PASSWORD and KLOT_ADMIN_SECRET in Vercel environment variables.'));
  }

  const { password } = req.body || {};

  if (!password || password !== adminPassword) {
    return res.status(200).send(loginPage('Incorrect password. Try again.'));
  }

  const token = createSessionToken(adminSecret);
  const maxAge = 8 * 60 * 60; // 8 hours

  res.setHeader('Set-Cookie', `_klot_admin=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${maxAge}`);
  res.setHeader('Location', '/admin');
  return res.status(302).end();
}

function loginPage(errorMsg) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>KLOT Admin — Sign In</title>
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{background:#0D0D0D;min-height:100vh;display:flex;align-items:center;justify-content:center;font-family:'Inter',sans-serif}
.box{width:100%;max-width:400px;padding:56px 48px;border:1px solid rgba(184,151,74,.25);background:rgba(255,255,255,.03)}
.logo{font-family:'Barlow Condensed',sans-serif;font-size:28px;font-weight:600;color:#f5f5f5;letter-spacing:.08em;text-align:center;margin-bottom:6px}
.logo span{color:#FF2D2D;font-style:italic}
.sub{font-size:13px;color:rgba(245,240,232,.35);text-align:center;letter-spacing:.05em;margin-bottom:40px}
label{display:block;font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:rgba(245,240,232,.45);margin-bottom:8px}
input[type=password]{width:100%;padding:14px 16px;background:rgba(255,255,255,.05);border:1px solid rgba(184,151,74,.2);color:#f5f5f5;font-family:'Inter',sans-serif;font-size:14px;outline:none;margin-bottom:20px}
input[type=password]:focus{border-color:#FF2D2D}
button{width:100%;padding:15px;background:#FF2D2D;border:none;color:#fff;font-family:'Inter',sans-serif;font-size:11px;letter-spacing:.25em;text-transform:uppercase;cursor:pointer}
button:hover{background:#e01f1f}
.err{background:rgba(248,113,113,.1);border:1px solid rgba(248,113,113,.3);color:#fca5a5;font-size:12px;padding:10px 14px;margin-bottom:20px;text-align:center}
</style>
</head>
<body>
<div class="box">
  <div class="logo">KL<span>Ø</span>T</div>
  <div class="sub">Admin Access — Restricted</div>
  ${errorMsg ? `<div class="err">${errorMsg}</div>` : ''}
  <form method="POST" action="/api/admin-login">
    <label for="password">Password</label>
    <input type="password" id="password" name="password" autofocus autocomplete="current-password">
    <button type="submit">Sign In</button>
  </form>
</div>
</body>
</html>`;
}

const crypto = require('crypto');
const fs     = require('fs');
const path   = require('path');

function validateSession(cookie, secret) {
  if (!cookie || !secret) return false;
  const [ts, mac] = cookie.split('.');
  if (!ts || !mac) return false;
  if (Date.now() - parseInt(ts, 10) > 8 * 60 * 60 * 1000) return false;
  const expected = crypto.createHmac('sha256', secret).update(ts).digest('hex');
  try {
    return crypto.timingSafeEqual(Buffer.from(mac, 'hex'), Buffer.from(expected, 'hex'));
  } catch {
    return false;
  }
}

function parseCookie(header) {
  if (!header) return null;
  const match = header.match(/(?:^|;\s*)_klot_admin=([^;]+)/);
  return match ? match[1] : null;
}

module.exports = function handler(req, res) {
  const secret = process.env.KLOT_ADMIN_SECRET;
  const cookie = (req.cookies && req.cookies['_klot_admin']) || parseCookie(req.headers.cookie);

  if (!validateSession(cookie, secret)) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).send(loginPage());
  }

  try {
    const filePath = path.join(__dirname, 'admin-page.html');
    const html = fs.readFileSync(filePath, 'utf8');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
    res.setHeader('X-Frame-Options', 'DENY');
    return res.status(200).send(html);
  } catch (e) {
    return res.status(500).send('<h1>Admin panel unavailable</h1><p>' + e.message + '</p>');
  }
};

function loginPage() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>KLOT Admin</title>
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
button:disabled{opacity:.5;cursor:not-allowed}
.err{display:none;background:rgba(248,113,113,.1);border:1px solid rgba(248,113,113,.3);color:#fca5a5;font-size:12px;padding:10px 14px;margin-bottom:20px;text-align:center}
.back{display:block;text-align:center;margin-top:20px;font-size:11px;color:rgba(245,240,232,.3);text-decoration:none;letter-spacing:.08em}
.back:hover{color:rgba(245,240,232,.7)}
</style>
</head>
<body>
<div class="box">
  <div class="logo">KL<span>Ø</span>T</div>
  <div class="sub">Admin — Restricted Area</div>
  <div id="err" class="err"></div>
  <form id="f">
    <label>Password</label>
    <input type="password" id="pw" autofocus autocomplete="current-password">
    <button type="submit" id="btn">Sign In</button>
  </form>
  <a href="/" class="back">← Back to site</a>
</div>
<script>
document.getElementById('f').addEventListener('submit', async function(e) {
  e.preventDefault();
  var btn = document.getElementById('btn');
  var err = document.getElementById('err');
  btn.disabled = true; btn.textContent = 'Signing in…'; err.style.display = 'none';
  try {
    var r = await fetch('/api/admin-login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({password: document.getElementById('pw').value}),
      redirect: 'follow'
    });
    if (r.ok && r.url.includes('/admin')) {
      window.location.href = '/admin';
    } else if (r.redirected) {
      window.location.href = '/admin';
    } else {
      var text = await r.text();
      if (text.includes('Incorrect') || r.status === 200) {
        err.textContent = 'Incorrect password.';
      } else {
        err.textContent = 'Login failed. Try again.';
      }
      err.style.display = 'block';
      btn.disabled = false; btn.textContent = 'Sign In';
      document.getElementById('pw').value = '';
    }
  } catch(e) {
    err.textContent = 'Network error. Try again.';
    err.style.display = 'block';
    btn.disabled = false; btn.textContent = 'Sign In';
  }
});
</script>
</body>
</html>`;
}

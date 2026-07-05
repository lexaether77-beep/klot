module.exports = function handler(req, res) {
  res.setHeader('Set-Cookie', '_klot_admin=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0');
  res.setHeader('Location', '/admin');
  return res.status(302).end();
};

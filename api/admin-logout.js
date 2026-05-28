export default function handler(req, res) {
  res.setHeader('Set-Cookie', '_klot_admin=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0');
  res.setHeader('Location', '/');
  return res.status(302).end();
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'RESEND_API_KEY not set on server', configured: false });

  try {
    const r = await fetch('https://api.resend.com/domains', {
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    const data = await r.json();
    return res.status(r.ok ? 200 : r.status).json({ configured: r.ok, ...data });
  } catch (e) {
    return res.status(500).json({ error: e.message, configured: false });
  }
}

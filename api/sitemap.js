// Same slug rule as the client-side router in index.html (openPDP/slugify) — keep in sync.
function slugify(str) {
  return (str || '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function xmlEscape(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export default async function handler(req, res) {
  const redisUrl   = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  let products = [];
  if (redisUrl && redisToken) {
    try {
      const r = await fetch(`${redisUrl}/get/klot:products`, {
        headers: { Authorization: `Bearer ${redisToken}` },
      });
      const data = await r.json();
      const stored = typeof data.result === 'string' ? JSON.parse(data.result) : data.result;
      products = Array.isArray(stored) ? stored : (stored && stored.products) || [];
    } catch {
      products = [];
    }
  }

  const active = products.filter(p => (p.status || 'active') === 'active' && p.name);
  const seen = new Set();
  const urls = [
    { loc: 'https://www.klotworld.com/', changefreq: 'weekly', priority: '1.0' },
  ];
  for (const p of active) {
    const slug = slugify(p.name);
    if (!slug || seen.has(slug)) continue;
    seen.add(slug);
    urls.push({ loc: `https://www.klotworld.com/products/${slug}`, changefreq: 'weekly', priority: '0.8' });
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map(u => `  <url>\n    <loc>${xmlEscape(u.loc)}</loc>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`).join('\n') +
    `\n</urlset>\n`;

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');
  return res.status(200).send(body);
}

// Restricted fallback for the copied site's /url?q=... links.
export function whatsappDestination(raw) {
  try {
    const target = new URL(typeof raw === 'string' ? raw : '');
    if (target.protocol !== 'https:' || target.host !== 'wa.me' || target.username || target.password || target.pathname !== '/5561984718897') return null;
    const safe = new URL('https://wa.me/5561984718897');
    const message = target.searchParams.get('text');
    if (message) safe.searchParams.set('text', message.slice(0, 1000));
    return safe.href;
  } catch { return null; }
}
export default function handler(req, res) {
  if (req.method !== 'GET') { res.writeHead(405, { Allow: 'GET' }); return res.end(); }
  const target = whatsappDestination(req.query?.q ?? new URL(req.url, 'https://localhost').searchParams.get('q'));
  if (!target) { res.writeHead(404); return res.end('Link indisponível.'); }
  res.writeHead(302, { Location: target, 'Cache-Control': 'no-store' });
  res.end();
}

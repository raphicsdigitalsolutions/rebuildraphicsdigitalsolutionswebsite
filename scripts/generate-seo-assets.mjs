import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');
if (!fs.existsSync(path.join(distDir, 'index.html'))) {
  throw new Error('Production build output not found. Run this script after the Vite build.');
}

const siteUrlValue = process.env.SITE_URL?.trim();
const robotsPath = path.join(distDir, 'robots.txt');
const sitemapPath = path.join(distDir, 'sitemap.xml');
const defaultRobots = 'User-agent: *\nAllow: /\n';

if (!siteUrlValue) {
  // Do not publish the checked-in relative sitemap: sitemap loc values must be absolute URLs.
  fs.rmSync(sitemapPath, { force: true });
  fs.writeFileSync(robotsPath, defaultRobots, 'utf8');
  console.warn('[SEO] SITE_URL is not configured. Sitemap and canonical URL were omitted; configure SITE_URL before production launch.');
  process.exit(0);
}

let siteUrl;
try {
  siteUrl = new URL(siteUrlValue);
} catch {
  throw new Error('SITE_URL must be a valid absolute URL, for example https://www.example.com');
}
if (siteUrl.protocol !== 'https:' && siteUrl.hostname !== 'localhost' && siteUrl.hostname !== '127.0.0.1') {
  throw new Error('SITE_URL must use HTTPS for public production deployments.');
}
if (siteUrl.search || siteUrl.hash) {
  throw new Error('SITE_URL must not contain a query string or fragment.');
}
const siteOrigin = siteUrl.origin;
const siteBasePath = siteUrl.pathname.replace(/\/+$/, '');
const siteBaseUrl = `${siteOrigin}${siteBasePath}`;

const routes = [
  '/', '/about', '/creative', '/development', '/ai-lab',
  '/services', '/portfolio', '/reviews', '/contact',
  '/privacy', '/terms',
];

const entries = routes.map((route) => {
  const location = new URL(`${route.replace(/^\/+/, '')}`, `${siteBaseUrl}/`).href;
  return [
    '  <url>',
    `    <loc>${location}</loc>`,
    '  </url>',
  ].join('\n');
});

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...entries,
  '</urlset>',
  '',
].join('\n');

fs.writeFileSync(sitemapPath, sitemap, 'utf8');
fs.writeFileSync(robotsPath, defaultRobots + `Sitemap: ${new URL('sitemap.xml', `${siteBaseUrl}/`).href}\n`, 'utf8');

const htmlPath = path.join(distDir, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');
const canonical = `<link rel="canonical" href="${siteBaseUrl}/" />`;
const ogUrl = `<meta property="og:url" content="${siteBaseUrl}/" />`;
html = html.replace(/<link rel="canonical"[^>]*>\s*/i, '');
html = html.replace(/<meta property="og:url"[^>]*>\s*/i, '');
html = html.replace(/<head([^>]*)>/i, `<head$1>\n    ${canonical}\n    ${ogUrl}`);
fs.writeFileSync(htmlPath, html, 'utf8');

// GitHub Pages does not rewrite client-side routes to index.html. Publishing
// the same SPA shell as 404.html lets the client router resolve direct visits
// and browser refreshes on nested paths.
if (process.env.GITHUB_PAGES === 'true') {
  fs.copyFileSync(htmlPath, path.join(distDir, '404.html'));
  console.log('[Pages] Wrote SPA fallback page for nested routes.');
}

console.log(`[SEO] Generated sitemap, robots directive and canonical metadata for ${siteBaseUrl}`);

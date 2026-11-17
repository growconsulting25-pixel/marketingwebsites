// Static build: renders every page in FR + EN into dist/.
import { mkdir, writeFile, readFile, cp, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import path from 'node:path';
import config from '../site.config.mjs';
import { routes } from '../src/routes.mjs';
import { pageBuilders } from '../src/pages/index.mjs';
import { notFound } from '../src/pages/misc.mjs';
import { layout, abs } from '../src/lib/layout.mjs';
import { todos, setCurrentPage } from '../src/lib/html.mjs';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const dist = path.join(root, 'dist');
const src = path.join(root, 'src');

await rm(dist, { recursive: true, force: true });
await mkdir(path.join(dist, 'assets'), { recursive: true });

// Assets with content hashes (long-cache friendly).
await cp(path.join(src, 'assets'), path.join(dist, 'assets'), { recursive: true });
const hashed = async (rel) => {
  const buf = await readFile(path.join(dist, rel));
  return '/' + rel + '?v=' + createHash('sha1').update(buf).digest('hex').slice(0, 10);
};
const assets = { css: await hashed('assets/css/site.css'), js: await hashed('assets/js/site.js') };

// Self-hosted fonts from @fontsource (latin + latin-ext subsets).
const fontDir = path.join(dist, 'assets', 'fonts');
await mkdir(fontDir, { recursive: true });
const fonts = [
  ['@fontsource-variable/fraunces', 'fraunces-latin-opsz-normal.woff2'],
  ['@fontsource-variable/fraunces', 'fraunces-latin-ext-opsz-normal.woff2'],
  ['@fontsource-variable/fraunces', 'fraunces-latin-opsz-italic.woff2'],
  ['@fontsource-variable/instrument-sans', 'instrument-sans-latin-wght-normal.woff2'],
  ['@fontsource-variable/instrument-sans', 'instrument-sans-latin-ext-wght-normal.woff2'],
];
for (const [pkg, file] of fonts) {
  const from = path.join(root, 'node_modules', pkg, 'files', file);
  if (!existsSync(from)) { console.error(`Missing font ${from} — run npm install`); process.exit(1); }
  await cp(from, path.join(fontDir, file));
}

const write = async (urlPath, content) => {
  const file = urlPath.endsWith('/') ? path.join(dist, urlPath, 'index.html') : path.join(dist, urlPath);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, content);
};

const built = [];
for (const builder of pageBuilders) {
  for (const lang of ['fr', 'en']) {
    const before = todos.length;
    setCurrentPage('');
    const page = builder(lang);
    setCurrentPage(routes[page.id][lang]);
    for (let i = before; i < todos.length; i++) todos[i].page = routes[page.id][lang];
    const out = layout(page, assets);
    await write(routes[page.id][lang], out);
    built.push({ page, path: routes[page.id][lang] });
  }
}
// 404 pages
await write('/404.html', layout(notFound('fr'), assets));
await write('/en/404.html', layout(notFound('en'), assets));

// Sitemaps (one per language) + index.
const today = new Date().toISOString().slice(0, 10);
for (const lang of ['fr', 'en']) {
  const urls = built.filter((b) => b.page.lang === lang && !b.page.noindex).map((b) => {
    const r = routes[b.page.id];
    return `  <url><loc>${abs(r[lang])}</loc><lastmod>${today}</lastmod>
    <xhtml:link rel="alternate" hreflang="fr-CA" href="${abs(r.fr)}"/>
    <xhtml:link rel="alternate" hreflang="en-CA" href="${abs(r.en)}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(r.fr)}"/>
  </url>`;
  });
  await write(`/sitemap-${lang}.xml`, `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`);
}
await write('/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <sitemap><loc>${abs('/sitemap-fr.xml')}</loc><lastmod>${today}</lastmod></sitemap>\n  <sitemap><loc>${abs('/sitemap-en.xml')}</loc><lastmod>${today}</lastmod></sitemap>\n</sitemapindex>\n`);
await write('/robots.txt', `User-agent: *\nAllow: /\nDisallow: /merci/\nDisallow: /en/thank-you/\n\nSitemap: ${abs('/sitemap.xml')}\n`);

// Redirects (Netlify / Cloudflare Pages `_redirects` format) from the migration map.
const csv = (await readFile(path.join(root, 'migration', 'redirects.csv'), 'utf8')).split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#') && !l.startsWith('old_path'));
const redirectLines = csv.map((l) => { const [from, to, type = '301'] = l.split(','); return type === '410' ? `${from}  /404.html  410` : `${from}  ${to}  ${type}`; });
await write('/_redirects', [...redirectLines, '/en/*  /en/404.html  404', '/*  /404.html  404'].join('\n') + '\n');

// Security & caching headers (Netlify / Cloudflare Pages `_headers` format).
await write('/_headers', `/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  X-Frame-Options: SAMEORIGIN
/assets/*
  Cache-Control: public, max-age=31536000, immutable
/merci/*
  X-Robots-Tag: noindex
/en/thank-you/*
  X-Robots-Tag: noindex
`);

// Report.
const uniq = new Map();
for (const t of todos) uniq.set(t.label, (uniq.get(t.label) || 0) + 1);
await writeFile(path.join(dist, 'placeholders.json'), JSON.stringify(todos, null, 2));
console.log(`✔ Built ${built.length} pages (${built.length / 2} FR + ${built.length / 2} EN) into dist/`);
console.log(`⚠ ${todos.length} placeholder(s) to complete before launch (${uniq.size} distinct) — see dist/placeholders.json`);
if (!config.formEndpoint) console.log('⚠ formEndpoint is empty: forms run in demo mode (no data is sent). Set it in site.config.mjs.');
if (!config.analytics.ga4) console.log('⚠ analytics.ga4 is empty: no analytics will load.');
if (!config.phone) console.log('⚠ phone is empty: tap-to-call buttons are hidden.');

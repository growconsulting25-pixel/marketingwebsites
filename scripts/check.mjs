// Quality checks on dist/: internal links, FR/EN twins, titles, H1s, meta, placeholders.
// --launch makes placeholders and missing config fail the check.
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import config from '../site.config.mjs';
import { routes } from '../src/routes.mjs';
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
const launch = process.argv.includes('--launch');
const errors = []; const warns = [];

const walk = async (d) => (await Promise.all((await readdir(d, { withFileTypes: true })).map((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)])))).flat();
const files = (await walk(root)).filter((f) => f.endsWith('.html'));
const existing = new Set(files.map((f) => '/' + path.relative(root, f).replace(/index\.html$/, '').replace(/\\/g, '/')));

for (const f of files) {
  const rel = '/' + path.relative(root, f).replace(/index\.html$/, '');
  const h = await readFile(f, 'utf8');
  const title = h.match(/<title>(.*?)<\/title>/)?.[1] || '';
  const desc = h.match(/<meta name="description" content="(.*?)"/)?.[1] || '';
  const h1s = (h.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) errors.push(`${rel}: ${h1s} <h1> (expected 1)`);
  if (!rel.includes('404')) {
    if (title.length > 75) warns.push(`${rel}: title is ${title.length} chars (aim ≤ 65)`);
    if (desc && (desc.length < 70 || desc.length > 170)) warns.push(`${rel}: meta description is ${desc.length} chars (aim 120–160)`);
  }
  for (const m of h.matchAll(/href="(\/[^"#?]*)/g)) {
    const href = m[1];
    if (href.startsWith('/assets/')) continue;
    if (!existing.has(href) && !existing.has(href + '/')) errors.push(`${rel}: broken internal link → ${href}`);
  }
  for (const m of h.matchAll(/href="#([\w-]+)"/g)) if (!h.includes(`id="${m[1]}"`)) errors.push(`${rel}: missing anchor #${m[1]}`);
  if (!/<html lang="(fr|en)-CA">/.test(h)) errors.push(`${rel}: missing html lang`);
  for (const m of h.matchAll(/<img (?![^>]*alt=)[^>]*>/g)) errors.push(`${rel}: <img> without alt`);
}
for (const [id, r] of Object.entries(routes)) for (const l of ['fr', 'en']) if (!existing.has(r[l])) errors.push(`route ${id} (${l}) not built: ${r[l]}`);

const todos = JSON.parse(await readFile(path.join(root, 'placeholders.json'), 'utf8'));
const cfgMissing = [['formEndpoint', config.formEndpoint], ['analytics.ga4', config.analytics.ga4], ['phone', config.phone], ['email', config.email], ['calendar.consultation', config.calendar.consultation], ['calendar.demo', config.calendar.demo]].filter(([, v]) => !v).map(([k]) => k);
(launch ? errors : warns).push(...(todos.length ? [`${todos.length} content placeholders remain (dist/placeholders.json)`] : []), ...cfgMissing.map((k) => `site.config.mjs: ${k} is empty`));

warns.forEach((w) => console.log('⚠ ' + w));
errors.forEach((e) => console.log('✖ ' + e));
console.log(`\n${files.length} HTML files checked — ${errors.length} error(s), ${warns.length} warning(s).`);
process.exit(errors.length ? 1 : 0);

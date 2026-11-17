// Launch-day check (strategy §10 Phase C): every old URL must 301 → a page that returns 200.
// Usage: npm run test:redirects -- https://marketingwebsites.ca
import { readFile } from 'node:fs/promises';
const base = (process.argv[2] || '').replace(/\/$/, '');
if (!base) { console.error('Usage: npm run test:redirects -- https://your-domain'); process.exit(1); }
const rows = (await readFile(new URL('../migration/redirects.csv', import.meta.url), 'utf8')).split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#') && !l.startsWith('old_path'));
let fail = 0;
for (const row of rows) {
  const [from, to, type = '301'] = row.split(',');
  const r = await fetch(base + from, { redirect: 'manual' });
  if (type === '410') { const ok = r.status === 410 || r.status === 404; if (!ok) fail++; console.log(`${ok ? '✔' : '✖'} ${from} → ${r.status} (expected 410)`); continue; }
  const loc = r.headers.get('location') || '';
  const target = new URL(loc, base).pathname;
  const final = loc ? await fetch(new URL(loc, base), { redirect: 'manual' }) : null;
  const ok = r.status === 301 && target === to && final?.status === 200;
  if (!ok) fail++;
  console.log(`${ok ? '✔' : '✖'} ${from} → ${r.status} ${target} → ${final?.status ?? '-'}${target !== to ? ` (expected ${to})` : ''}`);
}
console.log(`\n${rows.length - fail}/${rows.length} redirects OK`);
process.exit(fail ? 1 : 0);

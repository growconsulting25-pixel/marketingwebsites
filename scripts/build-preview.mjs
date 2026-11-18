// Makes a copy of dist/ with relative URLs so the site can be browsed from a
// sub-path or as a claude.ai Artifact preview. Usage: node scripts/build-preview.mjs <outDir>
import { readFile, writeFile, mkdir, cp, rm, readdir } from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
const out = path.resolve(process.argv[2] || 'preview');
await rm(out, { recursive: true, force: true });
await cp(root, out, { recursive: true });
const walk = async (d) => (await Promise.all((await readdir(d, { withFileTypes: true })).map((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)])))).flat();
const files = await walk(out);
const rel = (fromFile, url) => {
  const [p, rest = ''] = url.split(/(?=[?#])/);
  let target = p.endsWith('/') ? p + 'index.html' : p;
  let r = path.posix.relative(path.posix.dirname('/' + path.relative(out, fromFile).split(path.sep).join('/')), target);
  if (!r) r = path.posix.basename(target);
  return r + rest;
};
for (const f of files) {
  if (f.endsWith('.html')) {
    let h = await readFile(f, 'utf8');
    h = h.replace(/(href|src|action)="(\/(?!\/)[^"]*)"/g, (_, a, u) => `${a}="${rel(f, u)}"`);
    h = h.replace(/srcset="([^"]*)"/g, (_, v) => `srcset="${v.split(',').map((part) => part.trim().replace(/^\/(?!\/)\S+/, (u) => rel(f, u))).join(', ')}"`);
    h = h.replace(/"thanks":"(\/[^"]*)"/, (_, u) => `"thanks":"${rel(f, u)}"`);
    h = h.replace(/(<script defer src="[^"?]+)\?v=[^"]*"/, '$1"').replace(/(<link rel="stylesheet" href="[^"?]+)\?v=[^"]*"/, '$1"');
    await writeFile(f, h);
  } else if (f.endsWith('.css')) {
    let c = await readFile(f, 'utf8');
    c = c.replace(/url\(\/assets\/fonts\//g, 'url(../fonts/');
    await writeFile(f, c);
  }
}
console.log(`Preview written to ${out} (${files.length} files)`);

// --artifact: shape the copy for a claude.ai Artifact (the home page becomes
// main.html without its own <html>/<head>/<body> wrapper; host-only files are dropped).
if (process.argv.includes('--artifact')) {
  const { unlink } = await import('node:fs/promises');
  for (const f of ['_redirects', '_headers', 'placeholders.json', 'robots.txt', 'sitemap.xml', 'sitemap-fr.xml', 'sitemap-en.xml']) await unlink(path.join(out, f)).catch(() => {});
  let h = await readFile(path.join(out, 'index.html'), 'utf8');
  h = h.replace(/^<!doctype html>\s*<html[^>]*>\s*<head>\s*/i, '').replace('</head>\n', '').replace('</body>\n</html>', '').replace(/<body class="[^"]*">/, '');
  const title = h.match(/<title>.*?<\/title>/)[0];
  h = title + '\n' + h.replace(title, '');
  await writeFile(path.join(out, 'main.html'), h);
  await unlink(path.join(out, 'index.html'));
  const list = (await walk(out)).map((f) => path.relative(out, f).split(path.sep).join('/')).filter((f) => f !== 'main.html').sort();
  await writeFile(path.join(out, 'files.json'), JSON.stringify(list.map((p) => ({ path: p }))));
  console.log(`Artifact copy ready: ${list.length} supporting files (files.json)`);
}

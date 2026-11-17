// Minimal static server for dist/ (dev preview). Usage: npm run serve [port]
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
const port = Number(process.argv[2] || process.env.PORT || 4321);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain', '.json': 'application/json', '.webp': 'image/webp', '.avif': 'image/avif' };
createServer(async (req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  let file = path.join(root, p);
  if (!file.startsWith(root)) { res.writeHead(403).end(); return; }
  try {
    if ((await stat(file)).isDirectory()) file = path.join(file, 'index.html');
    const body = await readFile(file);
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' }).end(body);
  } catch {
    const nf = p.startsWith('/en/') ? '/en/404.html' : '/404.html';
    res.writeHead(404, { 'Content-Type': types['.html'] }).end(await readFile(path.join(root, nf)).catch(() => 'Not found'));
  }
}).listen(port, () => console.log(`Serving dist/ at http://localhost:${port}`));

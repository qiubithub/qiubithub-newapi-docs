import fs from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';

const root = path.resolve(process.argv[2] ?? 'out');
const port = Number(process.argv[3] ?? 3000);

const mimeTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.ico', 'image/x-icon'],
  ['.jpg', 'image/jpeg'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml; charset=utf-8'],
  ['.txt', 'text/plain; charset=utf-8'],
  ['.webp', 'image/webp'],
]);

function resolveRequestPath(url) {
  const pathname = decodeURIComponent(new URL(url, `http://127.0.0.1:${port}`).pathname);
  const normalized = path.normalize(pathname).replace(/^(\.\.[/\\])+/, '');
  return path.join(root, normalized);
}

async function findFile(filePath) {
  const stat = await fs.stat(filePath).catch(() => null);

  if (stat?.isFile()) {
    return filePath;
  }

  if (stat?.isDirectory()) {
    const indexFile = path.join(filePath, 'index.html');
    const indexStat = await fs.stat(indexFile).catch(() => null);
    if (indexStat?.isFile()) {
      return indexFile;
    }
  }

  return path.join(root, 'index.html');
}

const server = http.createServer(async (request, response) => {
  try {
    const filePath = await findFile(resolveRequestPath(request.url ?? '/'));
    const content = await fs.readFile(filePath);
    const contentType = mimeTypes.get(path.extname(filePath)) ?? 'application/octet-stream';

    response.writeHead(200, {'content-type': contentType});
    response.end(content);
  } catch {
    response.writeHead(404, {'content-type': 'text/plain; charset=utf-8'});
    response.end('Not found');
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Static preview served at http://127.0.0.1:${port}/`);
});

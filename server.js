const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const root = __dirname;
const envPath = path.join(root, '.env');

if (fs.existsSync(envPath)) {
  process.loadEnvFile(envPath);
}

const port = Number(process.env.PORT || 4173);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml'
};

http.createServer((request, response) => {
  const requestPath = new URL(request.url, `http://${request.headers.host}`).pathname;
  const relativePath = requestPath === '/' ? 'index.html' : requestPath.replace(/^\/+/, '');
  const filePath = path.resolve(root, relativePath);

  if (!filePath.startsWith(root + path.sep)) {
    response.writeHead(403).end('Forbidden');
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      response.writeHead(404).end('Not found');
      return;
    }
    response.writeHead(200, { 'Content-Type': types[path.extname(filePath)] || 'application/octet-stream' });
    response.end(data);
  });
}).listen(port, () => console.log(`Abaku Capital → http://localhost:${port}`));

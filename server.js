import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 4173;
const distDir = path.join(__dirname, 'dist');

console.log('PORT env var:', process.env.PORT);
console.log('Using port:', PORT);

let indexHtml = '';
try {
  const indexPath = path.join(distDir, 'index.html');
  indexHtml = fs.readFileSync(indexPath, 'utf-8');
  console.log('Loaded index.html:', indexHtml.length, 'bytes');
} catch (err) {
  console.error('Failed to load index.html:', err.message);
}

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

console.log('Creating HTTP server...');

const server = http.createServer((req, res) => {
  console.log('Request received:', req.method, req.url);

  const requestPath = req.url === '/' ? '/index.html' : req.url;
  const filePath = path.join(distDir, requestPath);

  const resolvedPath = path.resolve(filePath);
  const resolvedDir = path.resolve(distDir);

  if (!resolvedPath.startsWith(resolvedDir)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.log('File not found, serving index.html for SPA routing');
      fs.readFile(path.join(distDir, 'index.html'), (err, data) => {
        if (err) {
          console.error('Error reading index.html:', err.message);
          res.writeHead(500);
          res.end('Error');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      });
    } else {
      const ext = path.extname(filePath).toLowerCase();
      const contentType = mimeTypes[ext] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
});

console.log('Starting server...');

server.listen(PORT, () => {
  console.log('Server listening on port', PORT);
});

server.on('error', (err) => {
  console.error('Server error:', err.message);
});

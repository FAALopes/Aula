import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 4173;
const distDir = path.join(__dirname, 'dist');

console.log('Current working directory:', process.cwd());
console.log('__dirname:', __dirname);
console.log('distDir:', distDir);
console.log('dist folder exists:', fs.existsSync(distDir));

if (fs.existsSync(distDir)) {
  console.log('Contents of dist:', fs.readdirSync(distDir));
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

const server = http.createServer((req, res) => {
  let filePath = path.join(distDir, req.url);

  if (req.url === '/' || req.url.endsWith('/')) {
    filePath = path.join(distDir, 'index.html');
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.log('Error reading file:', filePath, err.code);
      // If file not found, serve index.html (SPA fallback)
      fs.readFile(path.join(distDir, 'index.html'), (err, data) => {
        if (err) {
          console.error('Error reading index.html:', err.message);
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Error loading application: ' + err.message);
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

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

server.on('error', (err) => {
  console.error('Server error:', err.message);
  process.exit(1);
});

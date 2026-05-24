import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 4173;
const distDir = path.join(__dirname, 'dist');

console.log('[SERVER] Starting initialization');
console.log('[SERVER] Working directory:', process.cwd());
console.log('[SERVER] __dirname:', __dirname);
console.log('[SERVER] distDir:', distDir);
console.log('[SERVER] dist folder exists:', fs.existsSync(distDir));

let indexHtml = '';

try {
  if (fs.existsSync(distDir)) {
    const files = fs.readdirSync(distDir);
    console.log('[SERVER] Contents of dist:', files);

    const indexPath = path.join(distDir, 'index.html');
    console.log('[SERVER] Attempting to read index.html from:', indexPath);
    indexHtml = fs.readFileSync(indexPath, 'utf-8');
    console.log('[SERVER] Successfully loaded index.html, size:', indexHtml.length, 'bytes');
  } else {
    console.error('[SERVER] ERROR: dist folder does not exist!');
  }
} catch (err) {
  console.error('[SERVER] ERROR during initialization:', err.message);
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
  try {
    const requestPath = req.url === '/' ? '/index.html' : req.url;
    const filePath = path.join(distDir, requestPath);

    console.log('[SERVER] Request:', req.method, requestPath);

    // Security: prevent directory traversal
    const resolvedPath = path.resolve(filePath);
    const resolvedDir = path.resolve(distDir);
    if (!resolvedPath.startsWith(resolvedDir)) {
      console.log('[SERVER] Blocked directory traversal attempt:', requestPath);
      res.writeHead(403, { 'Content-Type': 'text/plain' });
      res.end('Forbidden');
      return;
    }

    // Try to read the file
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.log('[SERVER] File not found:', requestPath, 'error:', err.code);
        // Serve index.html as fallback for SPA routing
        fs.readFile(path.join(distDir, 'index.html'), (fallbackErr, fallbackData) => {
          if (fallbackErr) {
            console.error('[SERVER] Failed to serve fallback index.html:', fallbackErr.message);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
            return;
          }
          console.log('[SERVER] Serving fallback index.html for:', requestPath);
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(fallbackData);
        });
      } else {
        const ext = path.extname(filePath).toLowerCase();
        const contentType = mimeTypes[ext] || 'application/octet-stream';
        console.log('[SERVER] Serving file:', requestPath, 'type:', contentType, 'size:', data.length);
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
      }
    });
  } catch (err) {
    console.error('[SERVER] Unexpected error handling request:', err.message);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
  }
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('[PROCESS] Uncaught Exception:', err.message);
  console.error(err.stack);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('[PROCESS] Unhandled Rejection:', reason);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log('[SERVER] ✓ HTTP server listening on port', PORT);
});

server.on('error', (err) => {
  console.error('[SERVER] Server error:', err.message);
  console.error(err.stack);
});

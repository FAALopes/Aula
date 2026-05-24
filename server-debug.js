import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 8080;
const distDir = path.join(__dirname, 'dist');

console.log('[SERVER] Starting...');
console.log('[SERVER] __dirname:', __dirname);
console.log('[SERVER] distDir:', distDir);
console.log('[SERVER] PORT:', PORT);
console.log('[SERVER] NODE_ENV:', process.env.NODE_ENV);

// Check if dist exists
if (!fs.existsSync(distDir)) {
  console.error('[ERROR] dist/ folder does not exist!');
  console.error('[ERROR] Current directory contents:', fs.readdirSync(__dirname));
  process.exit(1);
}

console.log('[SERVER] dist/ exists. Contents:', fs.readdirSync(distDir));

// Check if index.html exists
const indexPath = path.join(distDir, 'index.html');
if (!fs.existsSync(indexPath)) {
  console.error('[ERROR] dist/index.html not found!');
  process.exit(1);
}

console.log('[SERVER] index.html found');

app.use(express.static(distDir));

app.use((req, res) => {
  console.log('[REQUEST]', req.method, req.path);
  res.sendFile(indexPath);
});

const server = app.listen(PORT, () => {
  console.log('[SUCCESS] Server listening on port', PORT);
});

server.on('error', (err) => {
  console.error('[SERVER ERROR]', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('[UNHANDLED REJECTION]', reason);
});

process.on('uncaughtException', (error) => {
  console.error('[UNCAUGHT EXCEPTION]', error);
  process.exit(1);
});

import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const distPath = join(__dirname, 'dist');

console.log('[DEBUG] __dirname:', __dirname);
console.log('[DEBUG] distPath:', distPath);
console.log('[DEBUG] dist folder exists:', fs.existsSync(distPath));

const app = express();
const PORT = process.env.PORT || 4173;

// Serve static files from dist folder
app.use(express.static(distPath, {
  maxAge: '1h',
  etag: false
}));

// SPA fallback - serve index.html for all non-matching routes
app.get('*', (req, res) => {
  const indexPath = join(distPath, 'index.html');
  console.log('[DEBUG] Requested:', req.path);
  console.log('[DEBUG] Serving index.html from:', indexPath);
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error('[ERROR] Failed to serve index.html:', err.message);
      res.status(500).send('Error loading application');
    }
  });
});

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`[INFO] Server running on port ${PORT}`);
  console.log(`[INFO] Serving static files from: ${distPath}`);
});

// Handle server errors
server.on('error', (err) => {
  console.error('[FATAL] Server error:', err.message);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('[INFO] SIGTERM received, closing server');
  server.close(() => {
    console.log('[INFO] Server closed');
    process.exit(0);
  });
});

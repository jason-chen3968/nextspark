/**
 * nextSpark — backend visitor tracker
 * -----------------------------------
 * Plain Node.js (no npm installs needed — uses only built-in modules).
 *
 * What it does:
 *  - Serves the landing page + assets from this same folder.
 *  - Logs a visit every time someone loads the page (via visitor-tracker.js
 *    calling POST /api/track in the background).
 *  - Stores counts in visits.json on disk, so the count survives restarts.
 *  - Lets you check the count anytime at GET /api/visits.
 *
 * Run it:
 *    node server.js
 * Then open:
 *    http://localhost:3000
 *
 * Check the counter:
 *    http://localhost:3000/api/visits   (in a browser, or `curl` it)
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;
const VISITS_FILE = path.join(ROOT, 'visits.json');
const MAX_LOG_ENTRIES = 200; // keep the log file from growing forever

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
};

function readVisits() {
  try {
    const raw = fs.readFileSync(VISITS_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    return { totalVisits: 0, log: [] };
  }
}

function writeVisits(data) {
  fs.writeFileSync(VISITS_FILE, JSON.stringify(data, null, 2));
}

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) return forwarded.split(',')[0].trim();
  return req.socket.remoteAddress || 'unknown';
}

function sendJson(res, statusCode, payload) {
  const body = JSON.stringify(payload, null, 2);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(body),
  });
  res.end(body);
}

function serveStatic(req, res, urlPath) {
  let filePath = urlPath === '/' ? '/nextspark-landing.html' : urlPath;
  filePath = path.join(ROOT, filePath);

  // basic safety: stay inside ROOT
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    return res.end('Forbidden');
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('Not found');
    }
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
    res.end(content);
  });
}

const server = http.createServer((req, res) => {
  const { method, url } = req;

  // ---- Track a visit ----
  if (method === 'POST' && url === '/api/track') {
    let body = '';
    req.on('data', (chunk) => { body += chunk; });
    req.on('end', () => {
      let parsed = {};
      try { parsed = JSON.parse(body || '{}'); } catch (e) { /* ignore bad body */ }

      const data = readVisits();
      data.totalVisits = (data.totalVisits || 0) + 1;
      data.log = data.log || [];
      data.log.unshift({
        timestamp: new Date().toISOString(),
        ip: getClientIp(req),
        page: parsed.page || 'unknown',
        referrer: parsed.referrer || 'direct',
        userAgent: req.headers['user-agent'] || 'unknown',
      });
      data.log = data.log.slice(0, MAX_LOG_ENTRIES);
      writeVisits(data);

      sendJson(res, 200, { ok: true, totalVisits: data.totalVisits });
    });
    return;
  }

  // ---- Check the counter ----
  if (method === 'GET' && url === '/api/visits') {
    const data = readVisits();
    return sendJson(res, 200, data);
  }

  // ---- Everything else: serve the site files ----
  if (method === 'GET') {
    return serveStatic(req, res, url.split('?')[0]);
  }

  res.writeHead(405);
  res.end('Method not allowed');
});

server.listen(PORT, () => {
  console.log(`nextSpark server running at http://localhost:${PORT}`);
  console.log(`Visitor count: http://localhost:${PORT}/api/visits`);
});

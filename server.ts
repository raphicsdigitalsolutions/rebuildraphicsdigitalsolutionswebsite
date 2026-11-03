/**
 * Express server for Raphics Digital Solutions.
 * File storage requires a single persistent Node.js host with a durable writable volume.
 * Configure managed database storage before using serverless or multi-instance hosting.
 */
import express, { Request, Response } from 'express';
import path from 'node:path';
import fs from 'node:fs';
import { randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = Number(process.env.PORT || 3000);

if (process.env.TRUST_PROXY_HOPS) {
  const proxyHops = Number(process.env.TRUST_PROXY_HOPS);
  if (Number.isInteger(proxyHops) && proxyHops >= 0) app.set('trust proxy', proxyHops);
}
app.disable('x-powered-by');
app.use(express.json({ limit: '32kb' }));

const DATA_DIR = path.resolve(process.env.DATA_DIR || path.join(__dirname, 'data'));
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');
fs.mkdirSync(DATA_DIR, { recursive: true, mode: 0o700 });
if (!fs.existsSync(INQUIRIES_FILE)) {
  fs.writeFileSync(INQUIRIES_FILE, '[]\n', { encoding: 'utf-8', flag: 'wx', mode: 0o600 });
} else {
  // Inquiry files contain personal data; restrict access on supported filesystems.
  try { fs.chmodSync(INQUIRIES_FILE, 0o600); } catch (error) {
    console.warn('[Storage] Could not restrict inquiry file permissions:', error);
  }
}

interface StoredInquiry {
  id: string;
  fullName: string;
  email: string;
  company?: string;
  serviceRequired: string;
  projectBudget?: string;
  projectDescription: string;
  preferredContactMethod: string;
  createdAt: string;
}

interface RateLimitRecord { count: number; windowStartedAt: number; }
const rateLimitMap = new Map<string, RateLimitRecord>();
const recentSubmissions = new Map<string, number>();
const WINDOW_MS = 15 * 60 * 1000;
const DUPLICATE_WINDOW_MS = 5 * 60 * 1000;

setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of rateLimitMap) {
    if (now - record.windowStartedAt >= WINDOW_MS) rateLimitMap.delete(ip);
  }
  for (const [signature, timestamp] of recentSubmissions) {
    if (now - timestamp >= DUPLICATE_WINDOW_MS) recentSubmissions.delete(signature);
  }
}, 5 * 60 * 1000);

function cleanText(value: string): string {
  // Preserve legitimate punctuation and non-English names; remove control characters.
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim();
}

function readStoredInquiries(): StoredInquiry[] {
  const parsed: unknown = JSON.parse(fs.readFileSync(INQUIRIES_FILE, 'utf-8'));
  if (!Array.isArray(parsed)) throw new Error('Inquiry storage has an invalid format.');
  return parsed as StoredInquiry[];
}

function writeStoredInquiry(inquiry: StoredInquiry): void {
  const existing = readStoredInquiries();
  existing.unshift(inquiry);
  const temporaryFile = INQUIRIES_FILE + '.' + process.pid + '.tmp';
  fs.writeFileSync(temporaryFile, JSON.stringify(existing, null, 2) + '\n', { encoding: 'utf-8', mode: 0o600 });
  fs.renameSync(temporaryFile, INQUIRIES_FILE);
}

function allowSubmission(ip: string, now: number): boolean {
  const current = rateLimitMap.get(ip);
  if (!current || now - current.windowStartedAt >= WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, windowStartedAt: now });
    return true;
  }
  if (current.count >= 5) return false;
  current.count += 1;
  return true;
}

app.get('/api/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'online',
    agency: 'Raphics Digital Solutions',
    timestamp: new Date().toISOString(),
    storage: 'local-file; requires a persistent writable volume',
    emailNotifications: 'not-configured',
    deploymentNote: 'Local file storage and in-memory rate limiting are not suitable for serverless or multi-instance production deployments.',
  });
});

app.post('/api/contact', (req: Request, res: Response) => {
  try {
    const body = req.body && typeof req.body === 'object' && !Array.isArray(req.body) ? req.body : {};
    const {
      fullName, email, company = '', serviceRequired, projectBudget = '',
      projectDescription, preferredContactMethod = 'Email', honeypot = '',
    } = body as Record<string, unknown>;

    if (typeof honeypot === 'string' && honeypot.trim()) {
      return res.status(400).json({ error: 'Automated submission rejected.' });
    }

    const clientIp = req.ip || req.socket.remoteAddress || 'unknown';
    const now = Date.now();
    if (!allowSubmission(clientIp, now)) {
      return res.status(429).json({ error: 'Too many inquiries. Please wait before submitting again.' });
    }

    if (typeof fullName !== 'string' || fullName.trim().length < 2 || fullName.length > 100) {
      return res.status(400).json({ error: 'Please provide a name between 2 and 100 characters.' });
    }
    if (typeof email !== 'string' || email.trim().length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      return res.status(400).json({ error: 'Please provide a valid email address.' });
    }
    if (typeof serviceRequired !== 'string' || !serviceRequired.trim() || serviceRequired.length > 120) {
      return res.status(400).json({ error: 'Please select a valid service.' });
    }
    if (typeof projectDescription !== 'string' || projectDescription.trim().length < 10 || projectDescription.length > 5000) {
      return res.status(400).json({ error: 'Project details must be between 10 and 5,000 characters.' });
    }
    if (typeof company !== 'string' || company.length > 120) {
      return res.status(400).json({ error: 'Company name must be 120 characters or fewer.' });
    }
    if (typeof projectBudget !== 'string' || projectBudget.length > 100) {
      return res.status(400).json({ error: 'Please select a valid budget range.' });
    }
    if (typeof preferredContactMethod !== 'string' || !['Email', 'WhatsApp'].includes(preferredContactMethod)) {
      return res.status(400).json({ error: 'Please select a valid contact method.' });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedDescription = cleanText(projectDescription);
    const signature = normalizedEmail + ':' + normalizedDescription;
    const previousSubmission = recentSubmissions.get(signature);
    if (previousSubmission && now - previousSubmission < DUPLICATE_WINDOW_MS) {
      return res.status(409).json({ error: 'An identical inquiry was received recently.' });
    }

    const inquiry: StoredInquiry = {
      id: 'RDS-' + new Date().toISOString().slice(0, 10).replace(/-/g, '') + '-' + randomUUID().slice(0, 8).toUpperCase(),
      fullName: cleanText(fullName),
      email: normalizedEmail,
      company: cleanText(company) || undefined,
      serviceRequired: cleanText(serviceRequired),
      projectBudget: cleanText(projectBudget) || undefined,
      projectDescription: normalizedDescription,
      preferredContactMethod,
      createdAt: new Date().toISOString(),
    };

    writeStoredInquiry(inquiry);
    recentSubmissions.set(signature, now);

    return res.status(201).json({
      success: true,
      inquiryId: inquiry.id,
      message: 'Your inquiry was received by the website server. Email notifications are not configured; please use the published contact email for urgent matters.',
      data: {
        id: inquiry.id,
        serviceRequired: inquiry.serviceRequired,
        createdAt: inquiry.createdAt,
        emailNotification: 'not_configured',
      },
    });
  } catch (error) {
    console.error('[Contact API] Inquiry could not be stored:', error);
    return res.status(500).json({ error: 'We could not save your inquiry. Please try again later or contact us by email.' });
  }
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({ server: { middlewareMode: true }, appType: 'spa' });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
  }

  app.get('*', (_req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });

  app.listen(PORT, () => console.log('[Raphics Server] Ready on port ' + PORT));
}

startServer().catch((error) => {
  console.error('[Raphics Server] Startup failed:', error);
  process.exitCode = 1;
});

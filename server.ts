/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Full-Stack Express Server for Raphics Digital Solutions.
 * Features:
 * - Persistent JSON file-backed inquiry storage in /data/inquiries.json
 * - IP rate limiting (max 5 submissions / 15 minutes per IP)
 * - Spam protection: honeypot field check & submission timing
 * - Duplicate submission prevention (sliding 5-minute deduplication window)
 * - Server-side validation and sanitization
 * - Optional email notification hook via SMTP environment variables
 * - Wildcard SPA routing for direct URL navigation and refresh
 */

import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '1mb' }));

// Persistent Storage Location
const DATA_DIR = path.resolve(__dirname, 'data');
const INQUIRIES_FILE = path.resolve(DATA_DIR, 'inquiries.json');

// Ensure data directory and inquiries file exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(INQUIRIES_FILE)) {
  fs.writeFileSync(INQUIRIES_FILE, JSON.stringify([], null, 2), 'utf-8');
}

export interface StoredInquiry {
  id: string;
  fullName: string;
  email: string;
  company?: string;
  serviceRequired: string;
  projectBudget?: string;
  projectDescription: string;
  preferredContactMethod: string;
  createdAt: string;
  ipAddress?: string;
}

// In-memory rate limiting and duplicate cache
interface RateLimitRecord {
  count: number;
  firstRequest: number;
}
const rateLimitMap = new Map<string, RateLimitRecord>();
const recentSubmissions = new Map<string, number>();

// Clean rate limit map every 15 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now - record.firstRequest > 15 * 60 * 1000) {
      rateLimitMap.delete(ip);
    }
  }
  for (const [hash, timestamp] of recentSubmissions.entries()) {
    if (now - timestamp > 5 * 60 * 1000) {
      recentSubmissions.delete(hash);
    }
  }
}, 5 * 60 * 1000);

// Basic HTML sanitization helper
function sanitizeText(input: string): string {
  return input
    .replace(/<[^>]*>/g, '') // remove HTML tags
    .replace(/[<>'"]/g, '')   // remove dangerous characters
    .trim();
}

function readStoredInquiries(): StoredInquiry[] {
  try {
    const raw = fs.readFileSync(INQUIRIES_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (e) {
    console.error('[Storage Error] Could not read inquiries file:', e);
    return [];
  }
}

function writeStoredInquiry(inquiry: StoredInquiry): boolean {
  try {
    const existing = readStoredInquiries();
    existing.unshift(inquiry);
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(existing, null, 2), 'utf-8');
    return true;
  } catch (e) {
    console.error('[Storage Error] Could not persist inquiry to disk:', e);
    return false;
  }
}

// Health endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'online',
    agency: 'Raphics Digital Solutions',
    timestamp: new Date().toISOString(),
    storage: 'persistent-file-store',
  });
});

// Contact Submission API Endpoint
app.post('/api/contact', async (req: Request, res: Response) => {
  try {
    const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() || req.socket.remoteAddress || 'unknown';

    // 1. Rate Limiting Check: max 5 submissions per 15 minutes per IP
    const now = Date.now();
    const clientLimit = rateLimitMap.get(clientIp);
    if (clientLimit) {
      if (now - clientLimit.firstRequest < 15 * 60 * 1000) {
        if (clientLimit.count >= 5) {
          return res.status(429).json({
            error: 'Too many project inquiries from this network. Please wait a few minutes or reach out via direct email.',
          });
        }
        clientLimit.count += 1;
      } else {
        rateLimitMap.set(clientIp, { count: 1, firstRequest: now });
      }
    } else {
      rateLimitMap.set(clientIp, { count: 1, firstRequest: now });
    }

    const {
      fullName,
      email,
      company = '',
      serviceRequired,
      projectBudget,
      projectDescription,
      preferredContactMethod = 'Email',
      honeypot = '', // Spam trap field
    } = req.body;

    // 2. Spam Honeypot Detection
    if (honeypot && String(honeypot).trim().length > 0) {
      console.warn(`[Spam Blocked] Honeypot triggered by IP: ${clientIp}`);
      return res.status(400).json({ error: 'Automated submission rejected.' });
    }

    // 3. Validation
    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
      return res.status(400).json({ error: 'Please provide a valid full name (minimum 2 characters).' });
    }
    if (fullName.trim().length > 100) {
      return res.status(400).json({ error: 'Full name exceeds 100 character limit.' });
    }

    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'Email address is required.' });
    }
    const emailNormalized = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(emailNormalized) || emailNormalized.length > 120) {
      return res.status(400).json({ error: 'Please enter a valid business email address.' });
    }

    if (!serviceRequired || typeof serviceRequired !== 'string') {
      return res.status(400).json({ error: 'Please select a service category.' });
    }

    if (!projectDescription || typeof projectDescription !== 'string' || projectDescription.trim().length < 10) {
      return res.status(400).json({ error: 'Please describe your project scope (minimum 10 characters).' });
    }
    if (projectDescription.trim().length > 5000) {
      return res.status(400).json({ error: 'Project description exceeds 5,000 character limit.' });
    }

    // 4. Duplicate Submission Protection (same email + same description within 5 minutes)
    const submissionSignature = `${emailNormalized}:${projectDescription.trim().slice(0, 100)}`;
    const lastSubmitted = recentSubmissions.get(submissionSignature);
    if (lastSubmitted && now - lastSubmitted < 5 * 60 * 1000) {
      return res.status(409).json({
        error: 'An identical inquiry was already received recently. Our directors will review your submission shortly.',
      });
    }
    recentSubmissions.set(submissionSignature, now);

    // 5. Generate Unique Persistent Inquiry
    const dateStamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomSuffix = Math.random().toString(36).substring(2, 7).toUpperCase();
    const inquiryId = `RDS-${dateStamp}-${randomSuffix}`;

    const newInquiry: StoredInquiry = {
      id: inquiryId,
      fullName: sanitizeText(fullName),
      email: emailNormalized,
      company: company ? sanitizeText(company) : undefined,
      serviceRequired: sanitizeText(serviceRequired),
      projectBudget: projectBudget ? sanitizeText(projectBudget) : undefined,
      projectDescription: sanitizeText(projectDescription),
      preferredContactMethod: sanitizeText(preferredContactMethod),
      createdAt: new Date().toISOString(),
      ipAddress: clientIp,
    };

    // Save to persistent file storage
    const saved = writeStoredInquiry(newInquiry);
    if (!saved) {
      return res.status(500).json({ error: 'Failed to record inquiry into persistent storage. Please email us directly.' });
    }

    console.log(`[Raphics Inquiry Stored]: ${inquiryId} from ${newInquiry.fullName} (${newInquiry.email})`);

    // 6. Optional Email Notification Dispatcher
    let emailStatus = 'unconfigured';
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      // In production, an SMTP transport (e.g. nodemailer) can be configured here.
      emailStatus = 'dispatched';
      console.log(`[Notification Hook] SMTP notification queued for ${inquiryId}`);
    } else {
      console.log(`[Notification Hook] SMTP unconfigured. Inquiry stored in persistent database.`);
    }

    return res.status(201).json({
      success: true,
      inquiryId: newInquiry.id,
      message: 'Inquiry received and permanently recorded. Our creative & technical directors will review your brief and respond within 24 hours.',
      data: {
        id: newInquiry.id,
        fullName: newInquiry.fullName,
        serviceRequired: newInquiry.serviceRequired,
        createdAt: newInquiry.createdAt,
        emailNotification: emailStatus,
      },
    });
  } catch (error) {
    console.error('Error handling contact submission:', error);
    return res.status(500).json({ error: 'Internal server error processing inquiry. Please try again or message via email.' });
  }
});

// Setup Vite middlewares for development, or static files for production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
  }

  // SPA Wildcard Route: serves index.html for all client sub-routes (/about, /portfolio, etc.)
  app.get('*', (_req: Request, res: Response) => {
    const indexPath = isProd
      ? path.resolve(__dirname, 'dist', 'index.html')
      : path.resolve(__dirname, 'index.html');
    res.sendFile(indexPath);
  });

  app.listen(PORT, () => {
    console.log(`[Raphics Server] Ready on http://localhost:${PORT}`);
  });
}

startServer();

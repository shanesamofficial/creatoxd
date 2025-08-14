// Serverless function (Vercel) to receive contact form submissions
import nodemailer from 'nodemailer';
import { promises as dns } from 'dns';

const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com','guerrillamail.com','10minutemail.com','tempmail.com','yopmail.com',
]);

async function readJsonBody(req) {
  // If body already parsed by platform:
  if (req.body && typeof req.body === 'object' && Object.keys(req.body).length) return req.body;
  // Fallback: read raw
  const raw = await new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => (data += chunk));
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
  try { return JSON.parse(raw || '{}'); } catch { return {}; }
}

function isEmailSyntaxValid(email) {
  // HTML5/WHATWG-like
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  return re.test(email);
}

async function hasMx(domain) {
  try {
    const mx = await dns.resolveMx(domain);
    return Array.isArray(mx) && mx.length > 0;
  } catch {
    // Fallback: A/AAAA record is acceptable for some providers
    try {
      const a = await dns.resolve(domain);
      return Array.isArray(a) && a.length > 0;
    } catch {
      try {
        const aaaa = await dns.resolve6(domain);
        return Array.isArray(aaaa) && aaaaa.length > 0;
      } catch {
        return false;
      }
    }
  }
}

async function verifyWithKickbox(email) {
  if (!process.env.KICKBOX_API_KEY) return { ok: true, reason: 'skipped' };
  const url = `https://api.kickbox.com/v2/verify?email=${encodeURIComponent(email)}&apikey=${process.env.KICKBOX_API_KEY}`;
  const resp = await fetch(url);
  if (!resp.ok) return { ok: true, reason: 'api_unavailable' }; // don’t hard fail if API errors
  const data = await resp.json();
  // Accept deliverable; reject undeliverable; allow risky/unknown to pass (tune as desired)
  if (data.result === 'undeliverable') return { ok: false, reason: data.reason || 'undeliverable' };
  return { ok: true, result: data.result };
}

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const body = await readJsonBody(req);
    const { name, email, subject, message, company } = body || {};

    // Honeypot
    if (company) return res.status(200).json({ ok: true });

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    if (!isEmailSyntaxValid(email)) {
      return res.status(422).json({ error: 'Please enter a valid email address' });
    }

    // Domain checks
    const domain = String(email).split('@')[1]?.toLowerCase();
    if (!domain) return res.status(422).json({ error: 'Invalid email domain' });
    if (DISPOSABLE_DOMAINS.has(domain)) {
      return res.status(422).json({ error: 'Disposable email addresses are not allowed' });
    }
    const mxOk = await hasMx(domain);
    if (!mxOk) return res.status(422).json({ error: 'Email domain has no valid mail servers (MX)' });

    // Optional: external verification (Kickbox)
    const kb = await verifyWithKickbox(email);
    if (!kb.ok) return res.status(422).json({ error: 'Email appears invalid or unreachable' });

    // Send email via Gmail + App Password
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return res.status(500).json({ error: 'Email service not configured' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    // Verify transporter (optional but clearer errors)
    try { await transporter.verify(); }
    catch { return res.status(500).json({ error: 'Email service connection failed' }); }

    const mailOptions = {
      from: `"CreatoXD Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.CONTACT_TO || process.env.EMAIL_USER,
      replyTo: email,
      subject: subject ? `[CreatoXD] ${subject} - ${name}` : `New Contact from ${name}`,
      text: `From: ${name} <${email}>\nSubject: ${subject || 'No subject'}\n\n${message}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
          <h2 style="margin:0 0 12px">New Contact Form Submission</h2>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> <a href="mailto:${email}">${email}</a></p>
          ${subject ? `<p><b>Subject:</b> ${subject}</p>` : ''}
          <div style="margin-top:12px;padding:12px;border:1px solid #e5e7eb;border-radius:8px;white-space:pre-wrap">${message}</div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ ok: true, message: 'Email sent successfully' });
  } catch (err) {
    console.error('Contact form error:', err);
    return res.status(500).json({ error: 'Failed to send message' });
  }
}
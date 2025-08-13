// Serverless function (Vercel) to receive contact form submissions
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { name, email, subject, message, company } = req.body || {};

    // Honeypot
    if (company) return res.status(200).json({ ok: true });

    // Validate
    if (!name || !email || !message) return res.status(400).json({ error: 'Missing required fields' });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: 'Invalid email format' });

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Missing email credentials');
      return res.status(500).json({ error: 'Email service not configured' });
    }

    // Create transporter (Gmail with App Password)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Optional: verify connection for clearer logs
    try {
      await transporter.verify();
    } catch (e) {
      console.error('SMTP verify failed:', e);
      return res.status(500).json({ error: 'Email service connection failed' });
    }

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
  } catch (error) {
    console.error('Contact form error:', error);
    if (error.code === 'EAUTH') return res.status(500).json({ error: 'Email authentication failed' });
    if (error.code === 'ECONNECTION') return res.status(500).json({ error: 'Unable to connect to email server' });
    return res.status(500).json({ error: 'Failed to send message' });
  }
}
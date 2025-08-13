// Serverless function (Vercel) to receive contact form submissions
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, subject, message, company } = req.body;

    // Honeypot check
    if (company) {
      return res.status(200).json({ ok: true });
    }

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Check environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Missing email credentials');
      return res.status(500).json({ error: 'Email service not configured' });
    }

    // Create transporter
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: `"CreatoXD Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.CONTACT_TO || process.env.EMAIL_USER,
      replyTo: email,
      subject: subject ? `[CreatoXD] ${subject} - ${name}` : `New Contact from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ''}
          </div>
          
          <div style="background: white; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px;">
            <h4>Message:</h4>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 10px; background: #e9ecef; border-radius: 4px; font-size: 12px; color: #6c757d;">
            This email was sent from the CreatoXD website contact form.
          </div>
        </div>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        Subject: ${subject || 'No subject'}
        
        Message:
        ${message}
        
        --
        Sent from CreatoXD website contact form
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);
    
    return res.status(200).json({ 
      ok: true, 
      message: 'Email sent successfully' 
    });

  } catch (error) {
    console.error('Contact form error:', error);
    
    // Return different error messages based on error type
    if (error.code === 'EAUTH') {
      return res.status(500).json({ error: 'Email authentication failed' });
    } else if (error.code === 'ECONNECTION') {
      return res.status(500).json({ error: 'Unable to connect to email server' });
    } else {
      return res.status(500).json({ error: 'Failed to send message' });
    }
  }
}
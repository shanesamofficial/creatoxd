// Serverless function (Vercel) to receive contact form submissions
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    console.log("Request body:", req.body);
    console.log("Environment check:", {
      hasEmailHost: !!process.env.EMAIL_HOST,
      hasEmailUser: !!process.env.EMAIL_USER,
      hasEmailPass: !!process.env.EMAIL_PASS,
      hasContactTo: !!process.env.CONTACT_TO
    });

    const { name, email, subject, message, company } = req.body || {};

    // Honeypot check
    if (company) {
      console.log("Honeypot triggered");
      return res.status(200).json({ ok: true });
    }

    // Validation
    if (!name || !email || !message) {
      console.log("Missing fields:", { name: !!name, email: !!email, message: !!message });
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      console.log("Invalid email format:", email);
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Check if environment variables exist
    if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("Missing email configuration");
      return res.status(500).json({ error: "Email service not configured" });
    }

    console.log("Creating transporter...");
    const transporter = nodemailer.createTransporter({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT || 587),
      secure: Number(process.env.EMAIL_PORT) === 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Test the connection
    console.log("Testing connection...");
    await transporter.verify();
    console.log("Connection verified");

    const to = process.env.CONTACT_TO || "team.creatoxd@gmail.com";
    const mailSubject = subject
      ? `[CreatoXD Contact] ${subject} - ${name}`
      : `New message from ${name}`;

    console.log("Sending email...");
    await transporter.sendMail({
      from: `"CreatoXD Website" <${process.env.EMAIL_USER}>`,
      to,
      replyTo: email,
      subject: mailSubject,
      text: `From: ${name} <${email}>\nSubject: ${subject || "(none)"}\n\n${message}`,
      html: `
        <h2 style="font-family:Arial;margin:0 0 12px;color:#333">New Contact Message</h2>
        <div style="background:#f9f9f9;padding:20px;border-radius:8px;border-left:4px solid #007bff">
          <p style="margin:0 0 8px"><strong>Name:</strong> ${name}</p>
          <p style="margin:0 0 8px"><strong>Email:</strong> ${email}</p>
          ${subject ? `<p style="margin:0 0 8px"><strong>Subject:</strong> ${subject}</p>` : ""}
          <p style="margin:0 0 8px"><strong>Message:</strong></p>
          <div style="background:white;padding:12px;border-radius:4px;white-space:pre-wrap">${message}</div>
        </div>
        <hr style="margin:24px 0;border:none;border-top:1px solid #ddd">
        <p style="font-size:12px;color:#666;margin:0">Sent from CreatoXD.com contact form</p>
      `
    });

    console.log("Email sent successfully");
    return res.status(200).json({ ok: true, message: "Email sent successfully" });

  } catch (err) {
    console.error("Contact form error:", err);
    return res.status(500).json({ 
      error: "Failed to send message", 
      details: process.env.NODE_ENV === 'development' ? err.message : undefined 
    });
  }
}
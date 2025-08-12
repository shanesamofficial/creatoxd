// Serverless function (Vercel) to receive contact form submissions
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  try {
    const { name, email, subject, message, company } = req.body || {};

    // Honeypot (bot filled hidden field)
    if (company) return res.status(200).json({ ok: true });

    if (!name || !email || !message)
      return res.status(400).json({ error: "Missing required fields" });

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return res.status(400).json({ error: "Invalid email" });

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT || 587),
      secure: Number(process.env.EMAIL_PORT) === 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const to = process.env.CONTACT_TO || "team.creatoxd@gmail.com";
    const mailSubject = subject
      ? `[Contact] ${subject} – ${name}`
      : `New message from ${name}`;

    await transporter.sendMail({
      from: `"CreatoXD Site" <${process.env.EMAIL_USER}>`,
      to,
      replyTo: email,
      subject: mailSubject,
      text: `From: ${name} <${email}>\nSubject: ${subject || "(none)"}\n\n${message}`,
      html: `
        <h2 style="font-family:Arial;margin:0 0 12px">New Contact Message</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        ${subject ? `<p><b>Subject:</b> ${subject}</p>` : ""}
        <p><b>Message:</b><br/>${message.replace(/\\n/g, "<br/>")}</p>
        <hr style="margin:24px 0;border:none;border-top:1px solid #ddd">
        <p style="font-size:12px;color:#666">Sent from creatoxd.com contact form.</p>
      `
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Contact error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
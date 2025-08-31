const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const fetch = require("node-fetch"); // If Node <18, install: npm i node-fetch

// POST /api/inquiry
router.post("/", async (req, res) => {
  try {
    const { name, email, message, captchaToken } = req.body;

    // ✅ Verify reCAPTCHA
    const recaptchaRes = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${captchaToken}`,
      { method: "POST" }
    );
    const recaptchaData = await recaptchaRes.json();

    if (!recaptchaData.success) {
      return res.status(400).json({ success: false, message: "Captcha verification failed" });
    }

    // ✅ Setup transporter for GoDaddy (your custom domain email)
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST, // smtpout.secureserver.net
      port: process.env.EMAIL_PORT, // 465 or 587
      secure: process.env.EMAIL_PORT == 465, // true if 465
      auth: {
        user: process.env.EMAIL_USER, // support@lumenza.co.in
        pass: process.env.EMAIL_PASS, // your mailbox password
      },
    });

    // ✅ Send email
    await transporter.sendMail({
      from: `"Lumenza Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "📩 New Inquiry from Website",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    res.json({ success: true, message: "Inquiry submitted successfully!" });
  } catch (error) {
    console.error("❌ Error in /api/inquiry:", error);
    res.status(500).json({ success: false, message: "Error submitting inquiry" });
  }
});

module.exports = router;
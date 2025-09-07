const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const fetch = require("node-fetch");
const multer = require("multer");
const path = require("path");

// File upload config (for resumes)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// POST /api/forms
router.post("/", upload.single("resume"), async (req, res) => {
  try {
    const {
      formType,
      name,
      email,
      message,
      mobile,
      position,
      captchaToken,
      recaptchaToken,
    } = req.body;

    const token = captchaToken || recaptchaToken;

    // ✅ Verify reCAPTCHA if token exists (for Inquiry & Career)
    if (token) {
      const recaptchaRes = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${token}`,
        { method: "POST" }
      );
      const recaptchaData = await recaptchaRes.json();
      if (!recaptchaData.success) {
        return res
          .status(400)
          .json({ success: false, message: "Captcha verification failed" });
      }
    }

    // ✅ Setup transporter for Zoho
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.zoho.in",
      port: process.env.EMAIL_PORT || 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ Email subject & body
    let subject = "📩 New Form Submission";
    let textBody = `Form Type: ${formType || "Unknown"}\nName: ${name}\nEmail: ${email}\nMessage: ${message}`;

    if (formType === "Inquiry") {
      subject = "📩 New Inquiry from Website";
      textBody = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;
    }

    if (formType === "Contact") {
      subject = "📩 New Contact Form Submission";
      textBody = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;
    }

    if (formType === "career") {
      subject = "📩 New Career Application";
      textBody = `Name: ${name}\nEmail: ${email}\nMobile: ${mobile}\nPosition: ${position}\nMessage: ${message}`;
    }

    // ✅ Mail options
    const mailOptions = {
      from: `"Lumenza Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject,
      text: textBody,
    };

    // ✅ If career form & resume attached → add attachment
    if (req.file) {
      mailOptions.attachments = [
        {
          filename: req.file.originalname,
          path: req.file.path,
        },
      ];
    }

    // ✅ Send email
    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "Form submitted successfully!" });
  } catch (error) {
    console.error("❌ Form submit error:", err.message, err.stack);
res.status(500).json({ error: err.message });
  }
});

module.exports = router;
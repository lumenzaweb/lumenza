import express from "express";
import multer from "multer";
import nodemailer from "nodemailer";

const router = express.Router();

// ✅ Multer setup for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ POST /api/forms
router.post("/", upload.single("resume"), async (req, res) => {
  try {
    const { name, email, message, captchaToken } = req.body;
    const file = req.file;

    // ✅ Verify reCAPTCHA with native fetch (Node.js v22+)
    const recaptchaRes = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${captchaToken}`,
      { method: "POST" }
    );

    const recaptchaData = await recaptchaRes.json();
    if (!recaptchaData.success) {
      return res.status(400).json({ error: "Invalid reCAPTCHA" });
    }

    // ✅ Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_PORT == 465, // true for SSL
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ Email content
    const mailOptions = {
      from: `"Lumenza Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Send to company inbox
      subject: "New Inquiry from Website",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <img src="${process.env.COMPANY_LOGO}" alt="Company Logo" style="max-height: 60px; margin-bottom: 20px;" />
          <h2>📩 New Inquiry Received</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong><br/>${message}</p>
        </div>
      `,
      attachments: file
        ? [
            {
              filename: file.originalname,
              content: file.buffer,
            },
          ]
        : [],
    };

    // ✅ Send Email
    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "Message sent successfully!" });
  } catch (err) {
    console.error("❌ Error in /api/forms:", err);
    res.status(500).json({ error: "Failed to send message" });
  }
});

export default router;

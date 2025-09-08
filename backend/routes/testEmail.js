import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

router.get("/test-email", async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: true, // Zoho requires SSL
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Try sending a test email
    await transporter.sendMail({
      from: `"Lumenza Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // send to yourself
      subject: "✅ Zoho SMTP Test",
      text: "If you got this, Zoho SMTP is working fine!",
    });

    res.json({ success: true, message: "✅ Test email sent successfully!" });
  } catch (error) {
    console.error("❌ Test email error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;

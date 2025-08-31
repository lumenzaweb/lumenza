import express from "express";
import multer from "multer";
import nodemailer from "nodemailer";

const router = express.Router();

// 🔹 Multer setup for file upload (career form)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// 🔹 POST /api/forms
router.post("/", upload.single("resume"), async (req, res) => {
  try {
    const { name, email, message, mobile, position, formType, captchaToken } = req.body;
    const file = req.file;

    // 🔹 Verify reCAPTCHA v2
    const recaptchaRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${process.env.RECAPTCHA_SECRET}&response=${captchaToken}`,
    });

    const recaptchaData = await recaptchaRes.json();
    console.log("🔍 reCAPTCHA response:", recaptchaData);

    if (!recaptchaData.success) {
      return res.status(400).json({ error: "Captcha verification failed", details: recaptchaData });
    }

    // 🔹 Configure GoDaddy SMTP
    const transporter = nodemailer.createTransport({
      host: "smtpout.secureserver.net",
      port: 587,
      secure: false, // SSL for GoDaddy
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false, // sometimes needed for GoDaddy SSL
      },
    });

    // 🔹 Email subject based on form type
    const subject =
      formType === "career" ? "📄 New Career Application" : "📩 New Website Inquiry";

    // 🔹 Email body
    let htmlContent = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2>${subject}</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
    `;

    if (mobile) htmlContent += `<p><strong>Mobile:</strong> ${mobile}</p>`;
    if (position) htmlContent += `<p><strong>Position:</strong> ${position}</p>`;
    if (message) htmlContent += `<p><strong>Message:</strong><br/>${message}</p>`;

    htmlContent += `</div>`;

    // 🔹 Email options
    const mailOptions = {
      from: `"Lumenza Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject,
      html: htmlContent,
      attachments: file
        ? [
            {
              filename: file.originalname,
              content: file.buffer,
            },
          ]
        : [],
    };

    // 🔹 Send email
    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "✅ Message sent successfully!" });
  } catch (err) {
    console.error("❌ Error in /api/forms:", err);
    res.status(500).json({ error: "Server error. Failed to send message." });
  }
});

export default router;

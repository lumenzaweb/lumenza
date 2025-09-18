import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";
import testEmailRoute from "./routes/testEmail.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/", testEmailRoute);

// ✅ ENV check
console.log("✅ ENV check:", {
  PORT: process.env.PORT,
  MONGO_URI: !!process.env.MONGO_URI,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_PORT: process.env.EMAIL_PORT,
  RECAPTCHA_SECRET: !!process.env.RECAPTCHA_SECRET,
});

// ✅ MongoDB connect
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Mongoose schema
const formSchema = new mongoose.Schema(
  {
    formType: { type: String, required: true },
    name: String,
    email: String,
    message: String,
    resume: String,
    extra: Object,
  },
  { timestamps: true }
);

const Form = mongoose.model("Form", formSchema);

// ✅ File upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "uploads/";
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: (req, file, cb) => {
    const allowedTypes = /pdf|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    if (extname) return cb(null, true);
    cb(new Error("Only PDF/DOC/DOCX allowed!"));
  },
});

// ✅ Email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ Route: handle ALL forms
app.post("/api/forms", upload.single("resume"), async (req, res) => {
  try {
    const { formType, name, email, message, captchaToken, ...extra } = req.body;
    const resumeFile = req.file ? req.file.path : null;

    // --- ✅ FIX APPLIED HERE ---
    // Only perform reCAPTCHA verification for specific forms that send a token.
    if (formType === "Inquiry") {
      if (!captchaToken) {
        return res.status(400).json({ success: false, message: "Captcha verification is required for this form." });
      }

      const captchaVerify = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${captchaToken}`,
        { method: "POST" }
      ).then((res) => res.json());

      if (!captchaVerify.success) {
        console.error("❌ Captcha verification failed:", captchaVerify['error-codes']);
        return res.status(400).json({ success: false, message: "Captcha verification failed." });
      }
    }
    // For other formTypes like "Partner", this entire block is skipped.

    // ✅ Save to DB (This part runs for all forms)
    const newForm = new Form({ formType, name, email, message, resume: resumeFile, extra });
    await newForm.save();

    // ✅ Email subject per form
    let subject = `New ${formType} Submission from ${name}`;
    if (formType === "Inquiry") subject = `📩 New Inquiry from ${name}`;
    if (formType === "Career") subject = `💼 New Career Application from ${name}`;
    if (formType === "Partner") subject = `🤝 New Partner Application from ${name}`;

    // ✅ Email body
    const mailOptions = {
      from: `"${formType} Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject,
      html: `
        <div style="font-family:Arial,sans-serif;padding:20px;border:1px solid #eee;border-radius:10px;">
          <h2 style="color:#d32f2f;">${subject}</h2>
          <p><strong>Name:</strong> ${name || "N/A"}</p>
          <p><strong>Email:</strong> ${email || "N/A"}</p>
          ${message ? `<p><strong>Message:</strong> ${message}</p>` : ""}
          ${resumeFile ? `<p><strong>Resume attached</strong></p>` : ""}
          ${
            Object.keys(extra).length
              ? `<hr><h3 style="color:#333;">Additional Details:</h3><pre style="background:#f8f8f8;padding:10px;border-radius:5px;">${JSON.stringify(
                  extra, null, 2
                )}</pre>`
              : ""
          }
          <p style="margin-top:20px;color:#555;font-size:12px;">Submitted on ${new Date().toLocaleString()}</p>
        </div>
      `,
      attachments: resumeFile
        ? [{ filename: path.basename(resumeFile), path: resumeFile }]
        : [],
    };

    await transporter.sendMail(mailOptions);

    // ✅ Auto-reply to user
    if (email) {
      await transporter.sendMail({
        from: `"LUMENZA" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "✅ We've received your submission",
        html: `
          <div style="font-family:Arial,sans-serif;padding:20px;">
            <h3>Thank you for contacting us, ${name}!</h3>
            <p>Your ${formType} submission has been received. Our team will get back to you soon.</p>
            <p style="color:#555;">Best regards,<br/>The Lumenza Team</p>
          </div>
        `,
      });
    }

    res.status(200).json({ success: true, message: "Form submitted successfully" });
  } catch (err) {
    console.error("❌ Form submit error:", err.message);
    res.status(500).json({ success: false, message: "An internal server error occurred." });
  }
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

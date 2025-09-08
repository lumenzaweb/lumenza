import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
// ❌ removed "node-fetch" – use global fetch instead
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";
import testEmailRoute from "./routes/testEmail.js";
app.use("/", testEmailRoute);

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

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

// ✅ Mongoose schema (flexible for any form)
const formSchema = new mongoose.Schema(
  {
    formType: { type: String, required: true },
    name: String,
    email: String,
    message: String,
    resume: String, // file path for uploaded CV
    extra: Object,
  },
  { timestamps: true }
);

const Form = mongoose.model("Form", formSchema);

// ✅ File upload config (store in /uploads)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "uploads/";
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
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
  port: process.env.EMAIL_PORT,
  secure: true, // true for 465, false for 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendMail = async ({ to, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"Lumenza Support" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    console.log("✅ Email sent:", info.messageId);
    return true;
  } catch (err) {
    console.error("❌ Email sending failed:", err);
    return false;
  }
};

// ✅ Route: handle ALL forms (with optional file upload)
app.post("/api/forms", upload.single("resume"), async (req, res) => {
  try {
    const { formType, name, email, message, captchaToken, ...extra } = req.body;
    const resumeFile = req.file ? req.file.path : null;

    // ✅ reCAPTCHA verification (using built-in fetch)
    const captchaVerify = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${captchaToken}`,
      { method: "POST" }
    ).then((res) => res.json());

    if (!captchaVerify.success) {
      return res.status(400).json({ error: "Captcha verification failed" });
    }

    // ✅ Save to DB
    const newForm = new Form({ formType, name, email, message, resume: resumeFile, extra });
    await newForm.save();

    // ✅ Email subject per form
    let subject = `New ${formType} Submission`;
    if (formType === "Inquiry") subject = "📩 New Inquiry Received";
    if (formType === "Career") subject = "💼 New Career Application";
    if (formType === "Newsletter") subject = "📰 New Newsletter Subscription";

    // ✅ Email body
    const mailOptions = {
      from: `"${formType} Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject,
      html: `
        <div style="font-family:Arial,sans-serif;padding:20px;border:1px solid #eee;border-radius:10px;">
          <img src="${process.env.COMPANY_LOGO}" alt="Company Logo" style="width:120px;margin-bottom:20px;" />
          <h2 style="color:#d32f2f;">${subject}</h2>
          <p><strong>Name:</strong> ${name || "N/A"}</p>
          <p><strong>Email:</strong> ${email || "N/A"}</p>
          ${message ? `<p><strong>Message:</strong> ${message}</p>` : ""}
          ${resumeFile ? `<p><strong>Resume attached</strong></p>` : ""}
          ${
            Object.keys(extra).length
              ? `<pre style="background:#f8f8f8;padding:10px;border-radius:5px;">${JSON.stringify(
                  extra,
                  null,
                  2
                )}</pre>`
              : ""
          }
          <p style="margin-top:20px;color:#555;font-size:12px;">Submitted on ${new Date().toLocaleString()}</p>
        </div>
      `,
      attachments: resumeFile
        ? [
            {
              filename: path.basename(resumeFile),
              path: resumeFile,
            },
          ]
        : [],
    };

    await transporter.sendMail(mailOptions);

    // ✅ Auto-reply to user
    if (email) {
      await transporter.sendMail({
        from: `"Your Company" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "✅ We received your submission",
        html: `
          <div style="font-family:Arial,sans-serif;padding:20px;">
            <img src="${process.env.COMPANY_LOGO}" alt="Logo" style="width:100px;margin-bottom:20px;" />
            <h3>Thank you for contacting us!</h3>
            <p>Your ${formType} has been received. Our team will get back to you soon.</p>
            <p style="color:#555;">Best regards,<br/>Team</p>
          </div>
        `,
      });
    }

    res.status(200).json({ success: true, message: "Form submitted successfully" });
  } catch (err) {
    console.error("❌ Form submit error:", err.message, err.stack);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
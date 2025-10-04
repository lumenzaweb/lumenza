import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";
import fetch from "node-fetch"; // Added for reCAPTCHA verification
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
  EMAIL_PORT: process.env.EMAIL_PORT, // Should be 587 (or relay port)
  RECAPTCHA_SECRET: !!process.env.RECAPTCHA_SECRET,
});

// --- 1. NEW: reCAPTCHA Verification Middleware ---
// This function runs FIRST, before any slow tasks like file uploads.
const verifyRecaptcha = async (req, res, next) => {
  // For Career submissions, multer processes the file first, so form data is in req.body
  // For Contact/Partner submissions, the JSON body is used.
  const { formType, captchaToken } = req.body;

  // Define which forms require captcha verification
  const requireCaptcha = ["Inquiry", "Career", "Partner", "Contact"]; // Added all relevant forms
    
  if (requireCaptcha.includes(formType)) {
    if (!captchaToken) {
      return res.status(400).json({ success: false, message: "Captcha token is required." });
    }

    try {
      const response = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${captchaToken}`,
        { method: "POST" }
      );
      const data = await response.json();

      if (!data.success) {
        console.error("❌ Captcha verification failed:", data['error-codes']);
        // Stop the request here if captcha fails
        return res.status(400).json({ success: false, message: "Captcha verification failed." });
      }
      
      // If successful, proceed to the next step (file upload and form processing)
      next(); 
    } catch (error) {
      console.error("❌ Captcha middleware error:", error);
      return res.status(500).json({ success: false, message: "Error during captcha verification." });
    }
  } else {
    // If the form type doesn't require captcha, just skip this step.
    next();
  }
};

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
    // If contact is present in 'extra', it's better to log it explicitly
    contact: String, 
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

// ✅ Email transporter (UPDATED FOR RELIABILITY ON RENDER)
// Assumes EMAIL_HOST/EMAIL_USER/EMAIL_PASS are set for a relay service (like Brevo/SendGrid)
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'), // Use 587 by default
  secure: process.env.EMAIL_PORT == 465, // Use SMTPS only if port 465 is specified
  requireTLS: process.env.EMAIL_PORT != 465, // Use STARTTLS for all other ports (like 587)
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify(function (error, success) {
    if (error) {
        console.error(`Nodemailer connection failed. Test error for port ${process.env.EMAIL_PORT || '587'}:`, error.message);
    } else {
        console.log(`Nodemailer connection successful on port ${process.env.EMAIL_PORT || '587'}!`);
    }
});

// ✅ UPDATED ROUTE: Responds instantly and handles all form fields consistently
// The order is important: verifyRecaptcha must run before upload.single in this setup
app.post("/api/forms", verifyRecaptcha, upload.single("resume"), (req, res) => {
  // --- A. SEND RESPONSE IMMEDIATELY ---
  res.status(200).json({ success: true, message: "Form submission received and is being processed." });

  // --- B. DO SLOW TASKS IN THE BACKGROUND ---
  const processFormSubmission = async () => {
    try {
      // Extract known main fields and put the rest (like investment, category, etc.) into 'extra'
      // CHANGE: Explicitly extract 'contact' field as it's a critical piece of data
      const { formType, name, email, contact, message, captchaToken, ...extra } = req.body;
      const resumeFile = req.file ? req.file.path : null;

      // Create a complete object of all additional details for the email body
      // Filter out null/empty values and add contact to the extra details
      const allDetails = Object.fromEntries(
        Object.entries({ contact: contact || '', ...extra }).filter(([_, v]) => v)
      );

      // ✅ Save to DB
      const newForm = new Form({ formType, name, email, contact: contact || '', message, resume: resumeFile, extra: allDetails });
      await newForm.save();
      console.log(`✅ Form (${formType}) from ${name} saved to DB.`);

      // ✅ Email subject per form
      let subject = `New ${formType} Submission from ${name}`;
      if (formType === "Inquiry" || formType === "Contact") subject = `📩 New Inquiry from ${name}`;
      if (formType === "Career") subject = `💼 New Career Application from ${name}`;
      if (formType === "Partner") subject = `🤝 New Partner Application from ${name}`;

      // ✅ Email body
      const detailsHtml = Object.keys(allDetails).length > 0
        ? `<hr><h3 style="color:#333;">Additional Details:</h3><pre style="background:#f8f8f8;padding:10px;border-radius:5px;">${JSON.stringify(
            allDetails, null, 2
          )}</pre>`
        : "";

      const mailOptions = {
        from: `"${formType} Form" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        subject,
        html: `
          <div style="font-family:Arial,sans-serif;padding:20px;border:1px solid #eee;border-radius:10px;">
            <h2 style="color:#d32f2f;">${subject}</h2>
            <p><strong>Name:</strong> ${name || "N/A"}</p>
            <p><strong>Email:</strong> ${email || "N/A"}</p>
            ${contact ? `<p><strong>Contact:</strong> ${contact}</p>` : ""}
            ${message ? `<p><strong>Message:</strong> ${message}</p>` : ""}
            ${resumeFile ? `<p><strong>Resume attached</strong></p>` : ""}
            ${detailsHtml}
            <p style="margin-top:20px;color:#555;font-size:12px;">Submitted on ${new Date().toLocaleString()}</p>
          </div>
        `,
        attachments: resumeFile
          ? [{ filename: path.basename(resumeFile), path: resumeFile }]
          : [],
      };

      await transporter.sendMail(mailOptions);
      console.log(`✅ Main notification email sent for ${formType} from ${name}.`);

      // ✅ Auto-reply to user
      if (email) {
        await transporter.sendMail({
          from: `"Support Team LUMENZA" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: "✅ We've received your submission",
          html: `
            <div style="font-family:Arial,sans-serif;padding:20px;">
              <h3>Thank you for contacting us, ${name}!</h3>
              <p>Your ${formType} details submission has been received. Our team will get back to you soon.</p>
              <p style="color:#555;">Best regards,<br/> Support Team, LUMENZA </p>
            </div>
          `,
        });
        console.log(`✅ Auto-reply sent to ${email}.`);
      }
    } catch (err) {
      // Logging only the error message for cleaner output, but keeping the full error object in memory if needed
      console.error("❌ Error during background form processing:", err.message);
    }
  };
  
  // Start the background processing
  processFormSubmission();
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

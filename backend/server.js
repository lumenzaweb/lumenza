import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import nodemailer from "nodemailer"; // NOTE: Now unused, kept for clarity
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";
import fetch from "node-fetch"; 
import testEmailRoute from "./routes/testEmail.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/", testEmailRoute);

// --- BREVO API CONFIGURATION ---
const SENDER_EMAIL = process.env.EMAIL_USER; 
const BREVO_API_KEY = process.env.BREVO_API_KEY; 
// FIX APPLIED HERE: Read the new sender name from environment variables
const SENDER_NAME = process.env.SENDER_NAME || 'LUMENZA Support';
// -------------------------------

// ✅ ENV check (Simplified)
console.log("✅ ENV check:", {
  PORT: process.env.PORT,
  MONGO_URI: !!process.env.MONGO_URI,
  EMAIL_USER: SENDER_EMAIL, 
  SENDER_NAME: SENDER_NAME, // Log the new variable
  EMAIL_HOST: process.env.EMAIL_HOST, 
  EMAIL_PORT: process.env.EMAIL_PORT, 
  RECAPTCHA_SECRET: !!process.env.RECAPTCHA_SECRET,
  BREVO_API_KEY: !!BREVO_API_KEY
});

// --- Brevo API Email Sender Function (Attachment Logic Corrected) ---
const sendEmailViaBrevo = async (toEmail, subject, htmlContent, attachmentPath = null) => {
    if (!BREVO_API_KEY) {
        console.error("❌ BREVO_API_KEY is not set. Cannot send email.");
        return;
    }

    const apiAttachments = [];

    // ONLY process the attachment if a valid path is provided
    if (attachmentPath && fs.existsSync(attachmentPath)) {
        try {
            // Read file content and encode it to base64
            const content = fs.readFileSync(attachmentPath).toString('base64');
            apiAttachments.push({
                content,
                name: path.basename(attachmentPath)
            });
        } catch (err) {
            console.error(`❌ Failed to read or encode attachment file: ${attachmentPath}`, err.message);
            // We can still proceed without the attachment if reading fails, but log the error.
        }
    }

    const payload = {
        // FIX APPLIED HERE: Added the SENDER_NAME to the payload
        sender: { name: SENDER_NAME, email: SENDER_EMAIL }, 
        to: [{ email: toEmail }],
        subject: subject,
        htmlContent: htmlContent,
        // Include attachments only if the array is populated
        ...(apiAttachments.length > 0 && { attachment: apiAttachments }),
    };

    try {
        const response = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'api-key': BREVO_API_KEY,
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error(`❌ Brevo API Error (${response.status}):`, data.message || 'Unknown API error');
            throw new Error(`Brevo API failed: ${data.message || response.status}`);
        }
        
        console.log(`✅ Email sent successfully via Brevo API. Message ID: ${data.messageId}`);
    } catch (error) {
        console.error("❌ Error sending email via Brevo API:", error.message);
        throw error;
    }
};
// ------------------------------------------


// --- 1. NEW: reCAPTCHA Verification Middleware ---
const verifyRecaptcha = async (req, res, next) => {
  const { formType, captchaToken } = req.body;

  // Define which forms require captcha verification
  const requireCaptcha = ["Inquiry", "Career", "Contact"]; 

  if (requireCaptcha.includes(formType)) {
    if (!captchaToken) {
      return res.status(400).json({ success: false, message: "Captcha token is required for this form type." });
    }

    try {
      const response = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${captchaToken}`,
        { method: "POST" }
      );
      const data = await response.json();

      if (!data.success) {
        console.error("❌ Captcha verification failed:", data['error-codes']);
        return res.status(400).json({ success: false, message: "Captcha verification failed." });
      }
      
      next(); 
    } catch (error) {
      console.error("❌ Captcha middleware error:", error);
      return res.status(500).json({ success: false, message: "Error during captcha verification." });
    }
  } else {
    next();
  }
};


// ✅ MongoDB connect
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Mongoose schema (unchanged)
const formSchema = new mongoose.Schema(
  {
    formType: { type: String, required: true },
    name: String,
    email: String,
    message: String,
    contact: String, 
    resume: String,
    extra: Object,
  },
  { timestamps: true }
);

const Form = mongoose.model("Form", formSchema);

// ✅ File upload config (unchanged)
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


// ✅ ROUTE: Responds instantly and handles all form fields consistently
app.post("/api/forms", verifyRecaptcha, upload.single("resume"), (req, res) => {
  // --- A. SEND RESPONSE IMMEDIATELY ---
  res.status(200).json({ success: true, message: "Form submission received and is being processed." });

  // --- B. DO SLOW TASKS IN THE BACKGROUND ---
  const processFormSubmission = async () => {
    const resumeFile = req.file ? req.file.path : null;

    try {
        const { formType, name, email, contact, message, captchaToken, ...extra } = req.body;
        
        // Prepare data for DB and Email
        const allDetails = Object.fromEntries(
            Object.entries({ contact: contact || '', ...extra }).filter(([_, v]) => v)
        );

        // ✅ Save to DB
        const newForm = new Form({ formType, name, email, contact: contact || '', message, resume: resumeFile, extra: allDetails });
        await newForm.save();
        console.log(`✅ Form (${formType}) from ${name} saved to DB.`);

        // ✅ Email content setup
        let subject = `New ${formType} Submission from ${name}`;
        if (formType === "Inquiry" || formType === "Contact") subject = `📩 New Inquiry from ${name}`;
        if (formType === "Career") subject = `💼 New Career Application from ${name}`;
        if (formType === "Partner") subject = `🤝 New Partner Application from ${name}`;
        
        const detailsHtml = Object.keys(allDetails).length > 0
        ? `<hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;"><h3 style="color:#333;">Additional Details:</h3><pre style="background:#f8f8f8;padding:10px;border-radius:5px;white-space: pre-wrap;">${JSON.stringify(
            allDetails, null, 2
          )}</pre>`
        : "";

        const mainEmailHtml = `
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
        `;


        // ✅ 1. Send Main notification email (to your support address)
        await sendEmailViaBrevo(SENDER_EMAIL, subject, mainEmailHtml, resumeFile);
        console.log(`✅ Main notification email sent for ${formType} from ${name}.`);

        // ✅ 2. Auto-reply to user (if email provided)
        if (email) {
            const autoReplyHtml = `
              <div style="font-family:Arial,sans-serif;padding:20px;color:#333;line-height:1.6;">
                <h3 style="color:#1a73e8;">Thank you for your submission, ${name}!</h3>
                <p>We have successfully received your ${formType.toLowerCase()} details submission.</p>
                <p>Our team will review the details and get back to you as soon as possible. We appreciate your interest with LUMENZA.</p>
                
                <p style="margin-top:25px;padding-top:15px;border-top:1px solid #eee;">
                  Best regards,<br/> 
                  <strong style="color:#d32f2f;">support Team, LUMENZA</strong>
                </p>
              </div>
            `;
            // Do NOT pass resumeFile path to the auto-reply
            await sendEmailViaBrevo(email, "✅ We've received your submission", autoReplyHtml);
            console.log(`✅ Auto-reply sent to ${email}.`);
        }

    } catch (err) {
        console.error("❌ Error during background form processing:", err.message);
    } finally {
        // Clean up the uploaded resume file if it exists
        if (resumeFile && fs.existsSync(resumeFile)) {
            fs.unlinkSync(resumeFile);
            console.log(`🗑️ Deleted temporary file: ${resumeFile}`);
        }
    }
  };
  
  // Start the background processing
  processFormSubmission();
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
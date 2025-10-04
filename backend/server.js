import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import nodemailer from "nodemailer"; // NOTE: Now unused, but kept for clarity
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
// We use these ENV variables for the API call instead of SMTP transport
const SENDER_EMAIL = process.env.EMAIL_USER; 
const BREVO_API_KEY = process.env.BREVO_API_KEY; 
// -------------------------------

// ✅ ENV check
console.log("✅ ENV check:", {
  PORT: process.env.PORT,
  MONGO_URI: !!process.env.MONGO_URI,
  EMAIL_USER: SENDER_EMAIL, // Brevo Login/Sender
  EMAIL_HOST: process.env.EMAIL_HOST, // Now irrelevant (SMTP)
  EMAIL_PORT: process.env.EMAIL_PORT, // Now irrelevant (SMTP)
  RECAPTCHA_SECRET: !!process.env.RECAPTCHA_SECRET,
  BREVO_API_KEY: !!BREVO_API_KEY // Check for the API Key
});

// --- Brevo API Email Sender Function ---
const sendEmailViaBrevo = async (toEmail, subject, htmlContent, attachments = []) => {
    if (!BREVO_API_KEY) {
        console.error("❌ BREVO_API_KEY is not set. Cannot send email.");
        return;
    }

    // Attachments must be base64 encoded for the Brevo API
    const apiAttachments = attachments.map(att => {
        // Read file content and encode it to base64
        const content = fs.readFileSync(att.path).toString('base64');
        return {
            content,
            name: att.filename
        };
    });

    const payload = {
        sender: { email: SENDER_EMAIL }, // Uses your verified support@lumenza.co.in
        to: [{ email: toEmail }],
        subject: subject,
        htmlContent: htmlContent,
        attachment: apiAttachments,
    };

    try {
        const response = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'api-key': BREVO_API_KEY, // Uses the secure API key
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


// --- 2. OLD: ReCAPTCHA Verification Middleware ---
const verifyRecaptcha = async (req, res, next) => {
  // ... (recaptcha verification logic remains unchanged, as it uses fetch)
    const { formType, captchaToken } = req.body;
    const requireCaptcha = ["Inquiry", "Career", "Partner", "Contact"];
    
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
    const resumeAttachment = resumeFile ? [{ filename: path.basename(resumeFile), path: resumeFile }] : [];

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
        ? `<hr><h3 style="color:#333;">Additional Details:</h3><pre style="background:#f8f8f8;padding:10px;border-radius:5px;">${JSON.stringify(
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
        await sendEmailViaBrevo(SENDER_EMAIL, subject, mainEmailHtml, resumeAttachment);
        console.log(`✅ Main notification email sent for ${formType} from ${name}.`);

        // ✅ 2. Auto-reply to user (if email provided)
        if (email) {
            const autoReplyHtml = `
              <div style="font-family:Arial,sans-serif;padding:20px;">
                <h3>Thank you for contacting us, ${name}!</h3>
                <p>Your ${formType} details submission has been received. Our team will get back to you soon.</p>
                <p style="color:#555;">Best regards,<br/> Support Team, LUMENZA </p>
              </div>
            `;
            await sendEmailViaBrevo(email, "✅ We've received your submission", autoReplyHtml);
            console.log(`✅ Auto-reply sent to ${email}.`);
        }

    } catch (err) {
        console.error("❌ Error during background form processing:", err.message);
    } finally {
        // Clean up the uploaded resume file if it exists
        if (resumeFile && fs.existsSync(resumeFile)) {
            fs.unlinkSync(resumeFile);
        }
    }
  };
  
  // Start the background processing
  processFormSubmission();
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

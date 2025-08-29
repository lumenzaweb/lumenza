const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

// POST /api/inquiry
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Save to DB (optional)
    // const newInquiry = new Inquiry({ name, email, message });
    // await newInquiry.save();

    // Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.MAIL_USER,
      subject: "New Inquiry",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    res.json({ success: true, message: "Inquiry submitted successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error submitting inquiry" });
  }
});

module.exports = router;
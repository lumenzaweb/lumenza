import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const InquirySection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCaptcha = (token) => {
    setRecaptchaToken(token);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recaptchaToken) {
      setStatus("❌ Please verify the captcha.");
      return;
    }

    setStatus("Sending...");

    try {
      const res = await fetch("https://lumenza.onrender.com/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType: "Inquiry", ...formData, recaptchaToken }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("✅ Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
        setRecaptchaToken(null);
      } else {
        setStatus(`❌ Error: ${data.message || "Submission failed"}`);
      }
    } catch (err) {
      setStatus("❌ Failed to send message");
      console.error("Inquiry form error:", err);
    }
  };

  return (
    <section
      id="inquiry"
      className="py-20 px-6 bg-gradient-to-r from-red-600 via-red-500 to-red-700 text-white scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold mb-4">Get in Touch</h2>
        <p className="text-lg text-red-100 mb-12">
          Have questions or ideas? We'd love to hear from you. Fill out the form
          below and our team will get back to you.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white text-gray-800 shadow-2xl rounded-2xl p-10 max-w-3xl mx-auto space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              name="name"
              placeholder="Your Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-red-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-red-500"
            />
          </div>

          <textarea
            name="message"
            placeholder="Your Message..."
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full p-4 border rounded-xl h-40 resize-none focus:ring-2 focus:ring-red-500"
          />

          {/* Google reCAPTCHA */}
          <div className="flex justify-center">
            <ReCAPTCHA
              sitekey="6LdW9LgrAAAAAGz7TLHCaOOWYRWAw6GDYH5XFlvt" // ✅ your site key
              onChange={handleCaptcha}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-4 rounded-xl text-lg font-semibold hover:bg-red-700 transition-all shadow-lg"
          >
            Send Message
          </button>
        </form>

        {status && <p className="mt-6 text-lg">{status}</p>}
      </div>
    </section>
  );
};

export default InquirySection;

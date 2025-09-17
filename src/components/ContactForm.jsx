import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState(""); // ✅ message feedback
  const [captchaToken, setCaptchaToken] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCaptcha = (token) => {
    setCaptchaToken(token);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaToken) {
      setStatus("❌ Please verify the captcha.");
      return;
    }

    try {
      setStatus("Sending");

      const res = await fetch("https://lumenza.onrender.com/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType: "Contact", ...formData, captchaToken }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("✅ Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
        setCaptchaToken(null);
        window.grecaptcha?.reset(); // ✅ reset captcha widget
      } else {
        setStatus("❌ Failed: " + (data.message || "Please try again."));
      }
    } catch (err) {
      console.error("❌ Contact form error:", err);
      setStatus("❌ Something went wrong. Try again later.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
      
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />

        {/* Google reCAPTCHA */}
        <div className="flex justify-center">
          <ReCAPTCHA
            sitekey="6LdW9LgrAAAAAGz7TLHCaOOWYRWAw6GDYH5XFlvt"
            onChange={handleCaptcha}
          />
        </div>

        <button
          type="submit"
          className="bg-yellow-500 text-white py-2 rounded font-semibold hover:bg-yellow-600"
        >
          Send
        </button>
      </form>

      {/* Status message */}
      {status && (
        <p className="mt-4 text-center text-lg font-medium">{status}</p>
      )}
    </div>
  );
};

export default ContactForm;

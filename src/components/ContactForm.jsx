import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

// --- VALIDATION HELPER FUNCTION ---
const isValidEmail = (email) => {
    // Basic regex for email format
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
// --- END VALIDATION HELPER FUNCTION ---


const ContactForm = () => {
 const [formData, setFormData] = useState({
  name: "",
  email: "",
  message: "",
 });

 const [status, setStatus] = useState("");
 const [errors, setErrors] = useState({}); // State to hold validation errors
 const [captchaToken, setCaptchaToken] = useState(null);

 const handleChange = (e) => {
    const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
    // Clear the error for this field when the user starts typing
    if (errors[name]) setErrors({ ...errors, [name]: null });
 };

 const handleCaptcha = (token) => {
  setCaptchaToken(token);
    // Clear captcha error when verification is successful
    if (errors.captcha) setErrors({ ...errors, captcha: null });
 };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.message) newErrors.message = "Message is required.";
    
    // Email Validation
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!captchaToken) newErrors.captcha = "Captcha verification is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

    if (!validateForm()) {
        setStatus("❌ Please correct the errors in the form.");
        return;
    }
    
  try {
   setStatus("Sending...");

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
        window.grecaptcha?.reset();
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
        {/* Name Input */}
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className={`p-2 border rounded ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.name && <p className="text-red-500 text-sm mt-[-8px]">{errors.name}</p>}

        {/* Email Input */}
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className={`p-2 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.email && <p className="text-red-500 text-sm mt-[-8px]">{errors.email}</p>}

        {/* Message Input */}
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          className={`p-2 border rounded resize-none h-28 ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.message && <p className="text-red-500 text-sm mt-[-8px]">{errors.message}</p>}

        {/* Google reCAPTCHA */}
        <div className="flex flex-col items-center gap-1">
          <ReCAPTCHA
            sitekey="6LdW9LgrAAAAAGz7TLHCaOOWYRWAw6GDYH5XFlvt"
            onChange={handleCaptcha}
          />
          {errors.captcha && <p className="text-red-500 text-sm">{errors.captcha}</p>}
        </div>

        <button
          type="submit"
          className="bg-yellow-500 text-white py-2 rounded font-semibold hover:bg-yellow-600 transition duration-150"
        >
          Send
        </button>
      </form>

      {/* Status message */}
      {status && (
        <p className={`mt-4 text-center text-lg font-medium ${status.startsWith("❌") ? 'text-red-600' : 'text-green-600'}`}>{status}</p>
      )}
    </div>
  );
};

export default ContactForm;

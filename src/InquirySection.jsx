import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { CheckCircle, XCircle } from "lucide-react";
import { Link } from "react-router-dom"; // Import Link for internal navigation

// Array for the new "Useful Links" section
const usefulLinks = [
  { title: "Our Products", href: "/products" },
  { title: "About Us", href: "/#about" },
  { title: "Career", href: "/career" },
  { title: "FAQs", href: "/#faq" }, // Example link, you can change this
];

const InquirySection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    message: "",
  });

  const [popup, setPopup] = useState({ show: false, type: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCaptcha = (token) => {
    setRecaptchaToken(token);
  };

  const showPopup = (type, message) => {
    setPopup({ show: true, type, message });
    setTimeout(() => {
      setPopup({ show: false, type: "", message: "" });
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!recaptchaToken) {
      showPopup("error", "Please verify the captcha.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("https://lumenza.onrender.com/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "Inquiry",
          ...formData,
          captchaToken: recaptchaToken,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showPopup("success", "Submitted !");
        setFormData({ name: "", email: "", contact: "", message: "" });
        window.grecaptcha?.reset();
      } else {
        showPopup("error", data.message || "Submission failed");
      }
    } catch (err) {
      console.error("Inquiry form error:", err);
      showPopup("error", "Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="inquiry"
      className="py-20 px-4 sm:px-6 bg-gradient-to-r from-red-600 via-red-500 to-red-700 text-white scroll-mt-20 relative"
    >
      {/* Center Popup */}
      {popup.show && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center gap-4 w-[90%] max-w-md text-center animate-fadeIn">
            {popup.type === "success" ? (
              <CheckCircle className="w-12 h-12 text-green-600" />
            ) : (
              <XCircle className="w-12 h-12 text-red-600" />
            )}
            <p className="text-lg font-semibold text-gray-800">
              {popup.message}
            </p>
          </div>
        </div>
      )}

      {/* Main container with two-column layout on large screens */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* === Left Column (Info & Links) === */}
        <div className="text-center lg:text-left">
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-4">Get in Touch</h2>
          <p className="text-lg text-red-100 mb-10">
            Have questions or ideas? We'd love to hear from you. Fill out the form
            and our team will get back to you.
          </p>

          <h3 className="text-2xl font-bold mb-4 border-b border-red-400/50 pb-2">
            Useful Links
          </h3>
          <div className="grid grid-cols-2 gap-4 text-left">
            {usefulLinks.map((link) => (
              <Link
                key={link.title}
                to={link.href}
                className="text-red-100 hover:text-white hover:underline transition-colors"
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>

        {/* === Right Column (Inquiry Form) === */}
        <form
          onSubmit={handleSubmit}
          className="bg-white text-gray-800 shadow-2xl rounded-2xl p-8 lg:p-10 w-full space-y-6"
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

          <input
            type="tel"
            name="contact"
            placeholder="Your Contact Number"
            value={formData.contact}
            onChange={handleChange}
            required
            className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-red-500"
          />

          <textarea
            name="message"
            placeholder="Your Message..."
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full p-4 border rounded-xl h-40 resize-none focus:ring-2 focus:ring-red-500"
          />

          <div className="flex justify-center">
            <ReCAPTCHA
              sitekey="6LdW9LgrAAAAAGz7TLHCaOOWYRWAw6GDYH5XFlvt"
              onChange={handleCaptcha}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`relative flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-800 text-white py-4 px-6 rounded-xl text-lg font-semibold shadow-md transition-all w-full
              ${
                loading
                  ? "opacity-80 cursor-not-allowed"
                  : "hover:shadow-lg hover:scale-105"
              }
            `}
          >
            {loading ? (
              <svg
                className="w-5 h-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            ) : (
              "Send Message"
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default InquirySection;

import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { CheckCircle, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const usefulLinks = [
  { title: "Our Products", href: "/products" },
  { title: "About Us", href: "/#about" },
  { title: "Career", href: "/career" },
  { title: "Partner With Us", href: "/partner-with-us" },
];

const InquirySection = () => {
  const [formData, setFormData] = useState({
    name: "", email: "", contact: "", message: "",
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
          formType: "Inquiry", ...formData, captchaToken: recaptchaToken,
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

  const contentVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section
      id="inquiry"
      className="py-20 px-4 sm:px-6 text-white scroll-mt-20 relative overflow-hidden"
    >
      {/* --- NEW: Animated Gradient Background --- */}
      <div className="absolute inset-0 z-0 animated-gradient"></div>
      
      {popup.show && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
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

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        <motion.div
          className="text-center lg:text-left"
          variants={contentVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-4 bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent">
            Get in Touch
          </h2>
          <p className="text-lg text-gray-300 mb-10">
            Have questions or ideas? We'd love to hear from you. Fill out the form
            and our team will get back to you.
          </p>
          <h3 className="text-2xl font-bold mb-4 border-b border-white/20 pb-2">
            Useful Links
          </h3>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-left">
            {usefulLinks.map((link) => (
              <Link
                key={link.title}
                to={link.href}
                className="text-gray-300 hover:text-white hover:underline transition-colors duration-300"
              >
                {link.title}
              </Link>
            ))}
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="bg-black/20 backdrop-blur-lg border border-white/20 text-white shadow-2xl rounded-2xl p-8 lg:p-10 w-full space-y-6"
          variants={contentVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, delay: 0.2 }}
        >
          <div className="grid md:grid-cols-2 gap-6">
            <input type="text" name="name" placeholder="Your Full Name" value={formData.name} onChange={handleChange} required className="w-full p-4 bg-white/5 border border-white/30 rounded-xl placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all duration-300" />
            <input type="tel" name="contact" placeholder="Your Contact Number" value={formData.contact} onChange={handleChange} required className="w-full p-4 bg-white/5 border border-white/30 rounded-xl placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all duration-300" />
          </div>
          <input type="email" name="email" placeholder="Your Email Address" value={formData.email} onChange={handleChange} required className="w-full p-4 bg-white/5 border border-white/30 rounded-xl placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all duration-300" />
          <textarea name="message" placeholder="Your Message..." value={formData.message} onChange={handleChange} required className="w-full p-4 bg-white/5 border border-white/30 rounded-xl h-32 resize-none placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all duration-300" />
          
          <div className="flex justify-center"><ReCAPTCHA sitekey="6LdW9LgrAAAAAGz7TLHCaOOWYRWAw6GDYH5XFlvt" onChange={handleCaptcha} theme="dark" /></div>
          
          <button
  type="submit"
  disabled={loading}
  className={`flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-800 text-white py-4 px-6 rounded-xl text-lg font-semibold shadow-md transition-all duration-300 w-full
    ${
      loading
        ? "opacity-70 cursor-not-allowed"
        : "hover:shadow-lg hover:shadow-red-500/50 hover:scale-105 group overflow-hidden"
    }`}
>
  {loading ? (
    // Loading state: Show a spinner
    <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
  ) : (
    // Default state: Show text and arrow icon
    <>
      <span className="transition-transform duration-300 group-hover:-translate-x-3">
        Send Message
      </span>
      <svg
        className="w-5 h-5 absolute right-6 transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
      </svg>
    </>
  )}
</button>
        </motion.form>
      </div>
    </section>
  );
};

export default InquirySection;

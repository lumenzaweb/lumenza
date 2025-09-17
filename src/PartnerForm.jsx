// src/components/PartnerForm.jsx

import React, { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { Link } from "react-router-dom";

const PartnerForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    message: "",
  });

  const [popup, setPopup] = useState({ show: false, type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showPopup = (type, message) => {
    setPopup({ show: true, type, message });
    setTimeout(() => {
      setPopup({ show: false, type: "", message: "" });
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("https://lumenza.onrender.com/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "Partner", // formType changed to "Partner"
          ...formData,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showPopup("success", "Submitted Successfully!");
        setFormData({ name: "", email: "", contact: "", message: "" });
      } else {
        showPopup("error", data.message || "Submission failed");
      }
    } catch (err) {
      console.error("Partner form error:", err);
      showPopup("error", "Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 bg-gray-100 min-h-screen">
      {/* Popup Notification */}
      {popup.show && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center gap-4 w-[90%] max-w-md text-center animate-fadeIn">
            {popup.type === "success" ? (
              <CheckCircle className="w-12 h-12 text-green-600" />
            ) : (
              <XCircle className="w-12 h-12 text-red-600" />
            )}
            <p className="text-lg font-semibold text-gray-800">{popup.message}</p>
          </div>
        </div>
      )}

      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-800 mb-4">
          Partner With Us
        </h2>
        <p className="text-lg text-gray-600 mb-10">
          Join our network of successful partners. Fill out the form below to
          start your journey with LUMENZA.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white text-gray-800 shadow-xl rounded-2xl p-8 lg:p-10 w-full space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <input type="text" name="name" placeholder="Your Full Name" value={formData.name} onChange={handleChange} required className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-red-500" />
            <input type="email" name="email" placeholder="Your Email Address" value={formData.email} onChange={handleChange} required className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-red-500" />
          </div>
          <input type="tel" name="contact" placeholder="Your Contact Number" value={formData.contact} onChange={handleChange} required className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-red-500" />
          <textarea name="message" placeholder="Tell us about your interest..." value={formData.message} onChange={handleChange} required className="w-full p-4 border rounded-xl h-32 resize-none focus:ring-2 focus:ring-red-500" />
          
          <button
            type="submit" disabled={loading}
            className={`group relative flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-800 text-white py-4 px-6 rounded-xl text-lg font-semibold shadow-md transition-all w-full overflow-hidden
              ${loading ? "opacity-70 cursor-not-allowed" : "hover:shadow-lg hover:shadow-red-500/50 hover:scale-105"}`}
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-3">{loading ? 'Submitting...' : 'Submit Application'}</span>
            <svg className={`w-5 h-5 absolute right-6 transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 ${loading ? 'hidden' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </button>
        </form>
      </div>
    </section>
  );
};

export default PartnerForm;

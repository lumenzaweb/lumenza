import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";

const PartnerForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    firmName: "",
    contact: "",
    email: "",
    address: "",
    city: "",
    state: "",
    category: "",
    investment: "",
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
          formType: "Partner",
          ...formData,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showPopup("success", "Application Submitted!");
        setFormData({ name: "", firmName: "", contact: "", email: "", address: "", city: "", state: "", category: "", investment: "", message: "" });
        setStep(1);
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

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <section className="py-20 px-4 sm:px-6 bg-gray-100 min-h-screen">
      {/* Popup Notification */}
      {popup.show && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center gap-4 w-[90%] max-w-md text-center animate-fadeIn">
            {popup.type === "success" ? <CheckCircle className="w-12 h-12 text-green-600" /> : <XCircle className="w-12 h-12 text-red-600" />}
            <p className="text-lg font-semibold text-gray-800">{popup.message}</p>
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-800 mb-4">Partner With Us</h2>
        <p className="text-lg text-gray-600 mb-10">Join our network of successful partners. Complete the steps below to start your journey with LUMENZA.</p>
        
        <div className="bg-white shadow-2xl rounded-2xl p-8 lg:p-10 w-full">
          {/* Progress Indicator */}
          <div className="mb-8">
            <p className="text-sm font-semibold text-gray-500">Step {step} of 3</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <motion.div
                className="bg-red-600 h-2 rounded-full"
                animate={{ width: `${(step / 3) * 100}%` }}
                transition={{ ease: "easeInOut", duration: 0.5 }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="text-left">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="step1" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-800">Personal & Firm Details</h3>
                  <input type="text" name="name" placeholder="Your Full Name" value={formData.name} onChange={handleChange} required className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-red-500"/>
                  <input type="text" name="firmName" placeholder="Firm Name" value={formData.firmName} onChange={handleChange} required className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-red-500"/>
                  <input type="tel" name="contact" placeholder="Your Contact Number" value={formData.contact} onChange={handleChange} required className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-red-500"/>
                  <input type="email" name="email" placeholder="Your Email Address" value={formData.email} onChange={handleChange} required className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-red-500"/>
                </motion.div>
              )}
              {step === 2 && (
                <motion.div key="step2" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-800">Location & Business Details</h3>
                  <input type="text" name="address" placeholder="Full Address" value={formData.address} onChange={handleChange} required className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-red-500"/>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-red-500"/>
                    <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} required className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-red-500"/>
                  </div>
                  <select name="category" value={formData.category} onChange={handleChange} required className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-red-500 bg-white">
                    <option value="" disabled>Select Category...</option>
                    <option value="Dealer">Dealer</option>
                    <option value="Distributor">Distributor</option>
                    <option value="Display Gallery">Display Gallery</option>
                  </select>
                  <select name="investment" value={formData.investment} onChange={handleChange} required className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-red-500 bg-white">
                    <option value="" disabled>Average Investment...</option>
                    <option value="Upto 3 Lakh">Upto 3 Lakh</option>
                    <option value="Upto 10 Lakh">Upto 10 Lakh</option>
                    <option value="Upto 20 Lakh">Upto 20 Lakh</option>
                    <option value="Upto 50 Lakh">Upto 50 Lakh</option>
                  </select>
                </motion.div>
              )}
              {step === 3 && (
                <motion.div key="step3" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-800">Message</h3>
                  <textarea name="message" placeholder="Tell us about your interest..." value={formData.message} onChange={handleChange} required className="w-full p-4 border rounded-xl h-40 resize-none focus:ring-2 focus:ring-red-500" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="mt-8 flex justify-between items-center">
              {step > 1 ? (
                <button type="button" onClick={prevStep} className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow-sm hover:bg-gray-300 transition">Previous</button>
              ) : ( <div/> /* Placeholder to keep "Next" button on the right */ )}

              {step < 3 ? (
                <button type="button" onClick={nextStep} className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition">Next</button>
              ) : (
                <button
                  type="submit" disabled={loading}
                  className={`px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg shadow-md transition-all ${loading ? "opacity-70 cursor-not-allowed" : "hover:shadow-lg hover:scale-105"}`}
                >
                  {loading ? 'Submitting...' : 'Submit Application'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default PartnerForm;

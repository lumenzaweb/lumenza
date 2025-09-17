import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";
import Select from "react-select";
import { states, cities } from "./data/locations";
import AnimatedGeometricBackground from "./components/AnimatedGeometricBackground";

const PartnerForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    firmName: "",
    contact: "",
    email: "",
    address: "",
    city: null,
    state: null,
    category: "",
    investment: "",
    message: "",
  });

  const [cityOptions, setCityOptions] = useState([]);
  const [popup, setPopup] = useState({ show: false, type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleStateChange = (selectedOption) => {
    setFormData({ ...formData, state: selectedOption, city: null });
    setCityOptions(cities[selectedOption.value] || []);
  };
  
  const handleCityChange = (selectedOption) => {
    setFormData({ ...formData, city: selectedOption });
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

    const submissionData = {
        ...formData,
        state: formData.state ? formData.state.label : "",
        city: formData.city ? formData.city.label : "",
    };

    try {
      const res = await fetch("https://lumenza.onrender.com/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "Partner",
          ...submissionData,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showPopup("success", "Application Submitted!");
        setFormData({ name: "", firmName: "", contact: "", email: "", address: "", city: null, state: null, category: "", investment: "", message: "" });
        setCityOptions([]);
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

  const customSelectStyles = {
    control: (provided) => ({ ...provided, backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.3)', borderRadius: '0.75rem', padding: '0.5rem', color: 'white', boxShadow: 'none', '&:hover': { borderColor: 'rgba(255, 255, 255, 0.5)' } }),
    singleValue: (provided) => ({ ...provided, color: 'white' }),
    placeholder: (provided) => ({ ...provided, color: '#9CA3AF' }),
    menu: (provided) => ({ ...provided, backgroundColor: '#1F2937', borderRadius: '0.75rem' }),
    option: (provided, state) => ({ ...provided, backgroundColor: state.isFocused ? '#EF4444' : 'transparent', color: 'white', '&:active': { backgroundColor: '#DC2626' } }),
    input: (provided) => ({...provided, color: 'white'}),
  };

  return (
    <section className="py-20 px-4 sm:px-6 bg-gray-900 min-h-screen relative overflow-hidden">
      <AnimatedGeometricBackground />
      {popup.show && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center gap-4 w-[90%] max-w-md text-center animate-fadeIn">
            {popup.type === "success" ? <CheckCircle className="w-12 h-12 text-green-600" /> : <XCircle className="w-12 h-12 text-red-600" />}
            <p className="text-lg font-semibold text-gray-800">{popup.message}</p>
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto text-center relative z-10">
        <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">Partner With Us</h2>
        <p className="text-lg text-gray-300 mb-10">Join our network of successful partners. Complete the steps below to start your journey with LUMENZA.</p>
        
        <div className="bg-black/20 backdrop-blur-lg border border-white/20 text-white shadow-2xl rounded-2xl p-8 lg:p-10 w-full">
          <div className="mb-8">
            <p className="text-sm font-semibold text-gray-300">Step {step} of 3</p>
            <div className="w-full bg-white/10 rounded-full h-2 mt-2">
              <motion.div className="bg-red-600 h-2 rounded-full" animate={{ width: `${(step / 3) * 100}%` }} transition={{ ease: "easeInOut", duration: 0.5 }} />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="text-left">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="step1" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                  <h3 className="text-2xl font-bold text-white">Personal & Firm Details</h3>
                  <input type="text" name="name" placeholder="Your Full Name" value={formData.name} onChange={handleChange} required className="w-full p-4 bg-white/5 border border-white/30 rounded-xl placeholder-gray-400 focus:ring-2 focus:ring-red-500"/>
                  <input type="text" name="firmName" placeholder="Firm Name" value={formData.firmName} onChange={handleChange} required className="w-full p-4 bg-white/5 border border-white/30 rounded-xl placeholder-gray-400 focus:ring-2 focus:ring-red-500"/>
                  <input type="tel" name="contact" placeholder="Your Contact Number" value={formData.contact} onChange={handleChange} required className="w-full p-4 bg-white/5 border border-white/30 rounded-xl placeholder-gray-400 focus:ring-2 focus:ring-red-500"/>
                  <input type="email" name="email" placeholder="Your Email Address" value={formData.email} onChange={handleChange} required className="w-full p-4 bg-white/5 border border-white/30 rounded-xl placeholder-gray-400 focus:ring-2 focus:ring-red-500"/>
                </motion.div>
              )}
              {step === 2 && (
                <motion.div key="step2" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                  <h3 className="text-2xl font-bold text-white">Location & Business Details</h3>
                  <input type="text" name="address" placeholder="Full Address" value={formData.address} onChange={handleChange} required className="w-full p-4 bg-white/5 border border-white/30 rounded-xl placeholder-gray-400 focus:ring-2 focus:ring-red-500"/>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Select options={states} value={formData.state} onChange={handleStateChange} placeholder="Select State..." styles={customSelectStyles} />
                    <Select options={cityOptions} value={formData.city} onChange={handleCityChange} placeholder="Select City..." styles={customSelectStyles} isDisabled={!formData.state} />
                  </div>
                  <Select name="category" value={states.find(s => s.value === formData.category)} onChange={option => handleChange({ target: { name: 'category', value: option.value } })} placeholder="Select Category..." styles={customSelectStyles} options={[{value: "Dealer", label: "Dealer"}, {value: "Distributor", label: "Distributor"}, {value: "Display Gallery", label: "Display Gallery"}]} />
                  <Select name="investment" value={states.find(s => s.value === formData.investment)} onChange={option => handleChange({ target: { name: 'investment', value: option.value } })} placeholder="Average Investment..." styles={customSelectStyles} options={[{value: "Upto 3 Lakh", label: "Upto 3 Lakh"}, {value: "Upto 10 Lakh", label: "Upto 10 Lakh"}, {value: "Upto 20 Lakh", label: "Upto 20 Lakh"}, {value: "Upto 50 Lakh", label: "Upto 50 Lakh"}]} />
                </motion.div>
              )}
              {step === 3 && (
                <motion.div key="step3" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                  <h3 className="text-2xl font-bold text-white">Message</h3>
                  <textarea name="message" placeholder="Tell us about your interest..." value={formData.message} onChange={handleChange} required className="w-full p-4 bg-white/5 border border-white/30 rounded-xl h-40 resize-none placeholder-gray-400 focus:ring-2 focus:ring-red-500" />
                </motion.div>
              )}
            </AnimatePresence>
            <div className="mt-8 flex justify-between items-center">
              {step > 1 ? (
                <button type="button" onClick={prevStep} className="px-6 py-3 bg-white/10 text-white font-semibold rounded-lg shadow-sm hover:bg-white/20 transition">Previous</button>
              ) : ( <div/> )}
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

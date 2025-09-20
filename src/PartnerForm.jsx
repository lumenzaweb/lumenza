import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";
import Select from "react-select";
import { Country, State, City } from "country-state-city";
import AnimatedBubbleBackground from "./components/AnimatedBubbleBackground";
import SEO from "./components/SEO";

// Options for the select dropdowns
const categoryOptions = [
  { value: "Dealer", label: "Dealer" },
  { value: "Distributor", label: "Distributor" },
  { value: "Display Gallery", label: "Display Gallery" },
];

const investmentOptions = [
  { value: "Upto 3 Lakh", label: "Upto 3 Lakh" },
  { value: "Upto 10 Lakh", label: "Upto 10 Lakh" },
  { value: "Upto 20 Lakh", label: "Upto 20 Lakh" },
  { value: "Upto 50 Lakh", label: "Upto 50 Lakh" },
];

const PartnerForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "", firmName: "", contact: "", email: "", address: "",
    country: null, state: null, city: null,
    category: null, investment: null, message: "",
  });
  const [errors, setErrors] = useState({});
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [popup, setPopup] = useState({ show: false, type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const countryOptions = Country.getAllCountries().map(country => ({
    value: country.isoCode, label: country.name
  }));

  useEffect(() => {
    setStateOptions(formData.country ? State.getStatesOfCountry(formData.country.value).map(state => ({
        value: state.isoCode, label: state.name
    })) : []);
  }, [formData.country]);

  useEffect(() => {
    setCityOptions(formData.state ? City.getCitiesOfState(formData.country.value, formData.state.value).map(city => ({
        value: city.name, label: city.name
    })) : []);
  }, [formData.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleSelectChange = (name, selectedOption) => {
    setFormData(prev => ({ ...prev, [name]: selectedOption }));
    if (name === 'country') setFormData(prev => ({ ...prev, state: null, city: null }));
    if (name === 'state') setFormData(prev => ({ ...prev, city: null }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const validateStep = (stepToValidate) => {
    let newErrors = {};
    if (stepToValidate === 1) {
      if (!formData.name) newErrors.name = "Name is required.";
      if (!formData.firmName) newErrors.firmName = "Firm name is required.";
      if (!formData.contact) newErrors.contact = "Contact number is required.";
      if (!formData.email) newErrors.email = "Email is required.";
    }
    if (stepToValidate === 2) {
      if (!formData.address) newErrors.address = "Address is required.";
      if (!formData.country) newErrors.country = "Country is required.";
      if (!formData.state) newErrors.state = "State is required.";
      if (!formData.city) newErrors.city = "City is required.";
      if (!formData.category) newErrors.category = "Category is required.";
      if (!formData.investment) newErrors.investment = "Investment level is required.";
    }
    if (stepToValidate === 3) {
        if (!formData.message) newErrors.message = "Message is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // --- BUG FIX: Only allow submission on the final step ---
    if (step !== 3 || !validateStep(3)) return;
    
    setLoading(true);
    const submissionData = {
      ...formData,
      country: formData.country?.label, state: formData.state?.label,
      city: formData.city?.label, category: formData.category?.label,
      investment: formData.investment?.label,
    };
    try {
      const res = await fetch("https://lumenza.onrender.com/api/forms", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType: "Partner", ...submissionData }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showPopup("success", "Application Submitted!");
        setFormData({ name: "", firmName: "", contact: "", email: "", address: "", city: null, state: null, country: null, category: null, investment: null, message: "" });
        setCityOptions([]); setStateOptions([]); setStep(1);
      } else {
        showPopup("error", data.message || "Submission failed");
      }
    } catch (err) {
      showPopup("error", "Failed to send message.");
    } finally {
      setLoading(false);
    }
  };
  
  const showPopup = (type, message) => {
    setPopup({ show: true, type, message });
    setTimeout(() => { setPopup({ show: false, type: "", message: "" }); }, 3000);
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };
  const prevStep = () => setStep(step - 1);

  const stepVariants = { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -50 } };
  
  const customSelectStyles = {
    control: (provided, state) => ({ ...provided, backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: errors[state.selectProps.name] ? '#EF4444' : 'rgba(255, 255, 255, 0.3)', borderRadius: '0.75rem', padding: '0.5rem', boxShadow: 'none', '&:hover': { borderColor: 'rgba(255, 255, 255, 0.5)' } }),
    singleValue: (provided) => ({ ...provided, color: 'white' }),
    placeholder: (provided) => ({ ...provided, color: '#9CA3AF' }),
    menu: (provided) => ({ ...provided, backgroundColor: '#1F2937', borderRadius: '0.75rem' }),
    option: (provided, state) => ({ ...provided, backgroundColor: state.isFocused ? '#EF4444' : 'transparent', color: 'white', '&:active': { backgroundColor: '#DC2626' } }),
    input: (provided) => ({...provided, color: 'white'}),
  };

  return (
    <section className="pt-28 sm:pt-32 pb-20 px-4 sm:px-6 bg-gray-900 min-h-screen relative overflow-hidden">
      
      <SEO 
      title="Partner With Us"
      description="Become a LUMENZA partner. Join our network of successful dealers, distributors, and galleries to grow your business."
    />
    
      <AnimatedBubbleBackground />
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
        <p className="text-lg text-gray-300 mb-10">Join our network. Complete the steps below to start your journey with LUMENZA.</p>
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
                <motion.div key="step1" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-4">
                  <h3 className="text-2xl font-bold text-white">Personal & Firm Details</h3>
                  <div>
                    <input type="text" name="name" placeholder="Your Full Name" value={formData.name} onChange={handleChange} className={`w-full p-4 bg-white/5 border rounded-xl placeholder-gray-400 focus:ring-2 focus:ring-red-500 outline-none transition-all duration-300 ${errors.name ? 'border-red-500' : 'border-white/30'}`}/>
                    {errors.name && <p className="text-red-400 text-xs mt-1 px-1">{errors.name}</p>}
                  </div>
                  <div>
                    <input type="text" name="firmName" placeholder="Firm Name" value={formData.firmName} onChange={handleChange} className={`w-full p-4 bg-white/5 border rounded-xl placeholder-gray-400 focus:ring-2 focus:ring-red-500 ${errors.firmName ? 'border-red-500' : 'border-white/30'}`}/>
                    {errors.firmName && <p className="text-red-400 text-xs mt-1 px-1">{errors.firmName}</p>}
                  </div>
                  <div>
                    <input type="tel" name="contact" placeholder="Your Contact Number" value={formData.contact} onChange={handleChange} className={`w-full p-4 bg-white/5 border rounded-xl placeholder-gray-400 focus:ring-2 focus:ring-red-500 ${errors.contact ? 'border-red-500' : 'border-white/30'}`}/>
                    {errors.contact && <p className="text-red-400 text-xs mt-1 px-1">{errors.contact}</p>}
                  </div>
                  <div>
                    <input type="email" name="email" placeholder="Your Email Address" value={formData.email} onChange={handleChange} className={`w-full p-4 bg-white/5 border rounded-xl placeholder-gray-400 focus:ring-2 focus:ring-red-500 ${errors.email ? 'border-red-500' : 'border-white/30'}`}/>
                    {errors.email && <p className="text-red-400 text-xs mt-1 px-1">{errors.email}</p>}
                  </div>
                </motion.div>
              )}
              {step === 2 && (
                <motion.div key="step2" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-4">
                   <h3 className="text-2xl font-bold text-white">Location & Business Details</h3>
                   <div>
                     <input type="text" name="address" placeholder="Full Address" value={formData.address} onChange={handleChange} className={`w-full p-4 bg-white/5 border rounded-xl placeholder-gray-400 focus:ring-2 focus:ring-red-500 ${errors.address ? 'border-red-500' : 'border-white/30'}`}/>
                     {errors.address && <p className="text-red-400 text-xs mt-1 px-1">{errors.address}</p>}
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Select options={countryOptions} value={formData.country} onChange={(option) => handleSelectChange('country', option)} placeholder="Select Country..." styles={customSelectStyles} name="country"/>
                      {errors.country && <p className="text-red-400 text-xs mt-1 px-1">{errors.country}</p>}
                    </div>
                    <div>
                      <Select options={stateOptions} value={formData.state} onChange={(option) => handleSelectChange('state', option)} placeholder="Select State..." styles={customSelectStyles} isDisabled={!formData.country} name="state"/>
                      {errors.state && <p className="text-red-400 text-xs mt-1 px-1">{errors.state}</p>}
                    </div>
                   </div>
                   <div>
                     <Select options={cityOptions} value={formData.city} onChange={(option) => handleSelectChange('city', option)} placeholder="Select City..." styles={customSelectStyles} isDisabled={!formData.state} name="city"/>
                     {errors.city && <p className="text-red-400 text-xs mt-1 px-1">{errors.city}</p>}
                   </div>
                   <div>
                     <Select value={formData.category} onChange={(option) => handleSelectChange('category', option)} placeholder="Select Category..." styles={customSelectStyles} options={categoryOptions} name="category" />
                     {errors.category && <p className="text-red-400 text-xs mt-1 px-1">{errors.category}</p>}
                   </div>
                   <div>
                     <Select value={formData.investment} onChange={(option) => handleSelectChange('investment', option)} placeholder="Average Investment..." styles={customSelectStyles} options={investmentOptions} name="investment" />
                     {errors.investment && <p className="text-red-400 text-xs mt-1 px-1">{errors.investment}</p>}
                   </div>
                </motion.div>
              )}
              {step === 3 && (
                <motion.div key="step3" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                  <h3 className="text-2xl font-bold text-white">Message</h3>
                  <div>
                    <textarea name="message" placeholder="Tell us about your interest or any questions..." value={formData.message} onChange={handleChange} className="w-full p-4 bg-white/5 border border-white/30 rounded-xl h-40 resize-none placeholder-gray-400 focus:ring-2 focus:ring-red-500" />
                    {errors.message && <p className="text-red-400 text-xs mt-1 px-1">{errors.message}</p>}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-8 flex justify-between items-center">
              {step > 1 ? (
                <button type="button" onClick={prevStep} className="px-6 py-3 bg-white/10 text-white font-semibold rounded-lg shadow-sm hover:bg-white/20 transition">Previous</button>
              ) : ( <div/> )}

              {step < 3 && (
                <button type="button" onClick={nextStep} className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition">Next</button>
              )}

              {step === 3 && (
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full text-center px-6 py-3 bg-red-600 text-white font-semibold rounded-xl shadow-md hover:bg-red-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                      <div className="flex items-center justify-center">
                          <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                          Submitting...
                      </div>
                  ) : (
                    'Submit Application'
                  )}
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

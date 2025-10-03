import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";

// --- Mock Components for Single File Mandate ---
// Mocks for SEO and AnimatedBubbleBackground
const SEO = ({ title, description }) => <title>{title}</title>;
const AnimatedBubbleBackground = () => (
    <div className="absolute inset-0 overflow-hidden opacity-30">
        {/* Simple visual background placeholder */}
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-red-600 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" style={{ animationDelay: '-2s' }}></div>
        <div className="absolute top-1/2 right-0 w-48 h-48 bg-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" style={{ animationDelay: '-4s' }}></div>
        <div className="absolute bottom-0 left-1/2 w-48 h-48 bg-indigo-600 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
    </div>
);
// --- End Mock Components ---

// --- MOCK GEOGRAPHICAL DATA (Replaces country-state-city) ---
const locationData = {
    IN: {
        label: "India",
        states: {
            MH: { label: "Maharashtra", cities: ["Mumbai", "Pune", "Nagpur"] },
            DL: { label: "Delhi", cities: ["New Delhi", "Gurgaon", "Noida"] },
            KA: { label: "Karnataka", cities: ["Bengaluru", "Mysuru"] },
            TN: { label: "Tamil Nadu", cities: ["Chennai", "Coimbatore"] },
        }
    },
    US: {
        label: "United States",
        states: {
            NY: { label: "New York", cities: ["New York City", "Buffalo"] },
            CA: { label: "California", cities: ["Los Angeles", "San Francisco"] },
        }
    }
};

const countryOptions = [
    { value: "IN", label: "India" },
    { value: "US", label: "United States" },
    { value: "OTH", label: "Other" }
];
// --- END MOCK DATA ---

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
    // Changed state to store raw string values from native select
    country: "", state: "", city: "",
    category: "", investment: "", message: "",
  });
  const [errors, setErrors] = useState({});
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [popup, setPopup] = useState({ show: false, type: "", message: "" });
  const [loading, setLoading] = useState(false);

  // Constants for Validation
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Allows 7 to 15 digits, spaces, hyphens, parentheses, and an optional '+' prefix.
  const CONTACT_REGEX = /^\+?[\d\s\-\(\)]{7,15}$/;

  // Utility function for input styling
  const getInputClass = (name) => `w-full p-4 text-white bg-white/5 border rounded-xl placeholder-gray-400 focus:ring-2 focus:ring-red-500 outline-none transition-all duration-300 ${errors[name] ? 'border-red-500' : 'border-white/30'}`;

  // --- Custom Select Component (Replaces react-select) ---
  const CustomSelect = ({ name, placeholder, value, options, onChange, error, disabled = false }) => (
    <div className="relative">
        <select 
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            // Uses the same styling as other inputs
            className={`${getInputClass(name)} appearance-none disabled:opacity-50 disabled:cursor-not-allowed`}
        >
            <option value="" disabled hidden>{placeholder}</option>
            {options.map(option => (
                <option key={option.value} value={option.value} className="bg-gray-800 text-white p-2">
                    {option.label}
                </option>
            ))}
        </select>
        {/* Custom arrow for appearance-none fix and dark theme */}
        <svg className="w-5 h-5 absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        {error && <p className="text-red-400 text-xs mt-1 px-1">{error}</p>}
    </div>
  );
  // --- End Custom Select Component ---


  // Effect to load states when country changes
  useEffect(() => {
    const countryCode = formData.country;
    if (countryCode && locationData[countryCode]) {
        const states = Object.entries(locationData[countryCode].states).map(([code, data]) => ({
            value: code,
            label: data.label
        }));
        setStateOptions(states);
    } else {
        setStateOptions([]);
    }
    // If country changes, reset state and city
    setFormData(prev => {
        if (prev.country !== countryCode) {
            return { ...prev, state: "", city: "" };
        }
        return prev;
    });
  }, [formData.country]);

  // Effect to load cities when state changes
  useEffect(() => {
    const countryCode = formData.country;
    const stateCode = formData.state;

    if (countryCode && stateCode && locationData[countryCode] && locationData[countryCode].states[stateCode]) {
        // Cities are stored as simple string arrays, convert them to {value, label} format
        const cities = locationData[countryCode].states[stateCode].cities.map(city => ({
            value: city,
            label: city
        }));
        setCityOptions(cities);
    } else {
        setCityOptions([]);
    }
    // If state changes, reset city
    setFormData(prev => {
        if (prev.state !== stateCode) {
            return { ...prev, city: "" };
        }
        return prev;
    });
  }, [formData.country, formData.state]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const getLabelFromValue = (value, options) => {
      const option = options.find(opt => opt.value === value);
      return option ? option.label : value;
  };

  const validateStep = (stepToValidate) => {
    let newErrors = {};
    
    if (stepToValidate === 1) {
      if (!formData.name) newErrors.name = "Your Name is required.";
      if (!formData.firmName) newErrors.firmName = "Firm name is required.";
      
      // --- Contact Number Validation ---
      if (!formData.contact) {
        newErrors.contact = "Contact number is required.";
      } else if (!CONTACT_REGEX.test(formData.contact)) {
        newErrors.contact = "Please enter a valid phone number (7-15 digits, including '+' if needed).";
      }

      // --- Email Validation ---
      if (!formData.email) {
        newErrors.email = "Email is required.";
      } else if (!EMAIL_REGEX.test(formData.email)) {
        newErrors.email = "Please enter a valid email address (e.g., name@domain.com).";
      }
    }

    if (stepToValidate === 2) {
      if (!formData.address) newErrors.address = "Address is required.";
      if (!formData.country) newErrors.country = "Country is required.";
      if (!formData.state) newErrors.state = "State/Province is required.";
      if (!formData.city) newErrors.city = "City is required.";
      if (!formData.category) newErrors.category = "Category is required.";
      if (!formData.investment) newErrors.investment = "Investment level is required.";
    }

    if (stepToValidate === 3) {
        if (!formData.message || formData.message.trim().length < 10) newErrors.message = "Message is required and must be at least 10 characters long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step !== 3 || !validateStep(3)) return;
    
    setLoading(true);

    // Helper to get resolved location label
    const getLocationLabel = (type, code) => {
        if (type === 'country') return locationData[code]?.label || code;
        if (type === 'state') return locationData[formData.country]?.states[code]?.label || code;
        return code;
    }

    // Prepare data for submission, converting all codes/values back to readable labels
    const submissionData = {
      name: formData.name,
      firmName: formData.firmName,
      contact: formData.contact,
      email: formData.email,
      address: formData.address,
      
      country: getLocationLabel('country', formData.country), 
      state: getLocationLabel('state', formData.state),
      city: formData.city, // City is already stored as the label/value string
      
      category: getLabelFromValue(formData.category, categoryOptions),
      investment: getLabelFromValue(formData.investment, investmentOptions),
      
      message: formData.message,
    };
    
    try {
      const res = await fetch("https://lumenza.onrender.com/api/forms", {
        method: "POST", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType: "Partner", ...submissionData }),
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        showPopup("success", "Application Submitted Successfully! We will contact you shortly.");
        // Reset form data and steps on success
        setFormData({ name: "", firmName: "", contact: "", email: "", address: "", city: "", state: "", country: "", category: "", investment: "", message: "" });
        setCityOptions([]); setStateOptions([]); setStep(1);
      } else {
        showPopup("error", data.message || "Submission failed. Please try again.");
      }
    } catch (err) {
      console.error("Submission Error:", err);
      showPopup("error", "Network or server error. Failed to send message.");
    } finally {
      setLoading(false);
    }
  };
  
  const showPopup = (type, message) => {
    setPopup({ show: true, type, message });
    setTimeout(() => { setPopup({ show: false, type: "", message: "" }); }, 4000);
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };
  const prevStep = () => setStep(step - 1);

  const stepVariants = { 
    hidden: { opacity: 0, x: 50 }, 
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }, 
    exit: { opacity: 0, x: -50, transition: { duration: 0.5 } } 
  };
  

  return (
    <section className="pt-28 sm:pt-32 pb-20 px-4 sm:px-6 bg-gray-900 min-h-screen relative overflow-hidden font-inter">
      
      <SEO 
        title="Partner With Us | LUMENZA"
        description="Become a LUMENZA partner. Join our network of successful dealers, distributors, and galleries to grow your business."
      />
      
      <AnimatedBubbleBackground />
      
      {/* Success/Error Popup Notification */}
      <AnimatePresence>
        {popup.show && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -50 }} 
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-4 w-[90%] max-w-md text-center">
              {popup.type === "success" 
                ? <CheckCircle className="w-12 h-12 text-green-600 animate-pulse" /> 
                : <XCircle className="w-12 h-12 text-red-600" />
              }
              <p className={`text-xl font-bold ${popup.type === "success" ? 'text-green-700' : 'text-red-700'}`}>{popup.type === "success" ? 'Success!' : 'Error!'}</p>
              <p className="text-lg font-semibold text-gray-800">{popup.message}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-2xl mx-auto text-center relative z-10">
        <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">Partner With Us</h2>
        <p className="text-lg text-gray-300 mb-10">Join our network. Complete the 3 steps below to start your journey with LUMENZA.</p>
        
        <div className="bg-black/40 backdrop-blur-xl border border-white/20 text-white shadow-2xl rounded-3xl p-8 lg:p-10 w-full">
          
          {/* Progress Bar */}
          <div className="mb-8">
            <p className="text-sm font-bold text-red-400 mb-2">APPLICATION PROGRESS: Step {step} of 3</p>
            <div className="w-full bg-white/10 rounded-full h-2.5">
              <motion.div 
                className="bg-red-600 h-2.5 rounded-full shadow-lg shadow-red-500/50" 
                animate={{ width: `${(step / 3) * 100}%` }} 
                transition={{ ease: "easeInOut", duration: 0.5 }} 
              />
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="text-left">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="step1" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                  <h3 className="text-2xl font-bold text-red-400">Step 1: Personal & Firm Details</h3>
                  
                  {/* Name Input */}
                  <div>
                    <input type="text" name="name" placeholder="Your Full Name" value={formData.name} onChange={handleChange} className={getInputClass('name')}/>
                    {errors.name && <p className="text-red-400 text-xs mt-1 px-1">{errors.name}</p>}
                  </div>
                  
                  {/* Firm Name Input */}
                  <div>
                    <input type="text" name="firmName" placeholder="Firm Name" value={formData.firmName} onChange={handleChange} className={getInputClass('firmName')}/>
                    {errors.firmName && <p className="text-red-400 text-xs mt-1 px-1">{errors.firmName}</p>}
                  </div>
                  
                  {/* Contact Input (Validated) */}
                  <div>
                    <input type="tel" name="contact" placeholder="Your Contact Number (+91 XXXXXXXXXX)" value={formData.contact} onChange={handleChange} className={getInputClass('contact')}/>
                    {errors.contact && <p className="text-red-400 text-xs mt-1 px-1">{errors.contact}</p>}
                  </div>
                  
                  {/* Email Input (Validated) */}
                  <div>
                    <input type="email" name="email" placeholder="Your Email Address" value={formData.email} onChange={handleChange} className={getInputClass('email')}/>
                    {errors.email && <p className="text-red-400 text-xs mt-1 px-1">{errors.email}</p>}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                   <h3 className="text-2xl font-bold text-red-400">Step 2: Location & Business Details</h3>
                   
                   {/* Address Input */}
                   <div>
                     <input type="text" name="address" placeholder="Full Business Address" value={formData.address} onChange={handleChange} className={getInputClass('address')}/>
                     {errors.address && <p className="text-red-400 text-xs mt-1 px-1">{errors.address}</p>}
                   </div>
                   
                   {/* Country/State Select - Now using CustomSelect */}
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <CustomSelect options={countryOptions} value={formData.country} onChange={handleChange} placeholder="Select Country..." name="country" error={errors.country}/>
                    </div>
                    <div>
                      <CustomSelect options={stateOptions} value={formData.state} onChange={handleChange} placeholder="Select State..." name="state" error={errors.state} disabled={!formData.country || stateOptions.length === 0}/>
                    </div>
                   </div>
                   
                   {/* City Select - Now using CustomSelect */}
                   <div>
                      <CustomSelect options={cityOptions} value={formData.city} onChange={handleChange} placeholder="Select City..." name="city" error={errors.city} disabled={!formData.state || cityOptions.length === 0}/>
                   </div>
                   
                   {/* Category Select - Now using CustomSelect */}
                   <div>
                      <CustomSelect value={formData.category} onChange={handleChange} placeholder="Select Partnership Category..." options={categoryOptions} name="category" error={errors.category} />
                   </div>
                   
                   {/* Investment Select - Now using CustomSelect */}
                   <div>
                      <CustomSelect value={formData.investment} onChange={handleChange} placeholder="Average Investment Level..." options={investmentOptions} name="investment" error={errors.investment} />
                   </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                  <h3 className="text-2xl font-bold text-red-400">Step 3: Message of Interest</h3>
                  
                  {/* Message Textarea */}
                  <div>
                    <textarea 
                      name="message" 
                      placeholder="Tell us about your interest, experience, or any questions (min 10 characters)..." 
                      value={formData.message} 
                      onChange={handleChange} 
                      className={`${getInputClass('message')} h-40 resize-none`} 
                    />
                    {errors.message && <p className="text-red-400 text-xs mt-1 px-1">{errors.message}</p>}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="mt-10 flex justify-between items-center">
              {step > 1 ? (
                <button type="button" onClick={prevStep} className="px-6 py-3 text-white font-semibold rounded-xl bg-white/10 hover:bg-white/20 transition duration-300">
                  ← Previous
                </button>
              ) : ( <div/> )} {/* Spacer div to maintain layout */}

              {step < 3 && (
                <button type="button" onClick={nextStep} className="px-8 py-3 bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-500/50 hover:bg-red-700 transition duration-300">
                  Next Step →
                </button>
              )}

              {step === 3 && (
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full text-center px-6 py-4 bg-red-600 text-white font-bold text-lg tracking-wider rounded-xl shadow-lg shadow-red-500/50 hover:bg-red-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></span>
                        Submitting Application...
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
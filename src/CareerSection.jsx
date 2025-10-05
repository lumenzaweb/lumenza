import React, { useState, useRef, useEffect } from "react";
import { CheckCircle, XCircle, Briefcase, Megaphone, Users, UploadCloud, ChevronDown, Zap, TrendingUp, ArrowRight, Contact, Loader2 } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha"; 
import { motion, AnimatePresence } from "framer-motion";
import { useDropzone } from "react-dropzone";
// Assuming these components are available in your environment
import LightBackground from "./components/LightBackground";
import SEO from "./components/SEO"; // <-- KEEPING YOUR EXTERNAL IMPORT

// --- VALIDATION HELPER FUNCTIONS ---
const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const isValidContact = (contact) => {
    return /^\+?[\d\s\-]{7,15}$/.test(contact);
};
// --- END VALIDATION HELPER FUNCTIONS ---


// --- COMPONENT DEFINITIONS (RENAMED to avoid conflict with imports) ---

// Minimal SEO Component (Renamed to LocalSEO)
const LocalSEO = ({ title, description }) => {
  useEffect(() => {
    document.title = title || "Careers";
    document.querySelector('meta[name="description"]')?.setAttribute('content', description || "Join our team.");
  }, [title, description]);
  return null;
};

// Minimal Aesthetic Background Placeholder (Renamed to LocalLightBackground)
const LocalLightBackground = () => (
    <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse"/>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-600/15 rounded-full blur-3xl animate-pulse delay-500"/>
    </div>
);
// --- END COMPONENT DEFINITIONS ---


// Helper function to scroll to the form
const scrollToForm = () => {
  document.getElementById("career-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
};

// Data (Unchanged)
const whyJoinUs = [
    { icon: <Zap className="w-8 h-8 text-red-600" />, title: "Innovate", description: "Work on cutting-edge products that redefine the industry." },
    { icon: <TrendingUp className="w-8 h-8 text-red-600" />, title: "Grow", description: "We invest in your professional development and career path." },
    { icon: <Users className="w-8 h-8 text-red-600" />, title: "Collaborate", description: "Join a supportive team where your ideas are valued." }
];

const departments = [
  { icon: <Briefcase className="w-8 h-8 text-gray-700" />, title: "Sales & Business Development", responsibilities: ["Build relationships with dealers, architects, and retailers", "Product presentations and market visits", "Area-wise target setting and achievement"] },
  { icon: <Megaphone className="w-8 h-8 text-gray-700" />, title: "Marketing & Brand", responsibilities: ["Develop creative campaigns to strengthen brand visibility", "Work with digital & offline marketing channels", "Plan exhibitions and trade shows"] },
  { icon: <Users className="w-8 h-8 text-gray-700" />, title: "HR & Operations", responsibilities: ["Support daily business operations", "Vendor coordination and documentation", "Assist management with reports and compliance"] },
];

const noticePeriodOptions = ["15 Days", "30 Days", "90 Days", "Currently Serving"];

const CareerSection = () => {
  const [form, setForm] = useState({ name: "", email: "", contact: "", position: "", noticePeriod: "" });
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({ show: false, type: "", message: "" });
  const [captchaToken, setCaptchaToken] = useState(null);
  const [errors, setErrors] = useState({}); // State for validation errors
  const [openDepartment, setOpenDepartment] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Ref for the CAPTCHA to allow for proper reset
  const captchaRef = useRef(null); 

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop: accepted => {
        setResume(accepted[0]);
        if (errors.resume) setErrors(prev => ({ ...prev, resume: null })); // Clear resume error
    },
    accept: { 'application/pdf': ['.pdf'], 'application/msword': ['.doc'], 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'] },
    maxFiles: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null })); // Clear error on change
  };

  const handleNoticePeriodSelect = (option) => {
    setForm({ ...form, noticePeriod: option });
    setIsDropdownOpen(false);
    if (errors.noticePeriod) setErrors(prev => ({ ...prev, noticePeriod: null }));
  };

  const handleCaptcha = (token) => {
    setCaptchaToken(token);
    if (errors.captcha) setErrors(prev => ({ ...prev, captcha: null }));
};

  const showPopup = (type, message) => {
    setPopup({ show: true, type, message });
    setTimeout(() => { setPopup({ show: false, type: "", message: "" }); }, 3000);
  };

  const validateForm = () => {
    let newErrors = {};
    
    if (!form.name) newErrors.name = "Full Name is required.";
    
    if (!form.email) {
        newErrors.email = "Email address is required.";
    } else if (!isValidEmail(form.email)) {
        newErrors.email = "Invalid email format (e.g., user@example.com).";
    }

    if (!form.contact) {
        newErrors.contact = "Contact number is required.";
    } else if (!isValidContact(form.contact)) {
        newErrors.contact = "Invalid contact format (use 7-15 digits, e.g., +91 5551234567).";
    }

    if (!form.position) newErrors.position = "Position is required.";
    if (!form.noticePeriod) newErrors.noticePeriod = "Notice Period is required.";
    if (!resume) newErrors.resume = "Resume upload is required.";
    if (!captchaToken) newErrors.captcha = "Please verify the captcha.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
        showPopup("error", "Please fix the errors in the form before submitting.");
        return;
    }
    
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("contact", form.contact);
      formData.append("position", form.position);
      formData.append("message", `Notice Period: ${form.noticePeriod}`);
      formData.append("formType", "Career");
      formData.append("captchaToken", captchaToken);
      if (resume) formData.append("resume", resume);

      // NO CHANGE TO BACKEND CONNECTION URL OR METHOD
      const res = await fetch("https://lumenza.onrender.com/api/forms", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (res.ok && data.success) {
        showPopup("success", "Application submitted successfully!");
        setForm({ name: "", email: "", contact: "", position: "", noticePeriod: "" });
        setResume(null);
        setCaptchaToken(null);
        // Use the ref to reset the CAPTCHA
        captchaRef.current?.reset();
      } else {
        showPopup("error", data.message || "Submission failed");
      }
    } catch (err) {
      console.error("Career form error:", err);
      showPopup("error", "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // ADJUSTED: Increased vertical padding for better visual spacing
    <section className="bg-white text-gray-800 py-20 sm:py-28 px-4 sm:px-6 relative overflow-hidden font-sans">
      
      <LocalSEO 
      title="Careers"
      description="Join the LUMENZA team and build your future with us. Explore open roles in sales, marketing, operations, and more."
    />

      <LocalLightBackground />
      {/* Pop-up fixed at the top of the section, Z-index increased for visibility */}
      <AnimatePresence>
      {popup.show && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] backdrop-blur-sm p-4"
          onClick={() => setPopup({ show: false, type: "", message: "" })}
        >
          <motion.div 
            initial={{ scale: 0.8, y: -50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: -50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-4 w-full max-w-md text-center"
            onClick={(e) => e.stopPropagation()}
          >
            {popup.type === "success" ? <CheckCircle className="w-12 h-12 text-green-600" /> : <XCircle className="w-12 h-12 text-red-600" />}
            <p className="text-xl font-semibold text-gray-800">{popup.message}</p>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Block: Better alignment and responsive margin */}
        <motion.div 
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
            Build Your Future With Us
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto px-2">
            We're on a mission to redefine style and performance in hardware. Join a team of passionate innovators and build a career you can be proud of.
          </p>
        </motion.div>

        {/* Why Join Us Section: Consistent responsive grid and spacing */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 mb-20 md:mb-32">
            {whyJoinUs.map((item, idx) => (
                <motion.div 
                  key={item.title} 
                  className="flex items-start gap-4 text-left p-4 rounded-xl hover:bg-gray-50 transition-colors"
                  initial={{ opacity: 0, y: 50 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true, amount: 0.5 }} 
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                    <div className="flex-shrink-0 p-3 bg-red-100 rounded-full">{item.icon}</div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{item.title}</h3>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                </motion.div>
            ))}
        </div>

        {/* Open Departments Section: Consistent responsive grid and margin */}
        <div className="max-w-6xl mx-auto mb-20 md:mb-28">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Explore Open Departments</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {departments.map((dept) => (
                    <motion.div
                        key={dept.title}
                        layout="position"
                        onClick={() => setOpenDepartment(openDepartment === dept.title ? null : dept.title)}
                        className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                            openDepartment === dept.title 
                            ? 'bg-white shadow-2xl ring-4 ring-red-200' // Increased ring size for focus
                            : 'bg-gray-50/80 border border-gray-200 hover:shadow-xl hover:border-red-100'
                        }`}
                    >
                        <motion.div layout="position" className="flex flex-col items-center text-center gap-4 font-bold text-gray-800">
                            {dept.icon}
                            <h3 className="text-xl">{dept.title}</h3> {/* Increased font size */}
                        </motion.div>
                        
                        <AnimatePresence initial={false}>
                            {openDepartment === dept.title && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto", transition: { duration: 0.3 } }}
                                    exit={{ opacity: 0, height: 0, transition: { duration: 0.2 } }}
                                    className="overflow-hidden"
                                >
                                    <div className="mt-6 pt-4 border-t border-gray-200">
                                        <div className="bg-red-50 text-red-900 rounded-xl p-4 text-left">
                                            <h4 className="font-semibold text-red-800 mb-2">Key Responsibilities:</h4>
                                            <ul className="space-y-2 list-disc list-inside text-sm text-red-700">
                                                {dept.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
                                            </ul>
                                        </div>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); scrollToForm(); }}
                                            className="mt-4 w-full flex items-center justify-center gap-2 text-red-600 font-semibold hover:text-red-800 transition"
                                        >
                                            Apply Now <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </div>

        {/* Career Form Section: Fixed layout, better mobile spacing, consistent error positioning */}
        <motion.div 
          id="career-form" 
          className="bg-white p-6 sm:p-8 md:p-12 rounded-3xl border border-gray-100 shadow-3xl max-w-4xl mx-auto" // Slightly nicer border/shadow
          initial={{ opacity: 0, y: 50 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-3xl font-bold mb-8 text-center text-gray-800">Submit Your Application</h3> {/* Adjusted margin */}
          
          <form className="grid md:grid-cols-2 gap-y-7 gap-x-6" onSubmit={handleSubmit}> {/* Increased vertical gap (gap-y) */}
            
            {/* Input Wrapper 1: Full Name */}
            <div className="relative">
              <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Full Name" className={`w-full p-4 bg-gray-50 rounded-xl focus:ring-2 focus:ring-red-500 outline-none placeholder-gray-500 ${errors.name ? 'border-red-500 border-2' : 'border-gray-200 border'}`}/>
              {errors.name && <p className="text-red-500 text-xs mt-1 px-1 absolute top-[calc(100%+2px)] left-0">{errors.name}</p>} {/* Error fixed below input */}
            </div>
            
            {/* Input Wrapper 2: Email */}
            <div className="relative">
              <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="Email Address (user@example.com)" className={`w-full p-4 bg-gray-50 rounded-xl focus:ring-2 focus:ring-red-500 outline-none placeholder-gray-500 ${errors.email ? 'border-red-500 border-2' : 'border-gray-200 border'}`}/>
              {errors.email && <p className="text-red-500 text-xs mt-1 px-1 absolute top-[calc(100%+2px)] left-0">{errors.email}</p>}
            </div>

            {/* Input Wrapper 3: Contact */}
            <div className="relative">
              <input type="tel" name="contact" value={form.contact} onChange={handleChange} required placeholder="Contact Number (e.g., +1 555 123 4567)" className={`w-full p-4 bg-gray-50 rounded-xl focus:ring-2 focus:ring-red-500 outline-none placeholder-gray-500 ${errors.contact ? 'border-red-500 border-2' : 'border-gray-200 border'}`}/>
              {errors.contact && <p className="text-red-500 text-xs mt-1 px-1 absolute top-[calc(100%+2px)] left-0">{errors.contact}</p>}
            </div>

            {/* Input Wrapper 4: Position */}
            <div className="relative">
              <input type="text" name="position" value={form.position} onChange={handleChange} required placeholder="Position You're Applying For" className={`w-full p-4 bg-gray-50 rounded-xl focus:ring-2 focus:ring-red-500 outline-none placeholder-gray-500 ${errors.position ? 'border-red-500 border-2' : 'border-gray-200 border'}`}/>
              {errors.position && <p className="text-red-500 text-xs mt-1 px-1 absolute top-[calc(100%+2px)] left-0">{errors.position}</p>}
            </div>
            
            {/* Notice Period Dropdown (Full Width) */}
            <div className="md:col-span-2 relative">
                <button type="button" onClick={() => setIsDropdownOpen(!isDropdownOpen)} className={`w-full p-4 bg-gray-50 rounded-xl text-left flex justify-between items-center transition-all ${errors.noticePeriod ? 'border-red-500 border-2' : 'border-gray-200 border'}`}>
                    <span className={form.noticePeriod ? "text-gray-800 font-medium" : "text-gray-500"}>
                        {form.noticePeriod || "Select Notice Period..."}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {errors.noticePeriod && <p className="text-red-500 text-xs mt-1 px-1 absolute top-[calc(100%+2px)] left-0">{errors.noticePeriod}</p>}
                <AnimatePresence>
                    {isDropdownOpen && (
                        <motion.ul 
                            initial={{ opacity: 0, y: -10 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            exit={{ opacity: 0, y: -10 }} 
                            className="absolute z-30 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg list-none p-0 overflow-hidden"
                        >
                            {noticePeriodOptions.map(option => (
                                <li key={option} onClick={() => handleNoticePeriodSelect(option)} className="px-4 py-3 hover:bg-red-50 cursor-pointer text-gray-800 transition-colors">{option}</li>
                            ))}
                        </motion.ul>
                    )}
                </AnimatePresence>
            </div>

            {/* Resume Upload (Full Width) */}
            <div className="md:col-span-2 relative mt-2"> {/* Added slight top margin for better spacing */}
                <div {...getRootProps()} className={`p-8 border-2 border-dashed rounded-2xl cursor-pointer transition-colors flex flex-col items-center justify-center text-center ${errors.resume ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-red-400 bg-gray-50'}`}>
                    <input {...getInputProps()} />
                    <UploadCloud className="w-10 h-10 text-gray-400 mb-2"/>
                    {/* Adjusted content based on upload status */}
                    {resume ? <p className="text-green-600 font-medium">{resume.name}</p> : isDragActive ? <p className="text-red-600 font-medium">Drop the resume here...</p> : <p className="text-gray-500">Drag & drop your resume here, or click to select.</p>}
                    <p className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX up to 5MB</p>
                </div>
               {errors.resume && <p className="text-red-500 text-xs mt-1 px-1 absolute top-[calc(100%+2px)] left-0">{errors.resume}</p>}
            </div>

            {/* Captcha (Full Width, Centered) */}
            <div className="flex justify-center md:col-span-2 relative pt-6"> {/* Increased top padding for vertical alignment and added a bottom padding to match button margin */}
                <div className="flex flex-col items-center relative"> 
                <ReCAPTCHA ref={captchaRef} sitekey="6LdW9LgrAAAAAGz7TLHCaOOWYRWAw6GDYH5XFlvt" onChange={handleCaptcha} />
                {errors.captcha && <p className="text-red-500 text-xs mt-2 px-1 absolute top-[calc(100%+2px)] left-1/2 transform -translate-x-1/2">{errors.captcha}</p>} {/* Fixed error text positioning */}
                </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full md:col-span-2 flex items-center justify-center text-center mt-6 px-6 py-4 bg-red-600 text-white font-semibold rounded-xl shadow-xl hover:bg-red-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-red-500/40 hover:-translate-y-0.5" // Nicer button effects
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Submitting...</span>
                </div>
              ) : (
                "Submit Application"
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default CareerSection;

import React, { useState, useRef } from "react";
import { CheckCircle, XCircle, Briefcase, Megaphone, Users, UploadCloud, ChevronDown, Zap, TrendingUp, ArrowRight, Contact } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";
import { motion, AnimatePresence } from "framer-motion";
import { useDropzone } from "react-dropzone";
import LightBackground from "./components/LightBackground";

// Helper function to scroll to the form
const scrollToForm = () => {
  document.getElementById("career-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
};

// Data for the "Why Join Us" section
const whyJoinUs = [
    { icon: <Zap className="w-8 h-8 text-red-600" />, title: "Innovate", description: "Work on cutting-edge products that redefine the industry." },
    { icon: <TrendingUp className="w-8 h-8 text-red-600" />, title: "Grow", description: "We invest in your professional development and career path." },
    { icon: <Users className="w-8 h-8 text-red-600" />, title: "Collaborate", description: "Join a supportive team where your ideas are valued." }
];

// Data for the department cards
const departments = [
  { icon: <Briefcase className="w-8 h-8 text-gray-700" />, title: "Sales & Business Development", responsibilities: ["Build relationships with dealers, architects, and retailers", "Product presentations and market visits", "Area-wise target setting and achievement"] },
  { icon: <Megaphone className="w-8 h-8 text-gray-700" />, title: "Marketing & Brand", responsibilities: ["Develop creative campaigns to strengthen brand visibility", "Work with digital & offline marketing channels", "Plan exhibitions and trade shows"] },
  { icon: <Users className="w-8 h-8 text-gray-700" />, title: "HR & Operations", responsibilities: ["Support daily business operations", "Vendor coordination and documentation", "Assist management with reports and compliance"] },
];

const noticePeriodOptions = ["15 Days", "30 Days", "90 Days"];

const CareerSection = () => {
  const [form, setForm] = useState({ name: "", email: "", contact: "", position: "", noticePeriod: "" });
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({ show: false, type: "", message: "" });
  const [captchaToken, setCaptchaToken] = useState(null);
  const [openDepartment, setOpenDepartment] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop: accepted => setResume(accepted[0]),
    accept: { 'application/pdf': ['.pdf'], 'application/msword': ['.doc'], 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'] },
    maxFiles: 1,
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleNoticePeriodSelect = (option) => {
    setForm({ ...form, noticePeriod: option });
    setIsDropdownOpen(false);
  };
  const handleCaptcha = (token) => setCaptchaToken(token);

  const showPopup = (type, message) => {
    setPopup({ show: true, type, message });
    setTimeout(() => { setPopup({ show: false, type: "", message: "" }); }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!captchaToken) {
      showPopup("error", "Please verify the captcha.");
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
        window.grecaptcha?.reset();
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
    <section className="bg-white text-gray-800 pt-28 sm:pt-32 pb-20 px-4 sm:px-6 relative overflow-hidden">
      <LightBackground />
      {popup.show && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center gap-4 w-[90%] max-w-md text-center animate-fadeIn">
            {popup.type === "success" ? <CheckCircle className="w-12 h-12 text-green-600" /> : <XCircle className="w-12 h-12 text-red-600" />}
            <p className="text-lg font-semibold text-gray-800">{popup.message}</p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
            Build Your Future With Us
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            We're on a mission to redefine style and performance in hardware. Join a team of passionate innovators and build a career you can be proud of.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-10 mb-24">
            {whyJoinUs.map((item, idx) => (
                <motion.div 
                  key={item.title} 
                  className="flex items-start gap-4 text-left"
                  initial={{ opacity: 0, y: 50 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                >
                    <div className="flex-shrink-0 p-3 bg-red-100 rounded-full">{item.icon}</div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                    </div>
                </motion.div>
            ))}
        </div>

        <div className="max-w-6xl mx-auto mb-20">
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">Open Departments</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {departments.map((dept) => (
                    <motion.div
                        key={dept.title}
                        layout="position"
                        onClick={() => setOpenDepartment(openDepartment === dept.title ? null : dept.title)}
                        className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                            openDepartment === dept.title 
                            ? 'bg-white shadow-2xl ring-2 ring-red-300' 
                            : 'bg-gray-50/80 border border-gray-200 hover:shadow-xl hover:border-gray-300'
                        }`}
                    >
                        <motion.div layout="position" className="flex flex-col items-center text-center gap-4 font-bold text-gray-800">
                            {dept.icon}
                            <h3 className="text-lg">{dept.title}</h3>
                        </motion.div>
                        
                        <AnimatePresence>
                            {openDepartment === dept.title && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="mt-4 pt-4 border-t border-gray-200"
                                >
                                    <div className="bg-red-50 text-red-900 rounded-xl p-4 text-left">
                                        <h4 className="font-semibold text-red-800 mb-2">Key Responsibilities:</h4>
                                        <ul className="space-y-2 list-disc list-inside text-sm text-red-700">
                                            {dept.responsibilities.map(r => <li key={r}>{r}</li>)}
                                        </ul>
                                    </div>
                                    <button
                                        onClick={scrollToForm}
                                        className="mt-4 w-full flex items-center justify-center gap-2 text-red-600 font-semibold hover:text-red-800 transition"
                                    >
                                        Apply Now <ArrowRight className="w-4 h-4" />
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </div>

        <motion.div id="career-form" className="bg-white p-8 md:p-12 rounded-2xl border border-gray-200 shadow-2xl max-w-4xl mx-auto"
         initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <h3 className="text-3xl font-bold mb-6 text-center text-gray-800">Apply Now</h3>
          <form className="grid md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
            <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Full Name" className="p-4 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"/>
            <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="Email Address" className="p-4 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"/>
            <input type="tel" name="contact" value={form.contact} onChange={handleChange} pattern="[0-9]{10}" title="Enter a valid 10-digit contact number" required placeholder="Contact Number" className="p-4 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"/>
            <input type="text" name="position" value={form.position} onChange={handleChange} required placeholder="Position You're Applying For" className="p-4 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"/>
            
            <div className="md:col-span-2 relative">
                <button type="button" onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="w-full p-4 bg-gray-50 border-gray-200 rounded-xl text-left flex justify-between items-center">
                    <span className={form.noticePeriod ? "text-gray-800" : "text-gray-500"}>
                        {form.noticePeriod || "Select Notice Period..."}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                    {isDropdownOpen && (
                        <motion.ul initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg">
                            {noticePeriodOptions.map(option => (
                                <li key={option} onClick={() => handleNoticePeriodSelect(option)} className="px-4 py-3 hover:bg-red-50 cursor-pointer">{option}</li>
                            ))}
                        </motion.ul>
                    )}
                </AnimatePresence>
            </div>

            <div {...getRootProps()} className={`md:col-span-2 p-8 border-2 border-dashed rounded-2xl cursor-pointer transition-colors flex flex-col items-center justify-center text-center ${isDragActive ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-red-400'}`}>
              <input {...getInputProps()} />
              <UploadCloud className="w-10 h-10 text-gray-400 mb-2"/>
              {acceptedFiles.length > 0 ? <p className="text-green-600 font-medium">{acceptedFiles[0].name}</p> : <p className="text-gray-500">Drag & drop your resume here, or click to select.</p>}
              <p className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX up to 5MB</p>
            </div>

            <div className="flex justify-center md:col-span-2"><ReCAPTCHA sitekey="6LdW9LgrAAAAAGz7TLHCaOOWYRWAw6GDYH5XFlvt" onChange={handleCaptcha} /></div>

            <button
              type="submit"
              disabled={loading}
              className="w-full md:col-span-2 flex items-center justify-center text-center px-6 py-4 bg-red-600 text-white font-semibold rounded-xl shadow-lg hover:bg-red-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-red-500/40 hover:-translate-y-1"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin"></div>
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

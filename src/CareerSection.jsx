import React, { useState, useRef } from "react";
import { CheckCircle, XCircle, Briefcase, Megaphone, Users, UploadCloud, ChevronDown, Zap, TrendingUp } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";
import { motion, AnimatePresence } from "framer-motion";
import { useDropzone } from "react-dropzone";
import LightBackground from "./components/LightBackground"; // Import the new light background

// Helper function to scroll to the form
const scrollToForm = () => {
  document.getElementById("career-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
};

// Data for the "Why Join Us" section with correct icons
const whyJoinUs = [
    {
        icon: <Zap className="w-8 h-8 text-red-600" />,
        title: "Innovate",
        description: "Work on cutting-edge products that redefine the industry."
    },
    {
        icon: <TrendingUp className="w-8 h-8 text-red-600" />,
        title: "Grow",
        description: "We invest in your professional development and career path."
    },
    {
        icon: <Users className="w-8 h-8 text-red-600" />,
        title: "Collaborate",
        description: "Join a supportive team where your ideas are valued."
    }
];

// Data for the department tabs
const departments = [
  {
    title: "Sales & Business Development",
    responsibilities: [
      "Build relationships with dealers, architects, and retailers",
      "Product presentations and market visits",
      "Area-wise target setting and achievement",
    ],
  },
  {
    title: "Marketing & Brand",
    responsibilities: [
        "Develop creative campaigns to strengthen brand visibility",
        "Work with digital & offline marketing channels",
        "Plan exhibitions and trade shows",
    ],
  },
  {
    title: "HR & Operations",
    responsibilities: [
        "Support daily business operations",
        "Vendor coordination and documentation",
        "Assist management with reports and compliance",
    ],
  },
];

const CareerSection = () => {
  const [form, setForm] = useState({
    name: "", email: "", mobile: "", position: "", noticePeriod: "",
  });
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({ show: false, type: "", message: "" });
  const [captchaToken, setCaptchaToken] = useState(null);
  const [activeTab, setActiveTab] = useState(departments[0].title);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop: accepted => setResume(accepted[0]),
    accept: { 'application/pdf': ['.pdf'], 'application/msword': ['.doc'], 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'] },
    maxFiles: 1,
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
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
      formData.append("mobile", form.mobile);
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
        setForm({ name: "", email: "", mobile: "", position: "", noticePeriod: "" });
        setResume(null);
        setCaptchaToken(null);
        window.grecaptcha?.reset();
      } else {
        showPopup("error", data.message || "Submission failed");
      }
    } catch (err) {
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
            We're on a mission to redefine style and performance in hardware. Behind every flawless product is a team of passionate innovators. Are you ready to make an impact?
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-24 text-center">
            {whyJoinUs.map((item, idx) => (
                <motion.div key={item.title} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:shadow-red-200/50"
                initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.15 }}>
                    <div className="inline-block p-4 bg-red-100 rounded-full mb-4">
                        {item.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                </motion.div>
            ))}
        </div>

        <div className="max-w-4xl mx-auto mb-20">
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">Open Departments</h2>
            <div className="flex justify-center border-b border-gray-200 mb-8">
                {departments.map(dept => (
                    <button key={dept.title} onClick={() => setActiveTab(dept.title)}
                    className={`px-6 py-3 font-semibold text-lg transition-colors duration-300 relative ${activeTab === dept.title ? 'text-red-600' : 'text-gray-500 hover:text-red-500'}`}>
                        {dept.title}
                        {activeTab === dept.title && (
                            <motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" layoutId="underline" />
                        )}
                    </button>
                ))}
            </div>
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {departments.map(dept => (
                        activeTab === dept.title && (
                            <div key={dept.title} className="bg-white border border-gray-200 rounded-2xl p-8">
                                 <h4 className="text-xl font-bold text-gray-800 mb-4">Key Responsibilities:</h4>
                                 <ul className="space-y-3 list-disc list-inside text-gray-600">
                                     {dept.responsibilities.map(r => <li key={r}>{r}</li>)}
                                 </ul>
                            </div>
                        )
                    ))}
                </motion.div>
            </AnimatePresence>
        </div>

        <motion.div id="career-form" className="bg-white p-8 md:p-12 rounded-2xl border border-gray-200 shadow-2xl max-w-4xl mx-auto"
         initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <h3 className="text-3xl font-bold mb-6 text-center text-gray-800">Apply Now</h3>
          <form className="grid md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
            <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Full Name" className="p-4 bg-gray-100 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"/>
            <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="Email Address" className="p-4 bg-gray-100 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"/>
            <input type="tel" name="mobile" value={form.mobile} onChange={handleChange} pattern="[0-9]{10}" title="Enter a valid 10-digit mobile number" required placeholder="Mobile Number" className="p-4 bg-gray-100 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"/>
            <input type="text" name="position" value={form.position} onChange={handleChange} required placeholder="Position You're Applying For" className="p-4 bg-gray-100 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"/>
            
            <div className="md:col-span-2">
              <select name="noticePeriod" value={form.noticePeriod} onChange={handleChange} required className="w-full p-4 bg-gray-100 border-gray-200 rounded-xl text-gray-800 focus:ring-2 focus:ring-red-500 outline-none">
                <option value="" disabled>Select Notice Period...</option>
                <option value="15 Days">15 Days</option>
                <option value="30 Days">30 Days</option>
                <option value="90 Days">90 Days</option>
              </select>
            </div>

            <div {...getRootProps()} className={`md:col-span-2 p-8 border-2 border-dashed rounded-2xl cursor-pointer transition-colors flex flex-col items-center justify-center text-center ${isDragActive ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-red-400'}`}>
              <input {...getInputProps()} />
              <UploadCloud className="w-10 h-10 text-gray-400 mb-2"/>
              {acceptedFiles.length > 0 ? <p className="text-green-600 font-medium">{acceptedFiles[0].name}</p> : <p className="text-gray-500">Drag & drop your resume here, or click to select.</p>}
              <p className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX up to 5MB</p>
            </div>

            <div className="flex justify-center md:col-span-2"><ReCAPTCHA sitekey="6LdW9LgrAAAAAGz7TLHCaOOWYRWAw6GDYH5XFlvt" onChange={handleCaptcha} /></div>

            <button type="submit" disabled={loading} className="w-full md:col-span-2 text-center px-6 py-4 bg-red-600 text-white font-semibold rounded-xl shadow-lg hover:bg-red-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-red-500/40 hover:-translate-y-1">
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default CareerSection;

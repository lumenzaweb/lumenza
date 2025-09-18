import React, { useState, useRef } from "react";
import { CheckCircle, XCircle, Briefcase, Megaphone, Users } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";
import { motion } from "framer-motion";
import GridBackground from "./components/GridBackground"; // Assuming this file exists

// Helper function to scroll to the form
const scrollToForm = () => {
  document.getElementById("career-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
};

// Data for the new interactive role cards
const departments = [
  {
    icon: <Briefcase className="w-10 h-10 text-red-500" />,
    title: "Sales & Business Development",
    description: "Drive our growth by building relationships and expanding our market presence.",
  },
  {
    icon: <Megaphone className="w-10 h-10 text-red-500" />,
    title: "Marketing & Brand",
    description: "Shape our brand's story and connect with customers through creative campaigns.",
  },
  {
    icon: <Users className="w-10 h-10 text-red-500" />,
    title: "HR & Operations",
    description: "Support our team and streamline the processes that power our success.",
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
  const fileInputRef = useRef(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setResume(e.target.files[0]);
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
        if (fileInputRef.current) fileInputRef.current.value = "";
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
    <section className="bg-black text-white pt-28 sm:pt-32 pb-20 px-4 sm:px-6 relative overflow-hidden">
      <GridBackground />

      {popup.show && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
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
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent">
            Build Your Future With Us
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
            We're on a mission to redefine style and performance in hardware. Behind every flawless product is a team of passionate innovators. Are you ready to make an impact?
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {departments.map((dept, idx) => (
            <motion.div
              key={dept.title}
              className="bg-white/5 border border-white/10 p-8 rounded-2xl shadow-lg hover:shadow-red-500/20 hover:border-red-500/30 backdrop-blur-sm group transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className="mb-4 transition-transform duration-300 group-hover:-translate-y-1">{dept.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-2">{dept.title}</h3>
              <p className="text-gray-400 flex-grow mb-4">{dept.description}</p>
              <button
                onClick={scrollToForm}
                className="mt-auto text-red-500 font-semibold group-hover:text-red-400 transition-colors"
              >
                Apply for this department →
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div 
          id="career-form" 
          className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 md:p-12 rounded-2xl shadow-2xl max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-3xl font-bold mb-6 text-center text-white">
            Apply Now
          </h3>
          <form className="grid md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
            <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Full Name" className="p-4 bg-white/5 border border-white/20 rounded-xl placeholder-gray-400 focus:ring-2 focus:ring-red-500 outline-none transition-all duration-300" />
            <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="Email Address" className="p-4 bg-white/5 border border-white/20 rounded-xl placeholder-gray-400 focus:ring-2 focus:ring-red-500 outline-none transition-all duration-300" />
            <input type="tel" name="mobile" value={form.mobile} onChange={handleChange} pattern="[0-9]{10}" title="Enter a valid 10-digit mobile number" required placeholder="Mobile Number" className="p-4 bg-white/5 border border-white/20 rounded-xl placeholder-gray-400 focus:ring-2 focus:ring-red-500 outline-none transition-all duration-300" />
            <input type="text" name="position" value={form.position} onChange={handleChange} required placeholder="Position You're Applying For" className="p-4 bg-white/5 border border-white/20 rounded-xl placeholder-gray-400 focus:ring-2 focus:ring-red-500 outline-none transition-all duration-300" />
            
            <div className="md:col-span-2">
              <select
                name="noticePeriod"
                value={form.noticePeriod}
                onChange={handleChange}
                required
                className="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 outline-none transition-all duration-300"
              >
                <option value="" disabled className="text-gray-500 bg-gray-800">Select Notice Period...</option>
                <option value="15 Days" className="bg-gray-800">15 Days</option>
                <option value="30 Days" className="bg-gray-800">30 Days</option>
                <option value="90 Days" className="bg-gray-800">90 Days</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-300 mb-2 font-medium">Upload Resume (PDF/DOC)</label>
              <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="block w-full text-sm text-gray-400 border border-white/20 rounded-lg cursor-pointer bg-white/5 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-600 file:text-white hover:file:bg-red-700" />
            </div>

            <div className="flex justify-center md:col-span-2">
              <ReCAPTCHA sitekey="6LdW9LgrAAAAAGz7TLHCaOOWYRWAw6GDYH5XFlvt" onChange={handleCaptcha} theme="dark" />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full md:col-span-2 text-center px-6 py-4 bg-red-600 text-white font-semibold rounded-xl shadow-lg hover:bg-red-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-red-500/40 hover:-translate-y-1"
            >
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        </motion.div> { /* <-- THIS CLOSING TAG WAS MISSING */ }
      </div>
    </section>
  );
};

export default CareerSection;
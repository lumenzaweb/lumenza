import React, { useState, useRef } from "react";
import { CheckCircle, XCircle, Briefcase, Megaphone, Users } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";
import { motion } from "framer-motion";

// Helper function to scroll to the form
const scrollToForm = () => {
  const section = document.getElementById("career-form");
  if (section) {
    section.scrollIntoView({ behavior: "smooth", block: "center" });
  }
};

// Data for the new interactive role cards
const departments = [
  {
    icon: <Briefcase className="w-10 h-10 text-red-600" />,
    title: "Sales & Business Development",
    description: "Drive our growth by building relationships and expanding our market presence.",
    roles: ["Field Sales Executive", "Area Sales Manager"],
  },
  {
    icon: <Megaphone className="w-10 h-10 text-red-600" />,
    title: "Marketing & Brand",
    description: "Shape our brand's story and connect with customers through creative campaigns.",
    roles: ["Digital Marketing Specialist", "Brand Manager"],
  },
  {
    icon: <Users className="w-10 h-10 text-red-600" />,
    title: "HR & Operations",
    description: "Support our team and streamline the processes that power our success.",
    roles: ["Operations Executive", "HR Generalist"],
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleCaptcha = (token) => {
    setCaptchaToken(token);
  };

  const showPopup = (type, message) => {
    setPopup({ show: true, type, message });
    setTimeout(() => {
      setPopup({ show: false, type: "", message: "" });
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!captchaToken) {
      showPopup("error", "Please verify the captcha.");
      return;
    }
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("mobile", form.mobile);
      formData.append("position", form.position);
      // The backend expects a "message", so we send the notice period under that key.
      formData.append("message", `Notice Period: ${form.noticePeriod}`);
      formData.append("formType", "Career");
      formData.append("captchaToken", captchaToken);
      if (resume) {
        formData.append("resume", resume);
      }

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
      console.error("Career form error:", err);
      showPopup("error", "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 pt-28 sm:pt-32 pb-20 px-4 sm:px-6">
      {/* Center Popup */}
      {popup.show && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
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

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1 
            className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Join Our Team
          </motion.h1>
          <motion.p 
            className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            We're building the future of hardware solutions, and we need passionate, talented people to help us achieve our mission. Explore our open departments below.
          </motion.p>
        </div>

        {/* Department Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {departments.map((dept, idx) => (
            <motion.div
              key={dept.title}
              className="bg-white border border-gray-200 p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className="mb-4">{dept.icon}</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{dept.title}</h3>
              <p className="text-gray-600 flex-grow mb-4">{dept.description}</p>
              <button
                onClick={scrollToForm}
                className="mt-auto text-red-600 font-semibold hover:underline"
              >
                Apply for this department
              </button>
            </motion.div>
          ))}
        </div>

        {/* Form Section */}
        <div id="career-form" className="bg-white p-8 md:p-12 rounded-2xl border border-gray-200 shadow-xl max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Apply Now
          </h3>
          <form className="grid md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
            <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Full Name" className="p-3 border rounded-xl focus:ring-2 focus:ring-red-400 focus:outline-none shadow-sm" />
            <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="Email Address" className="p-3 border rounded-xl focus:ring-2 focus:ring-red-400 focus:outline-none shadow-sm" />
            <input type="tel" name="mobile" value={form.mobile} onChange={handleChange} pattern="[0-9]{10}" title="Enter a valid 10-digit mobile number" required placeholder="Mobile Number" className="p-3 border rounded-xl focus:ring-2 focus:ring-red-400 focus:outline-none shadow-sm" />
            <input type="text" name="position" value={form.position} onChange={handleChange} required placeholder="Position You're Applying For" className="p-3 border rounded-xl focus:ring-2 focus:ring-red-400 focus:outline-none shadow-sm" />
            
            <div className="md:col-span-2">
              <select
                name="noticePeriod"
                value={form.noticePeriod}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-red-400 focus:outline-none shadow-sm bg-white"
              >
                <option value="" disabled>Select Notice Period...</option>
                <option value="15 Days">15 Days</option>
                <option value="30 Days">30 Days</option>
                <option value="90 Days">90 Days</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2 font-medium">Upload Resume (PDF/DOC)</label>
              <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-400 p-2" />
            </div>

            <div className="flex justify-center md:col-span-2">
              <ReCAPTCHA sitekey="6LdW9LgrAAAAAGz7TLHCaOOWYRWAw6GDYH5XFlvt" onChange={handleCaptcha} />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full md:col-span-2 text-center px-6 py-3 bg-red-600 text-white font-semibold rounded-xl shadow-md hover:bg-red-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CareerSection;

import React, { useState, useRef } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";

const CareerSection = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    position: "",
    message: "",
  });

  const [resume, setResume] = useState(null);
  const [submitted, setSubmitted] = useState(false);
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
      formData.append("message", form.message);
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
        setSubmitted(true);
        showPopup("success", "Application submitted successfully!");
        setForm({
          name: "",
          email: "",
          mobile: "",
          position: "",
          message: "",
        });
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

  const sections = [
    {
      title: "Sales & Business Development",
      subtitle: "Open Roles:",
      responsibilities: [
        "Build relationships with dealers, architects, builders, and retailers",
        "Product presentations and market visits",
        "Area-wise target setting and achievement",
        "Competitive market analysis",
      ],
      roles: [
        "Field Sales Executive",
        "Business Development Officer",
        "Area Sales Manager",
      ],
    },
    {
      title: "Customer Support & Service",
      subtitle: "Open Roles:",
      responsibilities: [
        "Handle customer inquiries and complaints",
        "Ensure timely resolution of issues",
        "Assist sales team with client support",
        "Build long-term client relationships",
      ],
      roles: ["Customer Support Executive", "Service Coordinator"],
    },
    {
      title: "Marketing & Brand Development",
      subtitle: "Open Roles:",
      responsibilities: [
        "Develop creative campaigns to strengthen brand visibility",
        "Work with digital & offline marketing channels",
        "Plan exhibitions and trade shows",
        "Coordinate with designers and content creators",
      ],
      roles: ["Marketing Executive", "Digital Marketing Specialist"],
    },
    {
      title: "Warehouse & Logistics",
      subtitle: "Open Roles:",
      responsibilities: [
        "Inventory management and stock audits",
        "Dispatch coordination",
        "Supply chain optimization",
        "Vendor and transport management",
      ],
      roles: ["Warehouse Supervisor", "Dispatch Coordinator"],
    },
    {
      title: "Operations & Administration",
      subtitle: "Open Roles:",
      responsibilities: [
        "Support daily business operations",
        "Vendor coordination",
        "Documentation and compliance",
        "Assist management with reports",
      ],
      roles: ["Operations Executive", "Admin Officer"],
    },
    {
      title: "Internships",
      subtitle: "Open Roles:",
      responsibilities: [
        "Exciting internship opportunities in sales, marketing, and operations",
        "Gain hands-on experience with India’s growing brand",
        "Mentorship and career development",
      ],
      roles: ["Sales Intern", "Marketing Intern", "Operations Intern"],
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-16 my-12 bg-gradient-to-br from-white via-red-50 to-red-100 rounded-3xl shadow-xl relative">
      {/* Center Popup */}
      {popup.show && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div
            className={`bg-white-400 rounded-2xl shadow-xl p-8 flex flex-col items-center gap-4 w-[90%] max-w-md text-center animate-fadeIn`}
          >
            {popup.type === "success" ? (
              <CheckCircle className="w-12 h-12 text-green-600" />
            ) : (
              <XCircle className="w-12 h-12 text-red-600" />
            )}
            <p className="text-lg font-semibold text-gray-800">
              {popup.message}
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-center text-red-900 tracking-tight">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-800">
          Careers at Lumenza
        </span>
      </h1>
      <p className="text-lg mb-12 text-center text-black max-w-2xl mx-auto">
        Careers at Lumenza mean{" "}
        <span className="font-semibold">more than just a job</span>. They're
        about building futures with a trusted brand in{" "}
        <span className="text-red-700 font-semibold">
          Security, Hardware, and Lifestyle Accessories
        </span>
        .
      </p>

      {/* Intro paragraphs */}
      <div className="mb-16 space-y-10">
        <div className="bg-white/80 border-l-4 border-red-600 p-6 rounded-xl shadow-sm">
          <p className="text-black text-lg leading-relaxed">
            At <span className="font-semibold text-red-700">Lumenza</span>, we
            create an environment where professionals can thrive, innovate, and
            make a lasting impact. Our culture encourages{" "}
            <span className="font-medium">teamwork, flexibility, and growth</span>
            , empowering every individual to do their best work.
          </p>
        </div>

        <div className="bg-white/80 border-l-4 border-red-600 p-6 rounded-xl shadow-sm">
          <p className="text-black text-lg leading-relaxed">
            At <span className="font-semibold text-red-700">Lumenza</span>, we're
            on a mission to redefine how homes and workspaces look and feel — with
            hardware that blends style, innovation, and performance. Behind every
            flawless handle, smooth trolley, or secure locker, there's a team of
            passionate individuals committed to quality and excellence. We're
            looking for{" "}
            <span className="font-medium">
              visionaries, team players, and problem-solvers
            </span>{" "}
            ready to make an impact.
          </p>
        </div>

        {/* Department blocks */}
        {sections.map((section, idx) => (
          <div
            key={idx}
            className="bg-white/90 border border-gray-100 p-8 rounded-2xl shadow-md hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-bold text-red-800 mb-5">
              {section.title}
            </h2>

            <h3 className="text-xl font-bold text-red-800 mb-4">
              Responsibilities
            </h3>
            <ul className="space-y-4 mb-6">
              {section.responsibilities.map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-black">
                  <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <h3 className="text-xl font-bold text-red-800 mb-4">
              {section.subtitle}
            </h3>
            <ul className="space-y-4">
              {section.roles.map((role, i) => (
                <li key={i} className="flex items-start gap-3 text-black">
                  <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                  <span>{role}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Form Section */}
      <div className="bg-white p-10 rounded-2xl border border-gray-100 shadow-lg">
        <h3 className="text-3xl font-bold mb-6 text-center text-red-800">
          Apply Now or Send Inquiry
        </h3>

        <form className="grid md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Full Name"
            className="p-3 border rounded-xl focus:ring-2 focus:ring-red-400 focus:outline-none shadow-sm"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="Email Address"
            className="p-3 border rounded-xl focus:ring-2 focus:ring-red-400 focus:outline-none shadow-sm"
          />
          <input
            type="tel"
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            pattern="[0-9]{10}"
            title="Enter a valid 10-digit mobile number"
            required
            placeholder="Mobile Number"
            className="p-3 border rounded-xl focus:ring-2 focus:ring-red-400 focus:outline-none shadow-sm"
          />
          <input
            type="text"
            name="position"
            value={form.position}
            onChange={handleChange}
            required
            placeholder="Position Applied / Inquiry"
            className="p-3 border rounded-xl focus:ring-2 focus:ring-red-400 focus:outline-none shadow-sm"
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            placeholder="Message / Brief Profile / Inquiry"
            rows="4"
            className="p-3 border rounded-xl focus:ring-2 focus:ring-red-400 focus:outline-none shadow-sm md:col-span-2"
          />

          {/* File Upload */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-2 font-medium">
              Upload Resume (PDF/DOC)
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-400 p-2"
            />
          </div>

          {/* Google reCAPTCHA */}
          <div className="flex justify-center md:col-span-2">
            <ReCAPTCHA
              sitekey="6LdW9LgrAAAAAGz7TLHCaOOWYRWAw6GDYH5XFlvt"
              onChange={handleCaptcha}
            />
          </div>

          {/* Modern Button */}
          <button
            type="submit"
            disabled={loading}
            className={`relative flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-800 text-white py-3 px-6 rounded-xl font-semibold shadow-md transition md:col-span-2
              ${
                loading
                  ? "opacity-80 cursor-not-allowed"
                  : "hover:shadow-lg hover:scale-105"
              }
            `}
          >
            {loading ? (
              <svg
                className="w-5 h-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            ) : (
              "Submit Application"
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default CareerSection;

import React, { useState, useRef } from "react";
import { CheckCircle } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";

const CareerSection = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    position: "",
    message: "",
  });

  const [resume, setResume] = useState(null); // file upload
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState("");
  const [captchaToken, setCaptchaToken] = useState(null);

  const fileInputRef = useRef(null); // ✅ to reset file input

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleCaptcha = (token) => {
    setCaptchaToken(token);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaToken) {
      setStatus("❌ Please verify the captcha.");
      return;
    }

    try {
      setStatus("⏳ Submitting...");

      // Prepare form data with file
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
        setStatus("✅ Application submitted successfully!");
        setForm({
          name: "",
          email: "",
          mobile: "",
          position: "",
          message: "",
        });
        setResume(null);
        if (fileInputRef.current) fileInputRef.current.value = ""; // ✅ reset file input
        setCaptchaToken(null);
        window.grecaptcha?.reset(); // ✅ reset captcha widget
      } else {
        setStatus(`❌ Error: ${data.message || "Submission failed"}`);
      }
    } catch (err) {
      console.error("❌ Career form error:", err);
      setStatus("❌ Something went wrong.");
    }
  };

  const sections = [
    {
      title: "Sales & Business Development",
      points: [
        "Build relationships with dealers, architects, builders, and retailers",
        "Product presentations and market visits",
        "Area-wise target setting and achievement",
        "Competitive market analysis",
      ],
      subtitle: "Open Roles :",
      points:  [
        "Field Sales Executive",
        "Business Development Officer",
        "Area Sales Manager",
      ],
    },
    {
      title: "Customer Support & Service",
      points: [
        "Handle customer inquiries and complaints",
        "Ensure timely resolution of issues",
        "Assist sales team with client support",
        "Build long-term client relationships",
        <strong>Open Roles :</strong>,
        "Customer Support Executive",
        "Service Coordinator",
      ],
    },
    {
      title: "Marketing & Brand Development",
      points: [
        "Develop creative campaigns to strengthen brand visibility",
        "Work with digital & offline marketing channels",
        "Plan exhibitions and trade shows",
        "Coordinate with designers and content creators",
        <strong>Open Roles :</strong>,
        "Marketing Executive",
        "Digital Marketing Specialist",
      ],
    },
    {
      title: "Warehouse & Logistics",
      points: [
        "Inventory management and stock audits",
        "Dispatch coordination",
        "Supply chain optimization",
        "Vendor and transport management",
        <strong>Open Roles :</strong>,
        "Warehouse Supervisor",
        "Dispatch Coordinator",
      ],
    },
    {
      title: "Operations & Administration",
      points: [
        "Support daily business operations",
        "Vendor coordination",
        "Documentation and compliance",
        "Assist management with reports",
        <strong>Open Roles :</strong>,
        "Operations Executive",
        "Admin Officer",
      ],
    },
    {
      title: "Internships",
      points: [
        "Exciting internship opportunities in sales, marketing, and operations",
        "Gain hands-on experience with India’s growing brand",
        "Mentorship and career development",
        <strong>Open Roles :</strong>,
        "Sales Intern",
        "Marketing Intern",
        "Operations Intern",
      ],
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-16 my-12 bg-gradient-to-br from-white via-red-50 to-red-100 rounded-3xl shadow-xl">
      {/* Header */}
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-center text-red-900 tracking-tight">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-800">
          Careers at Lumenza
        </span>
      </h1>
      <p className="text-lg mb-12 text-center text-black max-w-2xl mx-auto">
        Careers at Lumenza mean{" "}
        <span className="font-semibold">more than just a job</span>. They're about building futures with a trusted brand in{" "}
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
            <span className="font-medium">teamwork, flexibility, and growth</span>,
            empowering every individual to do their best work.
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
              {section.subtitle}
            </h3>
            <ul className="space-y-4">
              {section.points.map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-black">
                  <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                  <span>{point}</span>
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

        {submitted && (
          <div className="mb-6 text-green-700 font-semibold text-center bg-green-100 py-3 rounded-lg shadow-inner">
            ✅ Thank you for your submission! We'll get back to you soon.
          </div>
        )}

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

          <button
            type="submit"
            className="bg-gradient-to-r from-red-600 to-red-800 text-white py-3 px-6 rounded-xl font-semibold shadow-md hover:shadow-lg hover:scale-105 transition md:col-span-2"
          >
            Submit Application
          </button>
        </form>

        {status && <p className="mt-4 text-center text-lg">{status}</p>}
      </div>
    </section>
  );
};

export default CareerSection;
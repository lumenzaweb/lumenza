import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { CheckCircle, XCircle } from "lucide-react";

const CareerSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    resume: null,
  });

  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({ show: false, type: "", message: "" });
  const [recaptchaToken, setRecaptchaToken] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "resume") {
      setFormData({ ...formData, resume: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCaptcha = (token) => {
    setRecaptchaToken(token);
  };

  const showPopup = (type, message) => {
    setPopup({ show: true, type, message });
    setTimeout(() => {
      setPopup({ show: false, type: "", message: "" });
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recaptchaToken) {
      showPopup("error", "Please verify the captcha.");
      return;
    }

    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("formType", "Career");
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("position", formData.position);
      formDataToSend.append("captchaToken", recaptchaToken);
      if (formData.resume) {
        formDataToSend.append("resume", formData.resume);
      }

      const res = await fetch("https://lumenza.onrender.com/api/forms", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await res.json();

      if (res.ok && data.success) {
        showPopup("success", "Application submitted successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          position: "",
          resume: null,
        });
        setRecaptchaToken(null);
        window.grecaptcha?.reset();
      } else {
        showPopup("error", data.message || "Submission failed");
      }
    } catch (err) {
      console.error("Career form error:", err);
      showPopup("error", "Failed to submit application");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="careers"
      className="py-20 px-6 bg-gray-50 text-gray-900 scroll-mt-20 relative"
    >
      {/* Centered Popup */}
      {popup.show && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div
            className={`flex flex-col items-center gap-4 p-8 rounded-2xl shadow-2xl text-center w-[90%] max-w-md transition-all ${
              popup.type === "success"
                ? "bg-white text-green-700"
                : "bg-white text-red-700"
            }`}
          >
            {popup.type === "success" ? (
              <CheckCircle className="w-16 h-16 text-green-600" />
            ) : (
              <XCircle className="w-16 h-16 text-red-600" />
            )}
            <p className="text-lg font-semibold">{popup.message}</p>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold mb-4 text-red-700">
          Join Our Team
        </h2>
        <p className="text-lg text-gray-600 mb-12">
          Interested in being part of LUMENZA? Fill out the form below and apply
          today.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-2xl rounded-2xl p-10 max-w-3xl mx-auto space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              name="name"
              placeholder="Your Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-red-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-red-500"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Your Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-red-500"
            />
            <input
              type="text"
              name="position"
              placeholder="Position You’re Applying For"
              value={formData.position}
              onChange={handleChange}
              required
              className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-red-500"
            />
          </div>

          <input
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx"
            onChange={handleChange}
            className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-red-500"
          />

          {/* Google reCAPTCHA */}
          <div className="flex justify-center">
            <ReCAPTCHA
              sitekey="6LdW9LgrAAAAAGz7TLHCaOOWYRWAw6GDYH5XFlvt"
              onChange={handleCaptcha}
            />
          </div>

          {/* Modern Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 bg-red-600 text-white py-4 rounded-xl text-lg font-semibold shadow-lg transition-all
              ${loading ? "opacity-80 cursor-not-allowed" : "hover:bg-red-700 hover:scale-105"}
            `}
          >
            {loading ? (
              <svg
                className="w-6 h-6 animate-spin text-white"
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

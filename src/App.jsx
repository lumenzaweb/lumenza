import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./Navbar";
import HomeSection from "./HomeSection";
import AboutSection from "./AboutSection";
import ProductsSection from "./ProductsSection";
import InquirySection from "./InquirySection";
import FloatingContactButtons from "./FloatingContactButtons";
import SocialBar from "./SocialBar";
import ProductDetailsPage from "./ProductDetailsPage";
import ProductSubDetailPage from "./ProductSubDetailPage";
import CareerSection from "./CareerSection";
import Login from "./Login";
import Admin from "./Admin";
import ContactForm from "./components/ContactForm";

const scrollToSection = (id) => {
  const section = document.getElementById(id);
  if (section) section.scrollIntoView({ behavior: "smooth" });
};

const ScrollHandler = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTarget) {
      setTimeout(() => {
        scrollToSection(location.state.scrollTarget);
      }, 400); // delay for route change rendering
    }
  }, [location]);

  return children;
};

const App = () => {
  const [showQuery, setShowQuery] = React.useState(false);
  const [queryForm, setQueryForm] = React.useState({
    name: "",
    mobile: "",
    email: "",
    message: "",
  });

  const handleQueryChange = (e) => {
    setQueryForm({ ...queryForm, [e.target.name]: e.target.value });
  };

  // ✅ fixed handler name
  const handleQuerySubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...queryForm,
          formType: "query", // 👈 flag to identify this form
        }),
      });

      const data = await res.json();
      console.log("✅ Query form submitted:", data);
      alert("Query submitted successfully!");
      setShowQuery(false);
      setQueryForm({ name: "", mobile: "", email: "", message: "" }); // reset form
    } catch (err) {
      console.error("❌ Query form error:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <Router>
      <ScrollHandler>
        <Navbar />
        <FloatingContactButtons onQueryClick={() => setShowQuery(true)} />

        {showQuery && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xs relative">
              <button
                onClick={() => setShowQuery(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-red-600"
                aria-label="Close"
              >
                ✕
              </button>
              <h3 className="text-lg font-bold mb-3 text-center">
                Send Your Query
              </h3>
              {/* ✅ fixed here */}
              <form className="flex flex-col gap-2" onSubmit={handleQuerySubmit}>
                <input
                  type="text"
                  name="name"
                  value={queryForm.name}
                  onChange={handleQueryChange}
                  placeholder="Name"
                  className="p-2 border rounded"
                  required
                />
                <input
                  type="tel"
                  name="mobile"
                  value={queryForm.mobile}
                  onChange={handleQueryChange}
                  placeholder="Mobile"
                  className="p-2 border rounded"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={queryForm.email}
                  onChange={handleQueryChange}
                  placeholder="Email"
                  className="p-2 border rounded"
                  required
                />
                <textarea
                  name="message"
                  value={queryForm.message}
                  onChange={handleQueryChange}
                  placeholder="Message"
                  className="p-2 border rounded"
                  required
                />
                <button
                  type="submit"
                  className="bg-yellow-500 text-white py-2 rounded font-semibold mt-2 hover:bg-yellow-600"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}

        <Routes>
          <Route
            path="/"
            element={
              <div className="font-sans text-gray-800">
                <HomeSection />
                <AboutSection />
                <ProductsSection />
                <InquirySection />
                <SocialBar />
              </div>
            }
          />
          <Route
            path="/product/:productName"
            element={<ProductDetailsPage />}
          />
          <Route
            path="/product/:productName/:subProductSlug"
            element={<ProductSubDetailPage />}
          />
          <Route path="/career" element={<CareerSection />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/contact" element={<ContactForm />} />
        </Routes>
      </ScrollHandler>
    </Router>
  );
};

export default App;
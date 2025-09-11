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
import InquirySection from "./InquirySection";
import FloatingContactButtons from "./FloatingContactButtons";
import SocialBar from "./SocialBar";
import ProductDetailsPage from "./ProductDetailsPage";
import ProductSubDetailPage from "./ProductSubDetailPage";
import CareerSection from "./CareerSection";
import Login from "./Login";
import Admin from "./Admin";
import ContactForm from "./components/ContactForm";
import ProductsPage from "./pages/ProductsPage.jsx"; // ✅ use new page

// Helper: smooth scroll to specific section
const scrollToSection = (id) => {
  const section = document.getElementById(id);
  if (section) section.scrollIntoView({ behavior: "smooth" });
};

// Component: Handles both section scrolling and scroll-to-top
const ScrollHandler = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTarget) {
      // Smooth scroll to a specific section if requested
      setTimeout(() => {
        scrollToSection(location.state.scrollTarget);
      }, 400);
    } else {
      // Otherwise scroll smoothly to top on route change
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
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

  const handleQuerySubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://lumenza.onrender.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...queryForm,
          formType: "query",
        }),
      });
      const data = await res.json();
      console.log("✅ Query form submitted:", data);
      alert("Query submitted successfully!");
      setShowQuery(false);
      setQueryForm({ name: "", mobile: "", email: "", message: "" });
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
                <InquirySection />
                <SocialBar />
              </div>
            }
          />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:productName" element={<ProductDetailsPage />} />
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

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const SECTIONS = ["home", "about", "products", "career", "inquiry"];

const scrollToSection = (id) => {
  const section = document.getElementById(id);
  if (section) section.scrollIntoView({ behavior: "smooth" });
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (section) => {
    if (section === "products") {
      navigate("/products");
      setOpen(false); // ✅ close mobile menu
      return;
    }

    if (section === "career") {
      navigate("/career");
      setOpen(false); // ✅ close mobile menu
      return;
    }

    if (location.pathname === "/") {
      scrollToSection(section);
    } else {
      navigate("/", { state: { scrollTarget: section } });
    }
    setOpen(false); // ✅ close mobile menu
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <div
          className="w-32 md:w-40 cursor-pointer"
          onClick={() => handleNavClick("home")}
        >
          <img
            src="https://i.pinimg.com/736x/2a/bf/9e/2abf9e7f3f5dc7b2d3787cc5baa2ad69.jpg"
            alt="LUMENZA Logo"
            className="w-full object-contain"
          />
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex gap-8 font-medium">
          {SECTIONS.map((section, idx) => (
            <button
              key={idx}
              onClick={() => handleNavClick(section)}
              className="hover:text-red-600 transition-colors"
            >
              {section === "inquiry"
                ? "Contact Us"
                : section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setOpen(!open)}
            className="focus:outline-none p-2 rounded hover:bg-gray-200 transition"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div
          id="mobile-menu"
          className="md:hidden bg-white/90 backdrop-blur-md shadow-md flex flex-col gap-4 p-4 text-center"
        >
          {SECTIONS.map((section, idx) => (
            <button
              key={idx}
              onClick={() => handleNavClick(section)} // ✅ closes after click
              className="py-2 hover:text-red-600 font-medium transition-colors"
            >
              {section === "inquiry"
                ? "Contact Us"
                : section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

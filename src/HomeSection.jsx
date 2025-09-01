import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react"; // ✅ for hamburger icons

/* ---------------- Images ---------------- */
const images = [
  "https://i.pinimg.com/736x/63/e7/a0/63e7a0097f11692010d4952dc9858e23.jpg",
  "https://i.pinimg.com/736x/1c/2b/4b/1c2b4b815df08d7c7a28537e01826026.jpg",
  "https://i.pinimg.com/736x/cd/eb/8b/cdeb8bf6dc72ac7c58a4d215083672c9.jpg",
  "https://i.pinimg.com/736x/44/47/d5/4447d5bc8d8119d0f8d836745a10ef78.jpg",
];

/* ---------------- Smooth Scroll ---------------- */
function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) section.scrollIntoView({ behavior: "smooth" });
}

/* ---------------- Navbar ---------------- */
const Navbar = ({ handleNavClick }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "Products", id: "products" },
    { label: "Contact", id: "inquiry" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 bg-white shadow"
      style={{
        paddingTop: "env(safe-area-inset-top)", // ✅ notch safe
      }}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3 md:py-4">
        {/* Logo */}
        <div
          className="w-32 md:w-40 cursor-pointer"
          onClick={() => handleNavClick("home")}
        >
          <img
            src="/logo.png" // replace with your logo
            alt="Logo"
            className="w-full h-auto"
          />
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6 font-medium text-gray-700">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="hover:text-red-600 transition"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-gray-700"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden bg-white border-t border-gray-200 shadow-inner"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col px-4 py-3 space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    handleNavClick(link.id);
                    setMobileOpen(false);
                  }}
                  className="text-gray-700 font-medium text-lg hover:text-red-600 transition"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

/* ---------------- Home Section ---------------- */
const HomeSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative flex flex-col justify-center items-center text-center bg-cover bg-center overflow-hidden w-full"
      style={{
        paddingTop: "calc(4rem + env(safe-area-inset-top))", // ✅ safe for navbar + notch
        paddingBottom: "calc(5rem + env(safe-area-inset-bottom))", // ✅ safe for iOS home bar
        minHeight: "calc(100vh - 4rem)", // ✅ always visible area
      }}
    >
      {/* Background Slider */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="absolute inset-0 bg-cover bg-top md:bg-center"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('${images[current]}')`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center flex-grow px-4">
        {/* Title */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-6xl font-bold mb-3 leading-snug"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, type: "spring", stiffness: 120 }}
        >
          <span className="relative inline-block px-4 md:px-6 py-1.5">
            <span className="absolute inset-0 bg-red-600 rounded-lg -z-10 shadow-lg"></span>
            <span className="text-white tracking-wide">LUMENZA</span>
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="text-sm sm:text-base md:text-lg text-white mb-6 max-w-md sm:max-w-xl md:max-w-2xl"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.3,
            type: "spring",
            stiffness: 120,
          }}
        >
          Premium hardware solutions for your home and business – Mortise handles,
          lockers, cabinet handles, and stylish kitchen accessories.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-2 md:gap-4 w-full sm:w-auto justify-center items-center mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          <button
            className="w-full sm:w-auto px-5 py-2 md:px-6 md:py-3 bg-red-600 text-white font-semibold rounded-lg shadow-lg hover:bg-red-700 transition text-sm md:text-base"
            onClick={() => scrollToSection("products")}
          >
            Explore Products
          </button>
          <button
            className="w-full sm:w-auto px-5 py-2 md:px-6 md:py-3 bg-white border-2 border-red-600 text-red-600 font-semibold rounded-lg shadow hover:bg-red-50 transition text-sm md:text-base"
            onClick={() => scrollToSection("inquiry")}
          >
            Contact Us
          </button>
        </motion.div>
      </div>

      {/* Slider Dots */}
      <div
        className="absolute left-1/2 -translate-x-1/2 flex gap-2 md:gap-3 z-10"
        style={{
          bottom: "calc(1.5rem + env(safe-area-inset-bottom))", // ✅ safe on iOS
        }}
      >
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition transform cursor-pointer ${
              current === index ? "bg-red-600 scale-110" : "bg-white/70"
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export { Navbar, HomeSection };

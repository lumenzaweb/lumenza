import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "https://i.pinimg.com/1200x/22/4c/03/224c03712887a792fd744343e455ce1a.jpg",
  "https://i.pinimg.com/1200x/b3/45/4d/b3454d1fb84119732c7aba5dd8ecc423.jpg",
  "https://i.pinimg.com/736x/cd/eb/8b/cdeb8bf6dc72ac7c58a4d215083672c9.jpg",
  "https://i.pinimg.com/1200x/14/ed/7f/14ed7f9210ca4e0b7aeb8539fc312e5c.jpg",
];

function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) section.scrollIntoView({ behavior: "smooth" });
}

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
      className="relative flex flex-col justify-center items-center text-center bg-cover bg-center overflow-hidden
      h-[40vh] md:h-[80vh] pt-20" // ✅ smaller on mobile, navbar-safe padding
    >
      {/* Background Slider */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="absolute inset-0 bg-cover 
              bg-top md:bg-center" // ✅ top on mobile, center on desktop
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${images[current]}')`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>
      </div>

      {/* LUMENZA with red box */}
      <motion.h1
        className="relative z-10 text-4xl md:text-6xl font-bold mb-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, type: "spring", stiffness: 120 }}
      >
        <span className="relative inline-block px-4 md:px-6 py-2">
          <span className="absolute inset-0 bg-red-600 rounded-lg -z-10 shadow-lg"></span>
          <span className="text-white tracking-wide">LUMENZA</span>
        </span>
      </motion.h1>

      {/* Tagline */}
      <motion.p
        className="relative z-10 text-sm md:text-xl text-white mb-6 max-w-lg md:max-w-2xl px-3"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, type: "spring", stiffness: 120 }}
      >
        Premium hardware solutions for your home and business – Mortise handles,
        lockers, cabinet handles, and stylish kitchen accessories.
      </motion.p>

      {/* Buttons */}
      <motion.div
        className="relative z-10 flex flex-col sm:flex-row gap-4 md:gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
      >
        <button
          className="px-5 py-2 md:px-6 md:py-3 bg-red-600 text-white font-semibold rounded-lg shadow-lg hover:bg-red-700 transition text-sm md:text-base"
          onClick={() => scrollToSection("products")}
        >
          Explore Products
        </button>
        <button
          className="px-5 py-2 md:px-6 md:py-3 bg-white border-2 border-red-600 text-red-600 font-semibold rounded-lg shadow hover:bg-red-50 transition text-sm md:text-base"
          onClick={() => scrollToSection("contact us")}
        >
          Contact Us
        </button>
      </motion.div>

      {/* Slider Dots */}
      <div className="absolute bottom-4 md:bottom-6 flex gap-2 md:gap-3 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition cursor-pointer ${
              current === index ? "bg-red-600 scale-110" : "bg-white/70"
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HomeSection;

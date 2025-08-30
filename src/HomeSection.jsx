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
  className="relative h-[40vh] md:h-[80vh] flex flex-col justify-center items-center text-center bg-cover bg-center overflow-hidden"
    >
      {/* Background Slider */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${images[current]}')`,
              backgroundSize: "cover", // ✅ responsive fitting
              backgroundPosition: "center", // ✅ keeps center focus
              backgroundRepeat: "no-repeat",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>
      </div>

      {/* LUMENZA with red box behind */}
      <motion.h1
        className="relative z-10 text-4xl sm:text-5xl md:text-6xl font-bold mb-4 px-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, type: "spring", stiffness: 120 }}
      >
        <span className="relative inline-block px-4 py-2 sm:px-6">
          <span className="absolute inset-0 bg-red-600 rounded-lg -z-10 shadow-lg"></span>
          <span className="text-white tracking-wide">LUMENZA</span>
        </span>
      </motion.h1>

      {/* Tagline */}
      <motion.p
        className="relative z-10 text-base sm:text-lg md:text-xl text-white mb-8 max-w-md sm:max-w-2xl px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, type: "spring", stiffness: 120 }}
      >
        Premium hardware solutions for your home and business – Mortise handles,
        lockers, cabinet handles, and stylish kitchen accessories.
      </motion.p>

      {/* Buttons */}
      <motion.div
        className="relative z-10 flex flex-col sm:flex-row gap-4 sm:gap-6 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
      >
        <button
          className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-lg hover:bg-red-700 transition"
          onClick={() => scrollToSection("products")}
        >
          Explore Products
        </button>
        <button
          className="px-6 py-3 bg-white border-2 border-red-600 text-red-600 font-semibold rounded-lg shadow hover:bg-red-50 transition"
          onClick={() => scrollToSection("inquiry")}
        >
          Contact Us
        </button>
      </motion.div>

      {/* Slider Dots */}
      <div className="absolute bottom-6 flex gap-3 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition cursor-pointer ${
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

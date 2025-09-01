import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "https://i.pinimg.com/736x/63/e7/a0/63e7a0097f11692010d4952dc9858e23.jpg",
  "https://i.pinimg.com/736x/1c/2b/4b/1c2b4b815df08d7c7a28537e01826026.jpg",
  "https://i.pinimg.com/736x/cd/eb/8b/cdeb8bf6dc72ac7c58a4d215083672c9.jpg",
  "https://i.pinimg.com/736x/44/47/d5/4447d5bc8d8119d0f8d836745a10ef78.jpg",
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
      min-h-[420px] md:min-h-[70vh] pt-20 pb-20 px-4 sm:px-6"
      style={{
        // ✅ iOS notch safe-area support
        paddingTop: "calc(5rem + env(safe-area-inset-top))",
        paddingBottom: "calc(5rem + env(safe-area-inset-bottom))",
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

      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-col justify-center items-center flex-grow">
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
          className="text-xs sm:text-base md:text-lg text-white mb-6 max-w-md sm:max-w-xl md:max-w-2xl"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, type: "spring", stiffness: 120 }}
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
          bottom: "calc(1.5rem + env(safe-area-inset-bottom))", // ✅ safe from iOS home bar
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

export default HomeSection;

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom"; // 👈 added

const images = [
  "https://i.pinimg.com/736x/49/f5/07/49f50713f67870266ea1c8bbdecaa297.jpg",
  "https://i.pinimg.com/736x/d6/c5/fd/d6c5fd2cf71a5a4724944a1b5dc9ac60.jpg",
  "https://i.pinimg.com/736x/cd/eb/8b/cdeb8bf6dc72ac7c58a4d215083672c9.jpg",
  "https://i.pinimg.com/736x/2f/ff/29/2fff29293e9f142ff23ce47210db4fa8.jpg",
];

function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) section.scrollIntoView({ behavior: "smooth" });
}

const HomeSection = () => {
  const [current, setCurrent] = useState(0);
  const [navHeight, setNavHeight] = useState(64);
  const navRef = useRef(null);
  const navigate = useNavigate(); // 👈 initialize

  useEffect(() => {
    const nav = document.querySelector("nav");
    if (nav) setNavHeight(nav.offsetHeight);

    const handleResize = () => {
      if (nav) setNavHeight(nav.offsetHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="
        relative flex justify-center items-center text-center
        bg-cover bg-center overflow-hidden
        min-h-[420px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[700px]
        px-4 sm:px-6
      "
      style={{
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
              backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${images[current]}')`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>
      </div>

      {/* ✅ Content wrapper pushed down dynamically */}
      <div
        className="relative z-10 flex flex-col items-center"
        style={{
          marginTop: `calc(${navHeight}px + 1rem + env(safe-area-inset-top))`,
        }}
      >
        {/* LUMENZA with red box */}
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, type: "spring", stiffness: 120 }}
        >
          <span className="relative inline-block px-4 md:px-6 py-2">
            <span className="absolute inset-0 bg-red-600 rounded-lg -z-10 shadow-lg"></span>
            <span className="text-white font-semibold font-canvasans tracking-wide">LUMENZA</span>
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="text-sm md:text-xl text-white mb-6 max-w-lg md:max-w-2xl px-3"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.3,
            type: "spring",
            stiffness: 120,
          }}
        >
          Premium hardware solutions for your home and business – Mortise
          handles, lockers, cabinet handles, and stylish kitchen accessories.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-2 md:gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          <button
            className="px-5 py-2 md:px-6 md:py-3 bg-red-600 text-white font-semibold rounded-lg shadow-lg hover:bg-red-700 transition text-sm md:text-base"
            onClick={() => navigate("/products")} // 👈 now opens Products page
          >
            Explore Products
          </button>

          {/*<button
            className="px-5 py-2 md:px-6 md:py-3 bg-white border-2 border-red-600 text-red-600 font-semibold rounded-lg shadow hover:bg-red-50 transition text-sm md:text-base"
            onClick={() => scrollToSection("inquiry")}
          >
            Contact Us
          </button> */}
          
        </motion.div>
      </div>

      {/* Slider Dots */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 flex gap-2 md:gap-3 z-10"
        style={{
          bottom: "calc(1rem + env(safe-area-inset-bottom))",
        }}
      >
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

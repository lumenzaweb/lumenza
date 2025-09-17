import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const images = [
  "https://i.pinimg.com/736x/7d/9b/71/7d9b71b6567e084c47ec3816be66554e.jpg",
  "https://i.pinimg.com/736x/0c/2e/ec/0c2eec5c7726a153435749cc87705283.jpg",
  "https://i.pinimg.com/736x/d3/49/e6/d349e6117f269a274c1de24078ff49eb.jpg",
  "https://i.pinimg.com/736x/39/b7/d5/39b7d5b6f6dbc01d4dee6641176d9fc0.jpg",
];

// Animation variants for the sliding effect
const slideVariants = {
  enter: { x: "100%", opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: "-100%", opacity: 0 },
};

const HomeSection = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000); // Increased duration to 4s for a more relaxed feel
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative flex items-center bg-black overflow-hidden min-h-screen text-white"
    >
      {/* Background Slider */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence>
          <motion.div
            key={current}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.5 },
            }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${images[current]}')` }}
          />
        </AnimatePresence>
      </div>

      {/* Content Aligned to the Left */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="max-w-xl text-left">
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold"
            style={{ textShadow: '3px 3px 6px rgba(0, 0, 0, 0.5)' }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            LUMENZA
          </motion.h1>

          <motion.p
            className="mt-4 text-lg md:text-xl max-w-lg"
            style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            Premium hardware solutions for your home and business – Mortise
            handles, lockers, cabinet handles, and stylish kitchen accessories.
          </motion.p>

          <motion.div
            className="mt-8 flex gap-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            <button
              className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-lg hover:bg-red-700 transition"
              onClick={() => navigate("/products")}
            >
              Explore Products
            </button>
          </motion.div>
        </div>
      </div>

      {/* Slider Progress Bar Navigation */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 flex gap-2 md:gap-3 z-10 w-1/3 max-w-xs"
        style={{
          bottom: "calc(1rem + env(safe-area-inset-bottom))",
        }}
      >
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className="relative h-1.5 flex-1 bg-white/30 rounded-full overflow-hidden cursor-pointer"
            aria-label={`Go to slide ${index + 1}`}
          >
            {current === index && (
              <motion.div
                className="absolute top-0 left-0 h-full bg-red-600 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 4, ease: "linear" }} // Match the interval duration
              />
            )}
          </button>
        ))}
      </div>
    </section>
  );
};

export default HomeSection;

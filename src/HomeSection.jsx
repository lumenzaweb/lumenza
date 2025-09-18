import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Define your desktop and mobile images
const desktopImages = [
  "https://i.pinimg.com/736x/63/5b/df/635bdf4ebb58f352dd1cecff207de4d4.jpg",
  "https://i.pinimg.com/736x/ab/d8/88/abd888e47aeda4c565ffb733fa53facd.jpg",
  "https://i.pinimg.com/736x/cf/0d/51/cf0d513b59a8e584f1a601142fa42ee0.jpg",
  "https://i.pinimg.com/736x/cc/da/7d/ccda7d93c4785a536b25ae97e21fd406.jpg",
];

const mobileImages = [
  "https://i.pinimg.com/736x/63/5b/df/635bdf4ebb58f352dd1cecff207de4d4.jpg",
  "https://i.pinimg.com/736x/50/00/45/5000451e42fe371fc2164acaed53d471.jpg",
  "https://i.pinimg.com/736x/cf/0d/51/cf0d513b59a8e584f1a601142fa42ee0.jpg",
  "https://i.pinimg.com/736x/0a/c8/79/0ac879f158282d46ab0e9c7b91c9041d.jpg",
];

// A helper to detect screen size
function useMediaQuery(query) {
    const [matches, setMatches] = useState(false);
    useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }
        const listener = () => setMatches(media.matches);
        window.addEventListener("resize", listener);
        return () => window.removeEventListener("resize", listener);
    }, [matches, query]);
    return matches;
}

const slideVariants = {
  enter: { x: "100%", opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: "-100%", opacity: 0 },
};

const HomeSection = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const isMobile = useMediaQuery("(max-width: 768px)");
  const images = isMobile ? mobileImages : desktopImages;

  // This useEffect for the auto-slider is correct
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section
      id="home"
      className="
        relative flex justify-center items-center text-center
        bg-black overflow-hidden
        min-h-[500px] md:min-h-[600px] lg:min-h-[700px]
        pt-28 sm:pt-32 /* <-- FIX: Added padding-top to prevent overlap with navbar */
      "
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
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%), url('${images[current]}')`,
            }}
          />
        </AnimatePresence>
      </div>

      {/* Content wrapper - Removed the dynamic style that caused the glitch */}
      <div className="relative z-10 flex flex-col items-center px-4 sm:px-6">
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, type: "spring", stiffness: 120 }}
        >
          <span className="relative inline-block px-4 md:px-6 py-2">
            <span className="absolute inset-0 bg-red-600 rounded-lg -z-10 shadow-lg"></span>
            <span className="text-white font-semibold tracking-wide">LUMENZA</span>
          </span>
        </motion.h1>

        <motion.p
          className="text-sm md:text-xl text-white mb-6 max-w-lg md:max-w-2xl"
          style={{ textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.3,
            type: "spring",
            stiffness: 120,
          }}
        >
          Premium hardware solutions for your home and business.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-2 md:gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          <button
            className="px-5 py-2 md:px-6 md:py-3 bg-red-600 text-white font-semibold rounded-lg shadow-lg hover:bg-red-700 transition text-sm md:text-base"
            onClick={() => navigate("/products")}
          >
            Explore Products
          </button>
        </motion.div>
      </div>

      {/* Slider Progress Bar Navigation */}
      <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-2 md:gap-3 z-10 w-1/3 max-w-xs bottom-5">
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
                transition={{ duration: 4, ease: "linear" }}
              />
            )}
          </button>
        ))}
      </div>
    </section>
  );
};

export default HomeSection;

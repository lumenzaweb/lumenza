import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

// --- STEP 1: Define two sets of images ---

// Use your WIDE (e.g., 1920x1080) images here for desktop
const desktopImages = [
  "https://i.pinimg.com/736x/7d/9b/71/7d9b71b6567e084c47ec3816be66554e.jpg",
  "https://i.pinimg.com/736x/0c/2e/ec/0c2eec5c7726a153435749cc87705283.jpg",
  "https://i.pinimg.com/736x/d3/49/e6/d349e6117f269a274c1de24078ff49eb.jpg",
  "https://i.pinimg.com/736x/39/b7/d5/39b7d5b6f6dbc01d4dee6641176d9fc0.jpg",
];

// Use your TALL (e.g., 1080x1920) images here for mobile
const mobileImages = [
  "https://i.pinimg.com/564x/1b/30/91/1b30919763711af399558917e3ed630f.jpg", // Replace with your tall images
  "https://i.pinimg.com/564x/b8/30/03/b83003b606c107a685c285ea9b02a22f.jpg", // Replace with your tall images
  "https://i.pinimg.com/564x/e1/d7/29/e1d729c3132c569f443a5327c13abc3a.jpg", // Replace with your tall images
  "https://i.pinimg.com/564x/8d/af/2e/8daf2e12811a4392fbc4b22c83c273de.jpg", // Replace with your tall images
];

// --- STEP 2: A helper to detect screen size ---
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
  const [navHeight, setNavHeight] = useState(64);
  const navigate = useNavigate();

  // --- STEP 3: Choose the correct image array based on screen size ---
  const isMobile = useMediaQuery("(max-width: 768px)");
  const images = isMobile ? mobileImages : desktopImages;

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
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]); // useEffect depends on the length of the current image array

  return (
    <section
      id="home"
      className="
        relative flex justify-center items-center text-center
        bg-black overflow-hidden
        min-h-[500px] md:min-h-[600px] lg:min-h-[700px]
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
            className="absolute inset-0 bg-cover bg-center" // `bg-cover` now works perfectly
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%), url('${images[current]}')`,
            }}
          />
        </AnimatePresence>
      </div>

      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col items-center px-4 sm:px-6">
        {/* LUMENZA with red box */}
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

        {/* Tagline */}
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

        {/* Buttons */}
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

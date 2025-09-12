import React, { useRef, useState, useEffect } from "react";

const ProductVariants = ({ product }) => {
  const scrollRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef(null);
  
  // --- NEW: A ref to track if the carousel is currently visible on screen ---
  const isVisibleRef = useRef(false);

  // Track active card using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardRefs.current.indexOf(entry.target);
            if (index !== -1) setActiveIndex(index);
          }
        });
      },
      { root: scrollRef.current, threshold: 0.6 }
    );

    const currentCardRefs = cardRefs.current;
    currentCardRefs.forEach((card) => card && observer.observe(card));

    return () => {
      currentCardRefs.forEach((card) => card && observer.unobserve(card));
    };
  }, [product.productDetails]);

  // Scroll to a card when a dot is clicked
  const handleDotClick = (idx) => {
    cardRefs.current[idx]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  // Functions to control the auto-slide
  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startAutoSlide = () => {
    stopAutoSlide(); 
    intervalRef.current = setInterval(() => {
      const nextIndex = (cardRefs.current.length > 0 && activeIndex < cardRefs.current.length - 1) ? activeIndex + 1 : 0;
      handleDotClick(nextIndex);
    }, 2000); 
  };

  // This useEffect RESETS the timer whenever the user manually interacts (by scrolling or clicking dots)
  useEffect(() => {
    // Only restart the timer if the carousel is visible on the screen
    if (isVisibleRef.current && product.productDetails.length > 1) {
      startAutoSlide();
    }
    return () => stopAutoSlide();
  }, [activeIndex]); 

  // --- NEW: This useEffect STARTS or STOPS the auto-slide based on viewport visibility ---
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting; // Update our ref
        if (entry.isIntersecting) {
          if (product.productDetails.length > 1) {
            startAutoSlide(); // Start sliding when it becomes visible
          }
        } else {
          stopAutoSlide(); // Stop sliding when it goes out of view
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the carousel is visible
    );

    visibilityObserver.observe(container);

    return () => {
      if (container) {
        visibilityObserver.unobserve(container);
      }
      stopAutoSlide(); // Also stop on unmount
    };
  }, [product.productDetails.length]); // Re-run this setup if the number of products changes

  if (!product.productDetails || product.productDetails.length === 0) {
    return null;
  }

  return (
    <>
      <h2 className="text-2xl font-bold mt-5 mb-3 text-black">
        Available Variants & Specifications
      </h2>

      <div className="relative">
        <div
          ref={scrollRef}
          onMouseEnter={stopAutoSlide}
          onMouseLeave={() => {
            // Only resume auto-slide if the component is still visible
            if (isVisibleRef.current) {
              startAutoSlide();
            }
          }}
          className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth px-1 pb-4"
        >
          {product.productDetails.map((productDetail, idx) => (
            <div
              key={idx}
              ref={(el) => (cardRefs.current[idx] = el)}
              className="min-w-[220px] sm:min-w-[260px] p-4 bg-white rounded-lg shadow-md border border-gray-200 flex-shrink-0"
            >
              {/* Image */}
              <img
                src={productDetail.image}
                alt={productDetail.title}
                className="h-28 w-auto object-contain rounded-lg mx-auto mb-3"
              />
              {/* Title */}
              <h3 className="font-bold text-lg mb-2 text-center">
                {productDetail.title}
              </h3>
              {/* Specs */}
              <ul className="list-disc list-inside text-black space-y-1">
                {productDetail.specs.map((spec, sIdx) => (
                  <li key={sIdx} className="text-sm whitespace-nowrap">
                    {spec}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Dots navigation */}
        <div className="flex justify-center mt-2 space-x-2">
          {product.productDetails.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleDotClick(idx)}
              className={`h-2.5 w-2.5 rounded-full transition-colors ${
                activeIndex === idx ? "bg-red-500" : "bg-gray-400"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductVariants;
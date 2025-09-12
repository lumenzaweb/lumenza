import React, { useRef, useState, useEffect } from "react";

const ProductVariants = ({ product }) => {
  const scrollRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // --- NEW: A ref to hold the interval ID for auto-sliding ---
  const intervalRef = useRef(null);

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

    cardRefs.current.forEach((card) => card && observer.observe(card));

    return () => {
      cardRefs.current.forEach((card) => card && observer.unobserve(card));
    };
  }, [product.productDetails]); // Dependency added to re-observe if products change

  // Scroll to a card when a dot is clicked
  const handleDotClick = (idx) => {
    cardRefs.current[idx]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  // --- NEW: Functions to control the auto-slide ---
  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startAutoSlide = () => {
    stopAutoSlide(); // Ensure no multiple intervals are running
    intervalRef.current = setInterval(() => {
      // Calculate the next index, looping back to 0 at the end
      const nextIndex = (activeIndex + 1) % product.productDetails.length;
      handleDotClick(nextIndex);
    }, 2000); // Slide every 2 seconds (2000ms)
  };

  // --- NEW: useEffect to manage the auto-slide lifecycle ---
  useEffect(() => {
    // Only start auto-sliding if there's more than one variant
    if (product.productDetails.length > 1) {
      startAutoSlide();
    }
    // This is a cleanup function that runs when the component unmounts
    // or when the activeIndex changes, to reset the timer.
    return () => stopAutoSlide();
  }, [activeIndex, product.productDetails.length]); // Restart the timer logic when the slide changes

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
          // --- NEW: Event handlers to pause/resume on hover ---
          onMouseEnter={stopAutoSlide}
          onMouseLeave={startAutoSlide}
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
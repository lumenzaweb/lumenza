import React, { useState } from "react";

// A reusable component for each menu item for cleaner code
const ActionButton = ({ href, title, icon, bgColor, delay, isOpen }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`flex items-center justify-start w-auto transform-gpu transition-all duration-300 ease-in-out ${delay} ${
      // Ternary operator controls the open/closed animation state
      isOpen
        ? "opacity-100 scale-100 translate-x-0"
        : "opacity-0 scale-90 -translate-x-4 pointer-events-none"
    }`}
  >
    {/* Icon (now on the left) */}
    <div
      className={`w-12 h-12 flex items-center justify-center rounded-full text-white shadow-lg ${bgColor}`}
    >
      {icon}
    </div>
    {/* Text Label (now on the right) */}
    <span className="ml-4 text-sm font-medium text-gray-700 bg-white px-4 py-2 rounded-full shadow-sm whitespace-nowrap">
      {title}
    </span>
  </a>
);

const FloatingContactButtons = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Using SVG icons directly for better quality and control
  const iconStyles = "w-6 h-6";

  const contactLinks = [
    {
      href: "mailto:support@lumenza.co.in",
      title: "Email Us",
      icon: (
        <svg className={iconStyles} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
      ),
      bgColor: "bg-gray-800",
      delay: "delay-300",
    },
    {
      href: "tel:+917554422887",
      title: "Call Us",
      icon: (
        <svg className={iconStyles} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg>
      ),
      bgColor: "bg-gray-800",
      delay: "delay-200",
    },
    {
      href: "https://wa.me/+918989142281",
      title: "WhatsApp",
      icon: (
        <svg className={iconStyles} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><title>WhatsApp</title><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52s-.67-.166-.67.15c0 .316-.67 1.652-.67 1.652s-.67.766-1.339 1.064c-.67.298-1.339.223-1.339.223s-1.339-.075-1.339-.075-1.339-1.996-1.339-3.893c0-1.898 1.339-3.546 1.339-3.546s.67-.374 1.339-.374c.67 0 1.339.075 1.339.075s.67.767.67 1.652c0 .886.075 1.737.075 1.737s.075.075-.298.447c-.373.372-1.047.966-1.047.966s-.075.075.298.766c.373.691 1.047 1.652 2.39 2.893.67.67 1.339 1.064 1.339 1.064s.075-.15.298-.374c.223-.223.52-.766.52-.766s.075-.075.298-.075c.223 0 .67.298.67.298s.67.766.67 1.064c0 .298.075.373.075.373zM12 0A12 12 0 1 0 0 12 12 12 0 0 0 12 0z"/></svg>
      ),
      bgColor: "bg-gray-800",
      delay: "delay-150",
    },
    {
      href: "https://linkedin.com/in/yourprofile",
      title: "LinkedIn",
      icon: (
        <svg className={iconStyles} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><title>LinkedIn</title><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"></path></svg>
      ),
      bgColor: "bg-gray-800",
      delay: "delay-100",
    },
    {
      href: "https://instagram.com/yourprofile",
      title: "Instagram",
      icon: (
        <svg className={iconStyles} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><title>Instagram</title><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.314.935 20.644.523 19.854.228A7.228 7.228 0 0016.947.072C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.056 1.17-.25 1.805-.414 2.227a2.89 2.89 0 01-.896 1.382 2.89 2.89 0 01-1.381.896c-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.056-1.816-.25-2.236-.414a2.89 2.89 0 01-1.382-.896 2.89 2.89 0 01-.896-1.381c-.164-.42-.36-1.065-.413-2.235-.057-1.274-.07-1.649-.07-4.859 0-3.211.014-3.586.07-4.859.054-1.17.248-1.815.413-2.236.217-.562.477-.96.896-1.382.42-.419.82-.679 1.381-.896.422-.164 1.057-.36 2.227-.413 1.266-.057 1.646-.07 4.85-.07zM12 6.84c-2.849 0-5.16 2.311-5.16 5.16s2.311 5.16 5.16 5.16 5.16-2.311 5.16-5.16-2.311-5.16-5.16-5.16zm0 8.49c-1.841 0-3.33-1.489-3.33-3.33s1.489-3.33 3.33-3.33 3.33 1.489 3.33 3.33-1.489 3.33-3.33 3.33zm5.338-9.87a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4z"></path></svg>
      ),
      bgColor: "bg-gray-800",
      delay: "delay-75",
    },
  ];

  return (
    // The main container is now fixed to the bottom-left
    <div className="fixed bottom-6 left-6 z-50">
      <div className="flex flex-col items-start">
        
        {/* Container for the menu buttons */}
        <div className="flex flex-col items-start space-y-3 mb-3">
          {contactLinks.map(link => (
            <ActionButton key={link.title} {...link} isOpen={isOpen} />
          ))}
        </div>

        {/* Main toggle button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-gradient-to-br from-red-600 to-red-800 text-white rounded-full shadow-2xl flex items-center justify-center transform transition-all duration-300 hover:scale-110 hover:shadow-red-400/50 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-red-500"
          aria-label="Toggle Contact Menu"
        >
          <div className={`transform transition-transform duration-300 ease-in-out ${isOpen ? "rotate-45" : "rotate-0"}`}>
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          </div>
        </button>
      </div>
    </div>
  );
};

export default FloatingContactButtons;

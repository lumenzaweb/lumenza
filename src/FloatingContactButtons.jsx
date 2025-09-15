import React, { useState } from "react";

// A reusable component for each menu item for cleaner code
const ActionButton = ({ href, title, icon, bgColor, delay, isOpen }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`flex items-center justify-end transform transition-all duration-300 ease-in-out ${delay} ${
      isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8 pointer-events-none"
    }`}
  >
    {/* Text Label */}
    <span className="mr-4 text-sm font-medium text-gray-700 bg-white px-4 py-2 rounded-full shadow-sm whitespace-nowrap">
      {title}
    </span>
    {/* Icon */}
    <div
      className={`w-14 h-14 flex items-center justify-center rounded-full text-white shadow-lg ${bgColor}`}
    >
      <img src={icon} alt={title} className="w-7 h-7" />
    </div>
  </a>
);

const FloatingContactButtons = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end z-50">
      
      {/* Container for the menu buttons that appear on click */}
      <div className="flex flex-col items-end space-y-3 mb-4">
        <ActionButton
          href="https://instagram.com/yourprofile" // <-- EDIT YOUR INSTAGRAM LINK HERE
          title="Instagram"
          icon="https://img.icons8.com/color/48/instagram-new--v1.png"
          bgColor="bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500"
          delay="transition-delay-100"
          isOpen={isOpen}
        />
        <ActionButton
          href="https://linkedin.com/in/yourprofile" // <-- EDIT YOUR LINKEDIN LINK HERE
          title="LinkedIn"
          icon="https://img.icons8.com/color/48/linkedin.png"
          bgColor="bg-blue-700"
          delay="transition-delay-200"
          isOpen={isOpen}
        />
        <ActionButton
          href="https://wa.me/+918989142281"
          title="WhatsApp"
          icon="https://img.icons8.com/color/48/whatsapp.png"
          bgColor="bg-green-500"
          delay="transition-delay-300"
          isOpen={isOpen}
        />
        <ActionButton
          href="tel:+917554422887"
          title="Call Us"
          icon="https://img.icons8.com/color/48/phone.png"
          bgColor="bg-blue-500"
          delay="transition-delay-400"
          isOpen={isOpen}
        />
        <ActionButton
          href="mailto:support@lumenza.co.in"
          title="Email Us"
          icon="https://img.icons8.com/color/48/new-post.png"
          bgColor="bg-red-500"
          delay="transition-delay-500"
          isOpen={isOpen}
        />
      </div>

      {/* Main toggle button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-gradient-to-br from-gray-800 to-black text-white rounded-full shadow-2xl flex items-center justify-center transform transition-transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-gray-400"
        aria-label="Toggle Contact Menu"
      >
        {/* This container smoothly transitions between the two icons */}
        <div className="relative w-7 h-7">
          {/* Contact Icon (visible when closed) */}
          <svg
            className={`absolute top-0 left-0 w-full h-full transition-all duration-300 ease-in-out ${
              isOpen ? "opacity-0 scale-75 rotate-45" : "opacity-100 scale-100 rotate-0"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          {/* Close Icon (visible when open) */}
          <svg
            className={`absolute top-0 left-0 w-full h-full transition-all duration-300 ease-in-out ${
              isOpen ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-75 -rotate-45"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </button>
    </div>
  );
};

export default FloatingContactButtons;

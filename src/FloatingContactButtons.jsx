import React, { useState } from "react";

const FloatingContactButtons = ({ onQueryClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Helper component for the action buttons to reduce repetition
  const ActionButton = ({ href, onClick, title, className, iconSrc, alt, delay }) => (
    <a
      href={href}
      onClick={onClick}
      target="_blank"
      rel="noopener noreferrer"
      title={title}
      className={`transform transition-all duration-300 ${className} ${
        isOpen
          ? `opacity-100 translate-y-0 ${delay}`
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <img src={iconSrc} alt={alt} draggable={false} className="w-5 h-5" />
    </a>
  );

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-center z-50">
      
      {/* Container for the menu buttons that appear on click */}
      <div className="flex flex-col items-center space-y-3 mb-4">
        <ActionButton
          href="https://wa.me/+918989142281"
          title="Chat on WhatsApp"
          className="bg-green-500 text-white p-3 rounded-full shadow-lg"
          iconSrc="https://img.icons8.com/ios-filled/20/ffffff/whatsapp.png"
          alt="WhatsApp"
          delay="delay-100"
        />
        <ActionButton
          href="tel:+917554422887"
          title="Call Us"
          className="bg-blue-500 text-white p-3 rounded-full shadow-lg"
          iconSrc="https://img.icons8.com/ios-filled/20/ffffff/phone.png"
          alt="Call"
          delay="delay-200"
        />
        <ActionButton
          href="mailto:support@lumenza.co.in"
          title="Email Us"
          className="bg-red-500 text-white p-3 rounded-full shadow-lg"
          iconSrc="https://img.icons8.com/ios-filled/20/ffffff/new-post.png"
          alt="Email"
          delay="delay-300"
        />
        {/* The query button is special as it uses an onClick prop */}
        <button
          type="button"
          onClick={onQueryClick}
          title="Send Query"
          aria-label="Send Query"
          className={`transform transition-all duration-300 bg-yellow-500 text-white p-3 rounded-full shadow-lg ${
            isOpen
              ? `opacity-100 translate-y-0 delay-400`
              : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          <img src="https://img.icons8.com/ios-filled/20/ffffff/help.png" alt="Query" draggable={false} className="w-5 h-5" />
        </button>
      </div>

      {/* Main toggle button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gray-800 text-white rounded-full shadow-xl flex items-center justify-center transform transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
        aria-label="Toggle Contact Menu"
      >
        <svg
          className={`w-7 h-7 transition-transform duration-300 ease-in-out ${
            isOpen ? "rotate-45" : "rotate-0"
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
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </button>
    </div>
  );
};

export default FloatingContactButtons;

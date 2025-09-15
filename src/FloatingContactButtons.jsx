import React, { useState } from "react";

// This is a new, reusable component for each menu item
const MenuButton = ({
  href,
  onClick,
  title,
  icon,
  isOpen,
  positionClasses, // e.g., "bottom-20 right-0"
}) => {
  const baseStyle =
    "absolute flex items-center justify-end w-48 h-14 transform transition-all duration-500 ease-in-out";
  const closedStyle = "opacity-0 scale-75 pointer-events-none";

  return (
    <div
      className={`${baseStyle} ${isOpen ? "opacity-100 scale-100" : closedStyle} ${positionClasses}`}
    >
      <span className="mr-4 text-sm font-medium text-gray-600 bg-white px-3 py-1 rounded-full shadow-md">
        {title}
      </span>
      <a
        href={href}
        onClick={onClick}
        target="_blank"
        rel="noopener noreferrer"
        title={title}
        className="w-14 h-14 flex items-center justify-center rounded-full text-white shadow-lg bg-white"
      >
        <img src={icon} alt={title} draggable={false} className="w-7 h-7" />
      </a>
    </div>
  );
};

const FloatingContactButtons = ({ onQueryClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Container for the menu buttons */}
      <div className="relative w-14 h-14">
        <MenuButton
          href="https://wa.me/+918989142281"
          title="WhatsApp"
          icon="https://img.icons8.com/color/48/whatsapp.png"
          isOpen={isOpen}
          positionClasses="bottom-0 right-20" // Fanned out to the left
        />
        <MenuButton
          href="tel:+917554422887"
          title="Call Us"
          icon="https://img.icons8.com/color/48/phone.png"
          isOpen={isOpen}
          positionClasses="bottom-14 right-14" // Fanned out diagonally
        />
        <MenuButton
          href="mailto:support@lumenza.co.in"
          title="Email Us"
          icon="https://img.icons8.com/color/48/new-post.png"
          isOpen={isOpen}
          positionClasses="bottom-20 right-0" // Fanned out to the top
        />
        {/* The query button is special as it uses an onClick prop */}
        <div
          className={`absolute flex items-center justify-end w-48 h-14 transform transition-all duration-500 ease-in-out ${
            isOpen ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"
          } bottom-14 left-[-11.5rem]`} // Fanned out far left
        >
           <span className="mr-4 text-sm font-medium text-gray-600 bg-white px-3 py-1 rounded-full shadow-md">
            Send Query
          </span>
          <button
            type="button"
            onClick={onQueryClick}
            title="Send Query"
            className="w-14 h-14 flex items-center justify-center rounded-full text-white shadow-lg bg-white"
          >
             <img src="https://img.icons8.com/color/48/help.png" alt="Query" draggable={false} className="w-7 h-7" />
          </button>
        </div>
      </div>

      {/* Main toggle button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-gradient-to-br from-gray-800 to-black text-white rounded-full shadow-2xl flex items-center justify-center transform transition-transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-gray-400"
        aria-label="Toggle Contact Menu"
      >
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

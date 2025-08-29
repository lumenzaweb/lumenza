import React from "react";

const FloatingContactButtons = ({ onQueryClick }) => (
  <div className="fixed bottom-4 right-4 flex flex-col space-y-2 z-50">
    <a
      href="https://wa.me/+918989142281"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-green-500 text-white p-2 rounded-full shadow-lg hover:scale-110 transform transition-transform focus:outline-none focus:ring-2 focus:ring-green-400"
      title="Chat on WhatsApp"
    >
      <img
        src="https://img.icons8.com/ios-filled/20/ffffff/whatsapp.png"
        alt="WhatsApp"
        draggable={false}
      />
    </a>
    <a
      href="tel:+917554422887"
      className="bg-blue-500 text-white p-2 rounded-full shadow-lg hover:scale-110 transform transition-transform focus:outline-none focus:ring-2 focus:ring-blue-400"
      title="Call Us"
      rel="noopener noreferrer"
    >
      <img
        src="https://img.icons8.com/ios-filled/20/ffffff/phone.png"
        alt="Call"
        draggable={false}
      />
    </a>
    <a
      href="mailto:support@lumenza.co.in"
      className="bg-red-500 text-white p-2 rounded-full shadow-lg hover:scale-110 transform transition-transform focus:outline-none focus:ring-2 focus:ring-red-400"
      title="Email Us"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src="https://img.icons8.com/ios-filled/20/ffffff/new-post.png"
        alt="Email"
        draggable={false}
      />
    </a>
    <button
      type="button"
      onClick={onQueryClick}
      className="bg-yellow-500 text-white p-2 rounded-full shadow-lg hover:scale-110 transform transition-transform focus:outline-none focus:ring-2 focus:ring-yellow-400"
      title="Send Query"
      aria-label="Send Query"
    >
      <img
        src="https://img.icons8.com/ios-filled/20/ffffff/help.png"
        alt="Query"
        draggable={false}
      />
    </button>
  </div>
);

export default FloatingContactButtons;

import React from "react";

// A simple helper function to smoothly scroll to the top of the page
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const SocialBar = () => (
  <section className="bg-white py-6 px-4 sm:px-6 border-t border-gray-200">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      
      {/* Left Column: Brand, Contact, and Timings */}
      <div className="text-center md:text-left">
        <h3 className="inline-block bg-red-600 text-white text-2xl font-bold px-4 py-1 rounded-md shadow-sm">
          LUMENZA
        </h3>
        <div className="flex justify-center md:justify-start items-center space-x-4 mt-4 text-sm">
          <a
            href="mailto:support@lumenza.co.in"
            className="flex items-center text-gray-600 hover:text-red-600 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
            Email Us
          </a>
          <span className="text-gray-300">|</span>
          <a
            href="tel:+917554422887"
            className="flex items-center text-gray-600 hover:text-red-600 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg>
            Call Us
          </a>
        </div>
        <div className="flex items-center justify-center md:justify-start text-sm text-gray-600 mt-2">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span>Mon - Sat: 10:00 AM - 7:00 PM</span>
        </div>
      </div>

      {/* Right Column: Back to Top & Copyright */}
      <div className="flex flex-col items-center md:items-end gap-4">
        <button
          onClick={scrollToTop}
          className="px-4 py-2 bg-gray-100 text-gray-700 font-semibold text-sm rounded-lg shadow-sm hover:bg-gray-200 transition flex items-center"
          aria-label="Scroll to top"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 11l7-7 7 7M5 19l7-7 7 7"></path></svg>
          Back to Top
        </button>
        <p className="text-gray-500 text-xs text-center md:text-right select-none">
          &copy; {new Date().getFullYear()} LUMENZA. All Rights Reserved.
        </p>
      </div>
    </div>
  </section>
);

export default SocialBar;

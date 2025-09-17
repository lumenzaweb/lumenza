import React from "react";

// A simple helper function to smoothly scroll to the top of the page
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const SocialBar = () => (
  <section className="bg-white py-8 px-4 sm:px-6 border-t border-gray-200">
    {/* Main container is now a single centered column on all screen sizes */}
    <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-5">
      
      {/* "LUMENZA" text in a red box */}
      <h3 className="inline-block bg-red-600 text-white text-2xl font-bold px-4 py-1 rounded-md shadow-sm">
        LUMENZA
      </h3>
      
      {/* Contact Info */}
      <div className="flex justify-center items-center space-x-4 text-sm">
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

      {/* Office Timings */}
      <div className="flex items-center text-sm text-gray-600">
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <span>Mon - Sat: 10:00 AM - 7:00 PM</span>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="px-4 py-2 bg-red-600 text-white font-semibold text-sm rounded-lg shadow-md hover:bg-red-700 transition flex items-center"
        aria-label="Scroll to top"
      >
        Back to Top
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7"></path></svg>
      </button>
      
      {/* Copyright */}
      <p className="text-gray-500 text-xs select-none">
        &copy; {new Date().getFullYear()} LUMENZA. All Rights Reserved.
      </p>

    </div>
  </section>
);

export default SocialBar;

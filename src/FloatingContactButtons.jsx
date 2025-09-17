import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Reusable component for each menu item
const ActionButton = ({ href, title, icon, bgColor }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    // Flex container is aligned to the right
    className="flex items-center justify-end w-auto"
    variants={{
      open: { opacity: 1, y: 0, x: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
      closed: { opacity: 0, y: 10, x: 10, transition: { duration: 0.2 } },
    }}
  >
    {/* Label is now on the left */}
    <span className="mr-4 text-sm font-medium text-gray-700 bg-white px-4 py-2 rounded-full shadow-sm whitespace-nowrap">
      {title}
    </span>
    {/* Icon is now on the right */}
    <div className={`w-12 h-12 flex items-center justify-center rounded-full text-white shadow-lg ${bgColor}`}>
      {icon}
    </div>
  </motion.a>
);

const FloatingContactButtons = () => {
  const [isOpen, setIsOpen] = useState(false);
  const iconStyles = "w-6 h-6";

  const contactLinks = [
    { href: "mailto:support@lumenza.co.in", title: "Email Us", icon: ( <svg className={iconStyles} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg> ), bgColor: "bg-gray-800" },
    { href: "tel:+917554422887", title: "Call Us", icon: ( <svg className={iconStyles} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg> ), bgColor: "bg-gray-800" },
    { href: "https://wa.me/+918989142281", title: "WhatsApp", icon: ( <svg className={iconStyles} fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/></svg> ), bgColor: "bg-gray-800" },
    { href: "https://linkedin.com/in/yourprofile", title: "LinkedIn", icon: ( <svg className={iconStyles} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><title>LinkedIn</title><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"></path></svg> ), bgColor: "bg-gray-800" },
    { href: "https://instagram.com/yourprofile", title: "Instagram", icon: ( <svg className={iconStyles} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><title>Instagram</title><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.314.935 20.644.523 19.854.228A7.228 7.228 0 0016.947.072C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.056 1.17-.25 1.805-.414 2.227a2.89 2.89 0 01-.896 1.382 2.89 2.89 0 01-1.381.896c-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.056-1.816-.25-2.236-.414a2.89 2.89 0 01-1.382-.896 2.89 2.89 0 01-.896-1.381c-.164-.42-.36-1.065-.413-2.235-.057-1.274-.07-1.649-.07-4.859 0-3.211.014-3.586.07-4.859.054-1.17.248-1.815.413-2.236.217-.562.477-.96.896-1.382.42-.419.82-.679 1.381-.896.422-.164 1.057-.36 2.227-.413 1.266-.057 1.646-.07 4.85-.07zM12 6.84c-2.849 0-5.16 2.311-5.16 5.16s2.311 5.16 5.16 5.16 5.16-2.311 5.16-5.16-2.311-5.16-5.16-5.16zm0 8.49c-1.841 0-3.33-1.489-3.33-3.33s1.489-3.33 3.33-3.33 3.33 1.489 3.33 3.33-1.489 3.33-3.33 3.33zm5.338-9.87a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4z"></path></svg> ), bgColor: "bg-gray-800" },
  ].sort((a, b) => b.title.localeCompare(a.title)); // Sort reversed for right-side animation

  const menuVariants = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 }
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
  };

  return (
    // The main container is now fixed to the bottom-right
    <div className="fixed bottom-6 right-6 z-50">
      <div className="flex flex-col items-end">
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="flex flex-col items-end space-y-3 mb-3"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {contactLinks.map((link) => (
                <ActionButton key={link.title} {...link} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 text-white rounded-full shadow-2xl flex items-center justify-center transform transition-all duration-300 hover:scale-110 hover:shadow-red-400/50 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-red-500"
          aria-label="Toggle Contact Menu"
        >
          <div className="relative w-6 h-6">
            <svg
              className={`absolute top-0 left-0 w-full h-full transition-all duration-300 ease-in-out ${
                isOpen ? "opacity-0 scale-75 rotate-45" : "opacity-100 scale-100 rotate-0"
              }`}
              fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
            
            <svg
              className={`absolute top-0 left-0 w-full h-full transition-all duration-300 ease-in-out ${
                isOpen ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-75 -rotate-45"
              }`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"></path></svg>
          </div>
        </button>
      </div>
    </div>
  );
};

export default FloatingContactButtons;

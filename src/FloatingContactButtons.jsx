import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FloatingContactButtons = () => {
  const [isOpen, setIsOpen] = useState(false);
  const iconStyles = "w-6 h-6";

  // Data for the contact links, now with gradient classes
  const contactLinks = [
    {
      href: "https://wa.me/+918989142281",
      title: "WhatsApp",
      icon: ( <svg className={iconStyles} fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/></svg> ),
      bgColor: "bg-gradient-to-br from-green-500 to-emerald-500",
    },
    {
      href: "tel:+917554422887",
      title: "Call Us",
      icon: ( <svg className={iconStyles} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg> ),
      bgColor: "bg-gradient-to-br from-sky-500 to-blue-500",
    },
    {
      href: "mailto:support@lumenza.co.in",
      title: "Email Us",
      icon: ( <svg className={iconStyles} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg> ),
      bgColor: "bg-gradient-to-br from-gray-700 to-gray-900",
    },
    {
      href: "https://instagram.com/_lumenza_/",
      title: "Instagram",
      icon: ( <svg className={iconStyles} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><title>Instagram</title><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.314.935 20.644.523 19.854.228A7.228 7.228 0 0016.947.072C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.056 1.17-.25 1.805-.414 2.227a2.89 2.89 0 01-.896 1.382 2.89 2.89 0 01-1.381.896c-.42.164-1.065.36-2.235.413-1.274.057-1.649-.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.056-1.816-.25-2.236-.414a2.89 2.89 0 01-1.382-.896 2.89 2.89 0 01-.896-1.381c-.164-.42-.36-1.065-.413-2.235-.057-1.274-.07-1.649-.07-4.859 0-3.211.014-3.586.07-4.859.054-1.17.248-1.815.413-2.236.217-.562.477-.96.896-1.382.42-.419.82-.679 1.381-.896.422-.164 1.057-.36 2.227-.413 1.266-.057 1.646-.07 4.85-.07zM12 6.84c-2.849 0-5.16 2.311-5.16 5.16s2.311 5.16 5.16 5.16 5.16-2.311 5.16-5.16-2.311-5.16-5.16-5.16zm0 8.49c-1.841 0-3.33-1.489-3.33-3.33s1.489-3.33 3.33-3.33 3.33 1.489 3.33 3.33-1.489 3.33-3.33 3.33zm5.338-9.87a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4z"></path></svg> ),
      bgColor: "bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500",
    },
  ];

  const menuVariants = {
    open: {
      transition: { staggerChildren: 0.1, delayChildren: 0.2, staggerDirection: 1 }
    },
    closed: {
      transition: { staggerChildren: 0.1, staggerDirection: -1 }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.div
        layout
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-3 p-2 rounded-full shadow-2xl cursor-pointer ${
          isOpen ? "bg-white/80 backdrop-blur-sm" : "bg-gradient-to-br from-red-600 to-red-800"
        }`}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="flex items-center gap-3"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {contactLinks.map((link) => (
                <motion.a
                  key={link.title}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 flex items-center justify-center rounded-full text-white shadow-lg ${link.bgColor}`}
                  variants={{
                    open: { opacity: 1, scale: 1 },
                    closed: { opacity: 0, scale: 0.5 },
                  }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.button
          className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 text-white rounded-full flex items-center justify-center"
          aria-label="Toggle Contact Menu"
          whileHover={{ scale: 1.1 }}
        >
          <div className={`transform transition-transform duration-300 ease-in-out ${isOpen ? "rotate-45" : "rotate-0"}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          </div>
        </motion.button> {/* 👈 THIS TAG WAS MISSING */}

      </motion.div>
    </div>
  );
};

export default FloatingContactButtons;

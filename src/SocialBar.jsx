import React from "react";

const socialLinks = [
  {
    href: "https://facebook.com",
    title: "Facebook",
    img: "https://img.icons8.com/fluency/48/fa314a/facebook-new.png",
  },
  
  {
    href: "https://linkedin.com",
    title: "LinkedIn",
    img: "https://img.icons8.com/fluency/48/fa314a/linkedin.png",
  },
  {
    href: "https://instagram.com/_lumenza_/",
    title: "Instagram",
    img: "https://img.icons8.com/fluency/48/fa314a/instagram-new.png",
  },
  {
    href: "https://wa.me/+918989142281",
    title: "WhatsApp",
    img: "https://img.icons8.com/fluency/48/fa314a/whatsapp.png",
  },
];

const SocialBar = () => (
  <section className="bg-white py-8 px-6 border-t border-gray-300">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      
      {/* Follow us text and icons */}
      <div className="flex flex-col items-center md:flex-row md:items-center gap-4 md:gap-6 w-full md:w-auto text-center md:text-left">
        <span className="text-lg font-semibold text-red-600 select-none">
          Follow us on
        </span>
        <div className="flex flex-wrap justify-center md:justify-start gap-4">
          {socialLinks.map(({ href, title, img }) => (
            <a
              key={title}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              title={title}
              className="rounded-lg shadow-md p-1 transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              <img
                src={img}
                alt={title}
                className="w-11 h-11 md:w-9 md:h-9 object-contain" // bigger on mobile, normal on desktop
                loading="lazy"
                draggable={false}
              />
            </a>
          ))}
        </div>
      </div>

      {/* Divider on mobile */}
      <div className="w-full h-px bg-gray-300 md:hidden" />

      {/* Copyright */}
      <p className="text-gray-700 text-xs md:text-sm text-center md:text-right select-none w-full md:w-auto">
        &copy; {new Date().getFullYear()} LUMENZA. All Rights Reserved.
      </p>
    </div>
  </section>
);

export default SocialBar;
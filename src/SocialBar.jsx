import React from "react";

const socialLinks = [
  {
    href: "https://facebook.com",
    title: "Facebook",
    img: "https://img.icons8.com/fluency/48/fa314a/facebook-new.png",
  },
  {
    href: "https://twitter.com",
    title: "Twitter",
    img: "https://img.icons8.com/fluency/48/fa314a/twitter.png",
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
    href: "https://youtube.com",
    title: "YouTube",
    img: "https://img.icons8.com/fluency/48/fa314a/youtube-play.png",
  },
  {
    href: "https://wa.me/+918989142281",
    title: "WhatsApp",
    img: "https://img.icons8.com/fluency/48/fa314a/whatsapp.png",
  },
];

const SocialBar = () => (
  <section className="bg-white py-12 px-6 border-t border-gray-300">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      {/* Follow us text and icons */}
      <div className="flex items-center gap-6">
        <span className="text-lg font-semibold text-red-600 select-none">
          Follow us on
        </span>
        <div className="flex gap-5">
          {socialLinks.map(({ href, title, img }) => (
            <a
              key={title}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              title={title}
              className="rounded-lg shadow-lg p-1 transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              <img
                src={img}
                alt={title}
                className="w-9 h-9 object-contain"
                loading="lazy"
                draggable={false}
              />
            </a>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <p className="text-gray-700 text-sm select-none">
        &copy; {new Date().getFullYear()} LUMENZA. All Rights Reserved.
      </p>
    </div>
  </section>
);

export default SocialBar;
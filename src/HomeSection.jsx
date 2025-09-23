import React, { useState, useEffect } from "react";

const desktopImage = "https://i.pinimg.com/736x/a1/92/d7/a192d7bcc2315d7047d57fe68d109fb8.jpg";

const HomeSectionTest = () => {
  return (
    <section 
      id="home" 
      className="relative flex justify-center items-center text-center bg-black overflow-hidden min-h-[500px] md:min-h-[600px] lg:min-h-[700px] pt-28 sm:pt-32"
    >
      {/* --- Simplified Background --- */}
      <div className="absolute inset-0 z-0">
        <img
          src={desktopImage}
          alt="Test background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%)",
          }}
        />
      </div>

      {/* --- Simplified Content --- */}
      <div className="relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-white">LUMENZA</h1>
      </div>
    </section>
  );
};

export default HomeSectionTest;
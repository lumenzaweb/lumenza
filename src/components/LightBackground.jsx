import React from "react";

const LightBackground = () => (
  <div
    className="absolute inset-0 z-0 h-full w-full bg-white"
    style={{
      backgroundImage: `
        radial-gradient(circle at 25px 25px, #fde8e8 2%, transparent 0%),
        radial-gradient(circle at 75px 75px, #fde8e8 2%, transparent 0%)`,
      backgroundSize: '100px 100px',
    }}
  >
    <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white"></div>
  </div>
);

export default LightBackground;
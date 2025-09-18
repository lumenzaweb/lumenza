import React from "react";

const GridBackground = () => (
  <div className="absolute inset-0 z-0 h-full w-full bg-black bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
    {/* This creates a subtle dot grid pattern */}
    <div className="absolute inset-0 z-10 bg-gradient-to-b from-black via-black/80 to-black"></div>
  </div>
);

export default GridBackground;
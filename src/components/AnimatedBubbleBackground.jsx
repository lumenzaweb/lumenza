import React from "react";

const AnimatedBubbleBackground = () => {
  const bubbles = Array.from({ length: 15 });
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {bubbles.map((_, index) => {
        const size = `${Math.random() * 200 + 50}px`;
        const style = {
          width: size,
          height: size,
          left: `${Math.random() * 100}%`,
          animationDuration: `${Math.random() * 15 + 10}s`,
          animationDelay: `${Math.random() * 5}s`,
        };
        return <div key={index} className="absolute bottom-[-250px] bg-red-500/20 rounded-full bubble" style={style}></div>;
      })}
    </div>
  );
};
export default AnimatedBubbleBackground;
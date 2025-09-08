import React, { useEffect, useState } from "react";
import "./celebration.css"; // 👈 we'll create this CSS file

const Celebration = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 4000); // auto hide after 4s
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fireworks-container">
      <div className="firework"></div>
      <div className="firework"></div>
      <div className="firework"></div>
    </div>
  );
};

export default Celebration;

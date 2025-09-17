import React from "react";
import { motion } from "framer-motion";

const AnimatedGeometricBackground = () => (
  <div className="absolute inset-0 z-0 overflow-hidden">
    {/* Large blurred shapes */}
    <div className="absolute -top-40 -left-40 w-96 h-96 bg-red-500/10 rounded-full filter blur-3xl opacity-50"></div>
    <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-red-400/10 rounded-full filter blur-3xl opacity-50"></div>

    {/* Slowly floating smaller shapes */}
    <motion.div
      className="absolute top-[10%] left-[20%] w-24 h-24 border-2 border-red-500/20 rounded-full"
      animate={{ y: [0, 20, 0], rotate: [0, 10, 0] }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute bottom-[15%] right-[25%] w-16 h-16 border-t-2 border-l-2 border-red-500/20"
      animate={{ y: [0, -30, 0], rotate: [0, -20, 0] }}
      transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
    />
     <motion.div
      className="absolute bottom-[40%] left-[5%] w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[34px] border-b-red-500/10"
      animate={{ y: [0, -25, 0], rotate: [0, 30, 0] }}
      transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
);

export default AnimatedGeometricBackground;
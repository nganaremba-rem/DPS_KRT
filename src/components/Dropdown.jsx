import { motion } from "framer-motion";
import React from "react";

const Dropdown = ({ position, children }) => {
  switch (position) {
    case "left":
      position = "left-0";
      break;
    case "right":
      position = "right-0";
      break;
    default:
      position = "right-0";
  }

  return (
    <motion.div
      animate={{
        scale: 1,
        opacity: 1,
        transition: { duration: 0.2 },
      }}
      onMouseDown={(e) => e.preventDefault()}
      initial={{ opacity: 0, scale: 0.95 }}
      exit={{ opacity: 0, scale: 0 }}
      className={`absolute w-[70vw] md:w-min top-full ${position} select-none  max-h-96 overflow-y-auto text-gray-700 py-2 px-4 bg-white drop-shadow-lg rounded-xl z-20`}
    >
      {children}
    </motion.div>
  );
};

export default Dropdown;

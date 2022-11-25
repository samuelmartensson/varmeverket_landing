import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";

const SpaceCard = ({ number, header, subHeader, info, capacity, area }) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onTouchEnd={() => setIsHover((s) => !s)}
      style={{ aspectRatio: "9 / 11" }}
      className="py-4 px-6 relative w-full h-full spaceCardAnimation border border-white/70 grid place-items-center cursor-pointer"
    >
      <span className="text-xs absolute top-2 left-2">{number}</span>
      <div className="text-center mt-4 font-GtAmericaExtended">
        <AnimatePresence mode="wait">
          {isHover ? (
            <motion.div
              key="1"
              transition={{ duration: 0.2 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mb-8"
            >
              <h2 className="text-md sm:text-2xl">{capacity}</h2>
              <p className="text-md sm:text-2xl mt-2">{area}</p>
            </motion.div>
          ) : (
            <motion.div
              key="2"
              transition={{ duration: 0.2 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mb-8"
            >
              <h2 className="md:text-7xl text-5xl font-bold">{header}</h2>
              <p className="absolute md:bottom-7 bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-md md:text-xl">
                {subHeader}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-xs md:text-sm absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap">
          {info}
        </p>
      </div>
    </div>
  );
};

export default SpaceCard;

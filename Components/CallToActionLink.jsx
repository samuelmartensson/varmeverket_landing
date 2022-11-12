import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useModalContext } from "./ModalContextProvider";

const boxVariant = {
  visible: {
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.05,
    },
  },
};

const listVariant = {
  hidden: {
    y: 40,
    scaleY: 0.2,
    opacity: 0,
  },
  visible: {
    y: 0,
    scaleY: 1,
    opacity: 1,
  },
};

const lineVariant = {
  hidden: {
    width: 0,
  },
  visible: {
    width: "100%",
  },
};

const CallToActionLink = ({ href, text }) => {
  const { setIsOpen } = useModalContext();

  return (
    <div className="inline-block mt-5 md:mt-10">
      <a
        className="cursor-pointer font-bold sm:text-2xl xl:text-5xl text-2xl"
        onClick={() => setIsOpen(true)}
      >
        <motion.div
          className="inline-block"
          variants={boxVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
        >
          {text.split(" ").map((word, index) => {
            return (
              <motion.div
                key={word}
                className="inline-block mr-3"
                style={{
                  marginRight: text.split(" ").length - 1 === index ? 0 : 12,
                }}
                transition={{ duration: 0.25 }}
                variants={listVariant}
              >
                {word}
              </motion.div>
            );
          })}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            variants={lineVariant}
            transition={{ delay: 0.5, duration: 4, type: "tween" }}
            className="h-0.5 bg-white"
          />
        </motion.div>
      </a>
    </div>
  );
};

export default CallToActionLink;

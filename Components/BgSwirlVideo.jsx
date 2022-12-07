import React, { useRef, useState } from "react";
import { useWindowSize } from "../hooks/useWindowSize";
import { motion } from "framer-motion";

const BgSwirlVideo = ({ source }) => {
  const { width } = useWindowSize();
  const ref = useRef();

  if (width < 1024) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.5 }}
        alt=""
        className="image-bg"
        src="https://a.storyblok.com/f/183192/1181x1161/55ce2d7686/vv-bg.jpg"
      />
    );
  }

  return (
    <motion.video
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.5 }}
      ref={ref}
      className="video-bg"
      autoPlay
      muted
      loop
      id="video"
    >
      <source src={source} type="video/mp4" />
    </motion.video>
  );
};

export default BgSwirlVideo;

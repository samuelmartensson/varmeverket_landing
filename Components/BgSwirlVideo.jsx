import React, { useEffect, useRef } from "react";
import { useWindowSize } from "../hooks/useWindowSize";

const BgSwirlVideo = ({ source }) => {
  const { width } = useWindowSize();
  const ref = useRef();

  if (width < 1024) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        alt=""
        className="image-bg"
        src="https://a.storyblok.com/f/183192/1181x1161/55ce2d7686/vv-bg.jpg"
      />
    );
  }

  return (
    <video ref={ref} className="video-bg" autoPlay muted loop id="video">
      <source src={source} type="video/mp4" />
    </video>
  );
};

export default BgSwirlVideo;

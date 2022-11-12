import React, { useEffect, useRef } from "react";

const BgSwirlVideo = ({ source }) => {
  const ref = useRef();

  useEffect(() => {
    ref.current?.play();
  }, []);

  return (
    <video ref={ref} className="video-bg" autoPlay muted loop id="video">
      <source src={source} type="video/mp4" />
    </video>
  );
};

export default BgSwirlVideo;

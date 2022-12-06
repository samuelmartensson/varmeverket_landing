/* eslint-disable @next/next/no-img-element */
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

const VideoSlide = ({
  src = "",
  preload,
  isMuted,
  setIsMuted,
  isCurrentVertical,
  isCurrentHorizontal,
  setIsSomethingPlaying,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const videoRef = useRef();

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  useEffect(() => {
    if (!isCurrentVertical || !isCurrentHorizontal) {
      videoRef.current.pause();
    }

    if (isCurrentHorizontal && isCurrentVertical) {
      videoRef.current.currentTime = 0;
    }
  }, [isCurrentVertical, isCurrentHorizontal]);

  return (
    <motion.div
      onViewportLeave={() => {
        const video = videoRef.current;
        if (video) {
          video.pause();
        }
      }}
      className="h-full w-full relative cursor-pointer"
    >
      <div
        onClick={(event) => {
          event.stopPropagation();
          setIsMuted((s) => !s);
        }}
        className="absolute left-2 bottom-1 z-20 cursor-pointer pointer-events-auto"
      >
        {isMuted ? (
          <img
            className="h-4 mb-1"
            alt="mute"
            src="/Images/thumbnail_mute.png"
          />
        ) : (
          <img
            className="h-4 mb-1"
            alt="unmute"
            src="/Images/thumbnail_unmute.png"
          />
        )}
      </div>
      <AnimatePresence>
        {isPaused && (
          <motion.div
            onClick={handlePlayPause}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute pointer-events-auto text-5xl z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <img
              style={{ filter: "invert(1)" }}
              className="h-16"
              alt="play"
              src="/Images/play.png"
            />
          </motion.div>
        )}
      </AnimatePresence>
      {!isLoaded && (
        <div className="absolute inset-0 grid place-items-center">
          <div className="grid place-items-center">
            <img
              key={src}
              style={{ filter: "invert(1)" }}
              className="cursor-pointer md:h-16 h-10 "
              src="/Images/logo.gif"
              alt="värmeverket"
            />
            <div>Loading video...</div>
          </div>
        </div>
      )}
      <video
        onLoadedData={() => setIsLoaded(true)}
        onClick={handlePlayPause}
        onPause={() => {
          setIsPaused(true);
          setIsSomethingPlaying(false);
        }}
        onPlay={() => {
          setIsPaused(false);
          setIsSomethingPlaying(true);
        }}
        preload={preload ? "auto" : "none"}
        ref={videoRef}
        playsInline
        className="w-full h-full object-cover"
        style={{
          pointerEvents: isPaused ? "none" : "auto",
        }}
        muted
        loop
      >
        <source src={src} />
      </video>
    </motion.div>
  );
};

export default VideoSlide;

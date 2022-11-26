import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useWindowSize } from "../hooks/useWindowSize";

function isProbablyImage(url) {
  return url.match(/\.(jpeg|jpg|gif|png)$/) !== null;
}

const VerticalScrollItem = ({ srcList, index, currentIndex }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [cancelScroll, setCancelScroll] = useState(true);
  const containerRef = useRef();
  const size = useWindowSize();
  const videoRef = useRef();
  const { scrollY } = useScroll({
    container: containerRef,
  });
  const height = size.width >= 1024 ? 384 : 288;
  const transform = useTransform(
    scrollY,
    [0, height * (srcList.length - 1)],
    [0, -height * (srcList.length - 1)]
  );
  const physics = { damping: 15, mass: 0.5, stiffness: 65 };
  const spring = useSpring(transform, physics);

  useEffect(() => {
    const callback = () => {
      if (!cancelScroll && index === currentIndex) {
        const scrollYPos = Math.abs(scrollY.get());
        const slide = Math.floor(Math.abs((scrollYPos - 1) / (height / 2)) + 1);
        const value = slide > srcList.length - 1 ? 0 : height * slide;
        containerRef.current?.scrollTo(0, value);
      }
    };
    const clear = setInterval(callback, 5000);

    return () => {
      clearInterval(clear);
    };
  }, [scrollY, height, cancelScroll, srcList.length, currentIndex, index]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      if (index === currentIndex) {
        video.currentTime = 0;
        video.play();
        video.muted = false;
        setIsMuted(false);
      } else {
        video.pause();
        video.muted = true;
        setIsMuted(true);
      }
    }
  }, [index, currentIndex]);

  return (
    <div
      style={{
        transitionProperty: "left",
        transitionDuration: "1200ms",
        transitionTimingFunction: "cubic-bezier(0.65, 0, 0.35, 1)",
        left: `${index * 100 - currentIndex * 100}%`,
      }}
      className="absolute top-0 w-full h-full"
    >
      <div
        style={{ height, scrollSnapType: "y mandatory" }}
        ref={containerRef}
        className="relative overflow-y-scroll z-10"
        onClick={() => {
          const video = videoRef.current;
          if (video?.paused) {
            video.play();
          } else if (video) {
            video.muted = !video.muted;
            setIsMuted(video.muted);
          }
        }}
        onTouchStart={() => {
          setCancelScroll(true);
        }}
        onTouchEnd={() => {
          setCancelScroll(false);
          document.body.style = "";
        }}
        onMouseEnter={() => {
          if (srcList.length > 1) {
            document.body.style = "overflow: hidden";
          }
          setCancelScroll(true);
        }}
        onMouseLeave={() => {
          document.body.style = "";
          setCancelScroll(false);
        }}
      >
        <div
          style={{
            height: height * srcList.length,
          }}
        >
          {srcList.map((_, index) => (
            <div key={index} style={{ height, scrollSnapAlign: "center" }} />
          ))}
        </div>
      </div>
      <motion.div
        onViewportEnter={() => {
          if (videoRef.current && index === currentIndex) {
            videoRef.current.play();
            videoRef.current.muted = false;
            setIsMuted(false);
          }
          setCancelScroll(false);
        }}
        onViewportLeave={() => {
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.pause();
          }
          setCancelScroll(true);
        }}
        key={index}
        className="absolute top-0 w-full h-full"
        style={{
          y: spring,
        }}
      >
        {videoRef.current && (
          <div className="absolute left-2 bottom-1 text-xs">
            Sound: {!isMuted ? "on" : "off"}
          </div>
        )}
        {srcList.map((src, index) => {
          return (
            <div className="w-full h-full bg-gray-800" key={index}>
              {isProbablyImage(src) ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="w-full h-full object-cover"
                    src={src}
                    alt=""
                  />
                </>
              ) : (
                <video
                  ref={videoRef}
                  playsInline
                  className="w-full h-full object-cover"
                  muted
                  loop
                >
                  <source src={src} />
                </video>
              )}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

const HeaderImageNextPrev = ({
  classNameTextDiv,
  prevText,
  nextText,
  header1,
  header2,
  setItem,
  items,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = useCallback(() => {
    setCurrentIndex((s) => (s === items.length - 1 ? 0 : s + 1));
    setItem((s) => ({
      ...s,
      index: s.index === s.maxLength ? 0 : s.index + 1,
    }));
  }, [setItem, items]);

  const previous = () => {
    setCurrentIndex((s) => (s === 0 ? items.length - 1 : s - 1));
    setItem((s) => ({
      ...s,
      index: s.index === 0 ? s.maxLength : s.index - 1,
    }));
  };

  return (
    <>
      <h2 className={classNameTextDiv + " z-10"}>
        <div className="text-3xl lg:text-5xl font-GTAmericaExpandedRegular">
          {header1}
        </div>
        <div className="text-3xl lg:text-5xl font-semibold font-GtAmericaExpandedBlack">
          {header2}
        </div>
      </h2>
      <div>
        <div className="relative h-72 lg:h-96 overflow-hidden">
          {items.map((item, index) => {
            return (
              <VerticalScrollItem
                srcList={item.srcList}
                key={index}
                {...{ currentIndex, index }}
              />
            );
          })}
        </div>
        <div className="flex justify-between mt-3">
          <button
            type="button"
            onClick={() => {
              previous();
            }}
          >
            {prevText}
          </button>
          <button
            type="button"
            onClick={() => {
              next();
            }}
          >
            {nextText}
          </button>
        </div>
      </div>
    </>
  );
};

export default HeaderImageNextPrev;

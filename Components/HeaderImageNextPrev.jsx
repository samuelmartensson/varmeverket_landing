import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useWindowSize } from "../hooks/useWindowSize";

function isProbablyImage(url) {
  return url.match(/\.(jpeg|jpg|gif|png)$/) !== null;
}

const VerticalScrollItem = ({ srcList, index, currentIndex }) => {
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
    if (videoRef.current) {
      if (index === currentIndex) {
        videoRef.current.currentTime = 0;
        videoRef.current?.play();
      } else {
        videoRef.current?.pause();
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
        onViewportEnter={() => setCancelScroll(false)}
        onViewportLeave={() => setCancelScroll(true)}
        key={index}
        className="absolute top-0 w-full h-full"
        style={{
          y: spring,
        }}
      >
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
                  autoPlay
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
      <div className={classNameTextDiv + " mb-4 z-10"}>
        <h1 className="text-3xl lg:text-5xl font-GTAmericaExpandedRegular">
          {header1}
        </h1>
        <h1 className="text-3xl lg:text-5xl font-semibold font-GtAmericaExpandedBlack">
          {header2}
        </h1>
      </div>
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

/* eslint-disable @next/next/no-img-element */
import { useRef, useState, useEffect, useCallback } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useWindowSize } from "../hooks/useWindowSize";
import VideoSlide from "./VideoSlide";

function isProbablyImage(url) {
  return url.match(/\.(jpeg|jpg|gif|png|webp)$/) !== null;
}

const VerticalScrollItem = ({
  srcList,
  index,
  currentIndex,
  preload,
  isMuted,
  setIsMuted,
}) => {
  const [isSomethingPlaying, setIsSomethingPlaying] = useState(false);
  const [cancelScroll, setCancelScroll] = useState(true);
  const containerRef = useRef();
  const size = useWindowSize();
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
  console.log(srcList, cancelScroll);
  useEffect(() => {
    const callback = () => {
      if (!cancelScroll && index === currentIndex && !isSomethingPlaying) {
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
  }, [
    scrollY,
    height,
    cancelScroll,
    isSomethingPlaying,
    srcList.length,
    currentIndex,
    index,
  ]);

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
      <AnimatePresence>
        {!cancelScroll && !isSomethingPlaying && srcList.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            style={{ filter: "invert(1)" }}
            onClick={() => {
              setIsMuted((s) => !s);
            }}
            className="pointer-events-none absolute bottom-4 flex justify-center left-0 right-0 z-20 cursor-pointer"
          >
            <img
              style={{ filter: "invert(1)" }}
              className="h-12"
              alt="play"
              src="/Images/thumbnail_scroll.png"
            />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        style={{ height, scrollSnapType: "y mandatory" }}
        ref={containerRef}
        className="relative overflow-y-scroll"
        onViewportEnter={() => {
          setCancelScroll(false);
        }}
        onViewportLeave={() => {
          setCancelScroll(true);
        }}
        onTouchStart={() => {
          setCancelScroll(true);
        }}
        onTouchEnd={() => {
          setTimeout(() => {
            setCancelScroll(false);
          }, 2000);
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
      </motion.div>
      <motion.div
        style={{
          y: spring,
        }}
        key={index}
        className="absolute top-0 w-full h-full pointer-events-none"
      >
        {srcList.map((src, srcIndex) => {
          return (
            <div className="w-full h-full bg-gray-800" key={srcIndex}>
              {isProbablyImage(src) ? (
                <img className="w-full h-full object-cover" src={src} alt="" />
              ) : (
                <VideoSlide
                  {...{
                    src,
                    preload,
                    isMuted,
                    setIsMuted,
                    setIsSomethingPlaying,
                  }}
                  isCurrentHorizontal={index === currentIndex}
                  isCurrentVertical={
                    Math.round((scrollY.get() + 1) / (srcIndex * height)) ===
                    srcIndex
                  }
                />
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
  const [isMuted, setIsMuted] = useState(false);

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
        <motion.div
          onViewportLeave={() => {
            setIsMuted(true);
          }}
          className="relative h-72 lg:h-96 overflow-hidden"
        >
          {items.map((item, index) => {
            return (
              <VerticalScrollItem
                preload={index === currentIndex}
                srcList={item.srcList}
                key={index}
                {...{ currentIndex, index, isMuted, setIsMuted }}
              />
            );
          })}
        </motion.div>
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

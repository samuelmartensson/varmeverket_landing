import { useScroll, motion, useTransform, useSpring } from "framer-motion";
import { useLottie, useLottieInteractivity } from "lottie-react";
import { useEffect, useRef, useState } from "react";

const LottieAnimation = ({ title }) => {
  const [animationData, setAnimationData] = useState();
  const lottieObj = useLottie({
    animationData: animationData,
    reversed: true,
    style: {
      width: "90vw",
      maxWidth: 1100,
      margin: "auto",
    },
  });

  const Animation = useLottieInteractivity({
    lottieObj,
    mode: "scroll",
    actions: [
      {
        visibility: [0.1, 0.6],
        type: "seek",
        frames: [0, 25],
      },
    ],
  });
  const ref = useRef();
  const { scrollYProgress: scrollYFade } = useScroll({
    target: ref,
    offset: ["end start", "start end"],
  });
  const transformFade = useTransform(
    scrollYFade,
    [0, 0.35, 0.5, 0.65, 1],
    [0, 1, 1, 1, 0]
  );
  const scrollFade = useSpring(transformFade, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      <div
        ref={ref}
        className="relative w-full grid grid-cols-1 justify-center py-24"
      >
        <motion.div
          onViewportEnter={() => {
            if (!animationData) {
              import("../public/Images/varmeverket_lottie.json").then(
                (data) => {
                  setAnimationData(data);
                }
              );
            }
          }}
          className="absolute w-full pointer-events-none"
          style={{
            top: "-100%",
            height: "300vh",
            opacity: scrollFade,
            background:
              "linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 1) 80%, rgba(255,255,255,0) 100%)",
          }}
        />
        <div className="relative z-10 max-w-7xl w-full px-6 m-auto">
          <h1 className="mb-32 md:mb-40 text-3xl lg:text-6xl">
            <div className="leading-tight">{title?.thin}</div>
            <div>
              <span className="font-normal leading-tight">{title?.thin2}</span>
              <span className="font-bold leading-tight">{title?.bold}</span>
            </div>
          </h1>
          {animationData ? Animation : "Loading blueprint..."}
        </div>
      </div>
    </>
  );
};

export default LottieAnimation;

import { useScroll, motion, useTransform, useSpring } from "framer-motion";
import { useLottie, useLottieInteractivity } from "lottie-react";
import { useRef } from "react";
import animation from "../public/Images/varmeverket_lottie.json";

const LottieAnimation = () => {
  const lottieObj = useLottie({
    animationData: animation,
    style: {
      width: "90vw",
      maxWidth: 1280,
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
        className="relative w-full min-h-[75vh] grid grid-cols-1 justify-center py-24"
      >
        <motion.div
          className="absolute w-full"
          style={{
            top: "-65%",
            height: "200vh",
            opacity: scrollFade,
            background:
              "linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 1) 80%, rgba(255,255,255,0) 100%)",
          }}
        />
        <div className="relative z-10 max-w-7xl w-full px-6 m-auto">
          <h1 className="mb-20 text-3xl lg:text-6xl">
            <div className="leading-tight">THIS.IS.</div>
            <div>
              <span className="font-normal leading-tight">VÄRME</span>
              <span className="font-bold leading-tight">VERKET.</span>
            </div>
          </h1>
          {Animation}
        </div>
      </div>
    </>
  );
};

export default LottieAnimation;

import React, { useEffect, useRef, useState } from "react";
import CallToActionLink from "./CallToActionLink";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const textClass = "text-stone-500 text-opacity-80 whitespace-nowrap";
const textClassAbs =
  "absolute overflow-hidden whitespace-nowrap top-0 bottom-0 left-0";

const ExplainingText = ({ rows, prompt, cta = "", href }) => {
  const containerRef = useRef();
  const [scrollY, setScrollY] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["end end", "start start"],
  });
  const transform = useTransform(
    scrollYProgress,
    [0.1, 0.75],
    [0, 100 * (rows.length + 1)]
  );

  const scroll = useSpring(transform, {
    stiffness: 100,
    damping: 20,
  });

  useEffect(() => {
    return scroll.onChange((latest) => {
      setScrollY(latest);
    });
  }, [scroll]);

  return (
    <div ref={containerRef} className="flex justify-center">
      <div className="flex justify-center items-center">
        <div className="font-GtAmerica">
          <h1 className="xl:text-6xl md:text-4xl text-[22px]">
            {rows?.map((row, index) => (
              <div key={index} className="relative">
                <div
                  style={{
                    maxWidth: Math.max(scrollY - 100 * index, 0) + "%",
                    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  className={textClassAbs}
                >
                  {row.text}
                </div>
                <div className={textClass}>{row.text}</div>
              </div>
            ))}
          </h1>
          {prompt && (
            <h1 className="xl:text-6xl md:text-4xl text-[22px] lg:text-center md:mt-20 mt-12 relative">
              <div
                style={{
                  maxWidth: Math.max(scrollY - 100 * rows.length, 0) + "%",
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                className={textClassAbs}
              >
                {prompt.left}
                <span className="font-bold">{prompt.right}</span>
              </div>
              <div className={textClass}>
                {prompt.left}
                <span className="font-bold">{prompt.right}</span>
              </div>
            </h1>
          )}
          <div className="flex justify-center">
            <CallToActionLink href={href} text={cta} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplainingText;

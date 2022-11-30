import React, { useEffect, useRef, useState } from "react";

const INTERVAL = 1200;

const HeroText = ({
  rotatingWordList,
  rightText,
  disableSeparator = false,
}) => {
  const [offset, setOffset] = useState(0);
  const [reset, setReset] = useState(false);
  const textRef = useRef();

  useEffect(() => {
    let count = 0;
    const callback = () => {
      if (count / 2 === rotatingWordList.length) {
        count = 0;
        setReset(true);
      } else if (count === 0) {
        setReset(false);
        count += 2;
      } else {
        setReset(false);
        count += 1;
      }

      if (count % 2 === 0 || count === 1) {
        setOffset(
          textRef.current?.getBoundingClientRect().height * (count / 2)
        );
      }
    };

    setInterval(callback, INTERVAL / 2);

    return () => {
      setOffset(0);
      clearInterval(callback);
    };
  }, [rotatingWordList.length]);

  return (
    <div className="flex w-full items-center justify-center h-screen">
      <div className="flex max-h-8 md:max-h-12 xl:max-h-16 2xl:max-h-20 sm:text-3xl md:text-5xl xl:text-6xl 2xl:text-7xl text-xl">
        <span
          className="block font-GTAmericaExpandedRegular overflow-hidden text-right"
          style={{
            height: textRef.current?.getBoundingClientRect().height,
            transitionDuration: reset ? "0ms" : `${INTERVAL - 200}ms`,
          }}
        >
          {[...rotatingWordList, rotatingWordList[0]].map((item, index) => (
            <div
              ref={textRef}
              style={{
                transform: `translateY(-${offset}px)`,
                transitionDuration: "inherit",
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              key={index}
            >
              {item.toUpperCase()}
            </div>
          ))}
        </span>
        {!disableSeparator && (
          <div className="font-GTAmericaExpandedRegular">.</div>
        )}
        <span className="font-GtAmericaExpandedBlack whitespace-nowrap">
          {rightText}
        </span>
      </div>
    </div>
  );
};

export default HeroText;

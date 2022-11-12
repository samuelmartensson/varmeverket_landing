import React, { useEffect, useRef, useState } from "react";

const HeroText = ({
  rotatingWordList,
  rightText,
  disableSeparator = false,
}) => {
  const [offset, setOffset] = useState(0);
  const textRef = useRef();

  useEffect(() => {
    let count = 1;
    const callback = () => {
      setOffset(textRef.current?.getBoundingClientRect().height * count);

      if (count === rotatingWordList.length - 1) {
        count = 0;
      } else {
        count += 1;
      }
    };

    setInterval(callback, 1500);

    return () => {
      clearInterval(callback);
    };
  }, [rotatingWordList.length]);

  return (
    <div className="flex w-full items-center justify-center h-screen">
      <div className="flex max-h-8 md:max-h-12 xl:max-h-16 2xl:max-h-20 sm:text-3xl md:text-5xl xl:text-6xl 2xl:text-7xl text-xl">
        <span className="block font-GTAmericaExpandedRegular overflow-hidden text-right">
          {rotatingWordList.map((item) => (
            <div
              ref={textRef}
              style={{
                transform: `translateY(-${offset}px)`,
                transitionDuration: "1300ms",
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              key={item}
            >
              {item.toUpperCase()}
            </div>
          ))}
        </span>
        {!disableSeparator && <div>.</div>}
        <span className="font-GtAmericaExpandedBlack whitespace-nowrap">
          {rightText}.
        </span>
      </div>
    </div>
  );
};

export default HeroText;

import React, { useLayoutEffect, useRef, useState } from "react";
import { useModalContext } from "./ModalContextProvider";

const ScrollingText = ({ text }) => {
  const ref = useRef();
  const { setIsOpen } = useModalContext();
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    setWidth(ref.current?.textContent.length - 1);
  }, [text]);

  return (
    <div className="font-GtAmericaExtended max-w-full font-bold scale-150 md:scale-100">
      <div className="inline-block relative w-screen overflow-hidden whitespace-nowrap">
        <div className="flex justify-center ">
          <button
            onClick={() => setIsOpen(true)}
            ref={ref}
            className="cursor-pointer underline px-4 md:text-7xl text-2xl"
          >
            {text}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScrollingText;

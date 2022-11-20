import React, { useLayoutEffect, useRef, useState } from "react";
import { useModalContext } from "./ModalContextProvider";

const ScrollingText = ({ text }) => {
  const ref = useRef();
  const { setIsOpen } = useModalContext();
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    const length = ref.current?.textContent.length;
    if (length < 9) {
      setWidth(ref.current?.textContent.length - 2);
    } else if (length < 14) {
      setWidth(ref.current?.textContent.length - 1);
    } else if (length < 30) {
      setWidth(ref.current?.textContent.length + 1);
    } else {
      setWidth(ref.current?.textContent.length + 5);
    }
  }, [text]);

  return (
    <div className="font-GtAmericaExtended max-w-full font-bold">
      <div className="inline-block relative w-screen overflow-hidden whitespace-nowrap">
        <div onClick={() => setIsOpen(true)} className="scroll-container">
          <span
            style={{ fontSize: 100 / (width / 2) + "vw" }}
            ref={ref}
            className="cursor-pointer"
          >
            - {text} -
          </span>
          <span
            style={{ fontSize: 100 / (width / 2) + "vw" }}
            className="cursor-pointer"
          >
            - {text} -
          </span>
        </div>
      </div>
    </div>
  );
};

export default ScrollingText;

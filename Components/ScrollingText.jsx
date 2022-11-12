import React from "react";
import { useModalContext } from "./ModalContextProvider";

const ScrollingText = ({ text }) => {
  const { setIsOpen } = useModalContext();

  return (
    <div className="font-GtAmericaExtended max-w-full font-bold">
      <div className="inline-block relative w-screen overflow-hidden whitespace-nowrap">
        <p onClick={() => setIsOpen(true)} className="scroll-container">
          <span className="cursor-pointer">
            - {text} - {text} -
          </span>
          <span className="cursor-pointer">
            - {text} - {text} -
          </span>
        </p>
      </div>
    </div>
  );
};

export default ScrollingText;

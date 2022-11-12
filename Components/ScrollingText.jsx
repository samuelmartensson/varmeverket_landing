import React from "react";
import { useModalContext } from "./ModalContextProvider";

const ScrollingText = ({ text }) => {
  const { setIsOpen } = useModalContext();

  return (
    <div className="max-w-full overflow-hidden font-bold text-6xl lg:text-[5vw]">
      <a
        onClick={() => setIsOpen(true)}
        className="cursor-pointer relative block h-32 whitespace-nowrap"
      >
        <p className="marquee">
          <span className="block">
            {text}_-_{text}_-_{text}_-_{text}_-_
          </span>
        </p>
        <p className="marquee marquee2">
          <span className="block">
            {text}_-_{text}_-_{text}_-_{text}_-_
          </span>
        </p>
      </a>
    </div>
  );
};

export default ScrollingText;

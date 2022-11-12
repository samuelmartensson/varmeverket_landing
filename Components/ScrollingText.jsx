import React from "react";
import { useModalContext } from "./ModalContextProvider";

const ScrollingText = ({ text }) => {
  const { setIsOpen } = useModalContext();

  return (
    <div className="max-w-full overflow-hidden font-bold text-6xl lg:text-[5vw]">
      <div className=" relative block h-screen max-h-64 whitespace-nowrap">
        <p onClick={() => setIsOpen(true)} className="marquee">
          <span className="block cursor-pointer">
            {text}_-_{text}_-_{text}_-_{text}_-_
          </span>
        </p>
        <p onClick={() => setIsOpen(true)} className="marquee marquee2">
          <span className="block cursor-pointer">
            {text}_-_{text}_-_{text}_-_{text}_-_
          </span>
        </p>
      </div>
    </div>
  );
};

export default ScrollingText;

import React from "react";

const HeaderAndText = ({ text1, text2, text3 }) => {
  return (
    <>
      <div className="lg:text-6xl text-4xl mb-4 font-GtAmericaCompressed">
        <span className="font-thin">{text1}</span>
        <span className="font-bold">{text2}</span>
      </div>
      <p className="font-GtAmericaMono text-xs sm:text-base w-3/5">{text3}</p>
    </>
  );
};

export default HeaderAndText;

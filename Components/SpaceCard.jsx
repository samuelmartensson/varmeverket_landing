import React from "react";

const SpaceCard = ({ number, header, subHeader, info }) => {
  return (
    <div
      style={{ aspectRatio: "9 / 11" }}
      className="p-4 relative w-full h-full spaceCardAnimation border border-white/60 grid place-items-center cursor-pointer"
    >
      <span className="text-xs absolute top-2 left-2 ">{number}</span>
      <div className="text-center mt-4">
        <h2 className="md:text-6xl text-5xl font-semibold">{header}</h2>
        <p className="text-md md:text-xl mt-2">{subHeader}</p>
        <p className="text-xs md:text-base font-thin md:mt-4 mt-2">{info}</p>
      </div>
    </div>
  );
};

export default SpaceCard;

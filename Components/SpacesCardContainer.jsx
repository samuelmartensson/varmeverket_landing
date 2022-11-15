import React from "react";
import SpaceCard from "./SpaceCard";

const SpacesCardContainer = ({ data }) => {
  return (
    <div className="mb-20">
      <div
        id="spaces"
        className="flex flex-col mb-10 scroll-mt-20 text-3xl lg:text-6xl"
      >
        <span className="leading-tight">OUR.</span>
        <span className="font-bold leading-tight">SPACES.</span>
      </div>
      <div className="w-full grid 2xl:grid-cols-5 xl:grid-cols-5 lg:grid-cols-5 gap-4 md:grid-cols-4 sm:grid-cols-3 grid-cols-2">
        {data.map((item, index) => (
          <SpaceCard
            key={index}
            number={`#${String(index + 1).padStart(3, "0")}`}
            {...item}
          />
        ))}
      </div>
    </div>
  );
};

export default SpacesCardContainer;

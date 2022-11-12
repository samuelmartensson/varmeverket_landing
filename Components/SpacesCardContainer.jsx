import React from "react";
import SpaceCard from "./SpaceCard";

const data = [
  {
    header: "Mu",
    subHeader: "Musikverket",
    info: "Music",
  },
  {
    header: "Ti",
    subHeader: "Tillverket",
    info: "Prototyping",
  },
  {
    header: "Pc",
    subHeader: "Panncentralen",
    info: "Space",
  },
  {
    header: "Co",
    subHeader: "Co",
    info: "Title? Work? What?",
  },
  {
    header: "Kv",
    subHeader: "Kosntverket",
    info: "Atelier",
  },
  {
    header: "Un",
    subHeader: "Underverket",
    info: "Space",
  },
  {
    header: "Po",
    subHeader: "Poddverket",
    info: "Podcast",
  },
  {
    header: "Da",
    subHeader: "Dansverket",
    info: "Dance",
  },
  {
    header: "Mv",
    subHeader: "Mästerverket",
    info: "Film",
  },
  {
    header: "Bv",
    subHeader: "Bildverket",
    info: "Photo",
  },
];

const SpacesCardContainer = () => {
  return (
    <div className="mb-20">
      <div id="spaces" className="flex flex-col mb-10 scroll-mt-20">
        <span className="text-4xl">OUR.</span>
        <span className="text-4xl font-bold">SPACES.</span>
      </div>
      <div className="w-full grid 2xl:grid-cols-5 xl:grid-cols-5 lg:grid-cols-5 gap-4 md:grid-cols-2 grid-cols-2">
        {data.map((item, index) => (
          <SpaceCard
            key={index}
            number={`#${String(index).padStart(3, "0")}`}
            {...item}
          />
        ))}
      </div>
    </div>
  );
};

export default SpacesCardContainer;

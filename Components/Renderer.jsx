import React from "react";
import Constilation from "./Constilation";
import ExplainingText from "./ExplainingText";
import HeroText from "./HeroText";
import NoSSR from "./NoSSR";
import ScrollingText from "./ScrollingText";
import Spaces from "./Spaces";
import dynamic from "next/dynamic";

const LottieAnimation = dynamic(() =>
  import("./LottieAnimation").then((mod) => mod.default)
);

const layoutClass =
  "min-h-[65vh] grid items-center p-6 m-auto max-w-7xl z-30 relative";

const Renderer = (props) => {
  const { component } = props;

  if (component === "HeroText") {
    return (
      <div>
        <HeroText
          rotatingWordList={props?.rotatingWordList}
          rightText={props?.staticText}
          disableSeparator={props?.disableSeparator}
        />
      </div>
    );
  }

  if (component === "ExplainingText") {
    return (
      <div className={layoutClass}>
        <ExplainingText
          rows={props?.rows}
          prompt={{ left: props?.left, right: props?.right }}
          cta={props?.cta}
          href={props?.href}
        />
      </div>
    );
  }

  if (component === "Animation") {
    return (
      <div className="min-h-screen">
        <LottieAnimation
          title={{
            thin: props?.title_row1,
            thin2: props?.title_row2_thin,
            bold: props?.title_row2_bold,
          }}
        />
      </div>
    );
  }

  if (component === "Showcase") {
    return (
      <div id={props?.scrollId} className={layoutClass}>
        <Constilation
          imageHeader1={props?.headerThin}
          imageHeader2={props?.headerThick}
          callToActionHref={props?.href}
          callToActionText={props?.callToActionText}
          items={props?.items}
        />
      </div>
    );
  }

  if (component === "ScrollingText") {
    return (
      <div className="py-[20vh] overflow-x-hidden">
        <NoSSR>
          <ScrollingText text={props?.text} />
        </NoSSR>
      </div>
    );
  }

  if (component === "Spaces") {
    return (
      <div className={layoutClass}>
        <Spaces
          data={props?.spaces}
          title={{ thin: props?.title_row1, bold: props?.title_row2 }}
        />
      </div>
    );
  }

  return null;
};

export default Renderer;

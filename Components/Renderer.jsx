import React from "react";
import Constilation from "./Constilation";
import ExplainingText from "./ExplainingText";
import HeroText from "./HeroText";
import ScrollingText from "./ScrollingText";
import SpacesCardContainer from "./SpacesCardContainer";

const layoutClass = "p-6 m-auto max-w-7xl z-40 relative";

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
      <div className={layoutClass + " mb-40"}>
        <ExplainingText
          rows={props?.rows}
          prompt={{ left: props?.left, right: props?.right }}
          cta={props?.cta}
        />
      </div>
    );
  }

  if (component === "Showcase") {
    return (
      <div id={props?.scrollId} className={layoutClass + " mb-20"}>
        <Constilation
          imageHeader1={props?.headerThin}
          imageHeader2={props?.headerThick}
          callToActionHref="/"
          callToActionText={props?.callToActionText}
          items={props?.items}
        />
      </div>
    );
  }

  if (component === "ScrollingText") {
    return (
      <div className="py-20">
        <ScrollingText text={props?.text} />
      </div>
    );
  }

  if (component === "Spaces") {
    return (
      <div className={layoutClass + " pt-20"}>
        <SpacesCardContainer data={props.spaces} />
      </div>
    );
  }

  return null;
};

export default Renderer;

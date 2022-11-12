import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeaderAndText from "../Components/HeaderAndText";
import CallToActionLink from "./CallToActionLink";
import HeaderImageNextPrev from "./HeaderImageNextPrev";
import { useWindowSize } from "../hooks/useWindowSize";

function FullSize({
  callToActionHrf,
  callToActionText,
  srcList,
  headerText1,
  headerText2,
  textParagraph,
  imageHeader1,
  imageHeader2,
  setItem,
  items,
}) {
  return (
    <div className="mt-20">
      <div className="grid grid-cols-2">
        <div className="mt-28">
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{
                duration: 0.6,
                easings: [0.65, 0, 0.35, 1],
              }}
              key={headerText1}
            >
              <HeaderAndText
                text1={headerText1}
                text2={headerText2}
                text3={textParagraph}
              />

              <CallToActionLink
                href={callToActionHrf}
                text={callToActionText}
              />
            </motion.div>
          </AnimatePresence>
        </div>
        <div>
          <HeaderImageNextPrev
            items={items}
            srcList={srcList}
            alt="image"
            prevText="&#60;/PREVIOUS"
            nextText="NEXT/&#62;"
            prevHref="/"
            nextHref="/"
            imageWidth="450"
            classNameTextDiv="relative translate-y-1/2 -translate-x-24"
            header1={imageHeader1}
            header2={imageHeader2}
            setItem={setItem}
          />
        </div>
      </div>
    </div>
  );
}

function Mobile({
  callToActionHrf,
  callToActionText,
  srcList,
  headerText1,
  headerText2,
  textParagraph,
  imageHeader1,
  imageHeader2,
  setItem,
  items,
}) {
  return (
    <div className="flex flex-col justify-center">
      <div className="flex lg:flex-row flex-col">
        <HeaderImageNextPrev
          items={items}
          srcList={srcList}
          alt="image"
          prevText="&#60;/PREVIOUS"
          nextText="NEXT/&#62;"
          prevHref="/"
          nextHref="/"
          imageWidth="450"
          header1={imageHeader1}
          header2={imageHeader2}
          setItem={setItem}
        />
      </div>
      <div className="mt-8 flex flex-col">
        <HeaderAndText
          text1={headerText1}
          text2={headerText2}
          text3={textParagraph}
        />
        <CallToActionLink href={callToActionHrf} text={callToActionText} />
      </div>
    </div>
  );
}

export default function Constilation(props) {
  const size = useWindowSize();

  return (
    <div>
      {size.width > 1000 ? <FullSize {...props} /> : <Mobile {...props} />}
    </div>
  );
}

import { useState } from "react";
import Footer from "../Components/Footer";
import HeroText from "../Components/HeroText";
import NavBar from "../Components/NavBar";
import Constilation from "../Components/Constilation";
import ScrollingText from "../Components/ScrollingText";
import BgSwirlVideo from "../Components/BgSwirlVideo";
import ExplainingText from "../Components/ExplainingText";
import SpacesCardContainer from "../Components/SpacesCardContainer";
import Modal from "../Components/Modal";
import { useModalContext } from "../Components/ModalContextProvider";
import { AnimatePresence, motion } from "framer-motion";

const layoutClass = "p-6 m-auto max-w-7xl";

export const getServerSideProps = async (context) => {
  const data = await fetch(context.req.headers.referer + "/api/data").then(
    (r) => r.json()
  );

  return {
    props: {
      data,
    },
  };
};

export default function Home({ data }) {
  const {
    rotatingText1,
    rotatingText2,
    paragraph1,
    paragraph2,
    scrollingText,
    showCase1,
    showCase2,
    showCase3,
    navbarData,
    footerData,
  } = data;
  const { isOpen } = useModalContext();

  const [currentData1, setCurrentData1] = useState({
    maxLength: showCase1.items.length - 1,
    index: 0,
  });
  const [currentData2, setCurrentData2] = useState({
    maxLength: showCase2.items.length - 1,
    index: 0,
  });
  const [currentData3, setCurrentData3] = useState({
    maxLength: showCase3.items.length - 1,
    index: 0,
  });

  return (
    <>
      <BgSwirlVideo source="https://hypermedia.varmeverket.com/73_at_24s.mp4" />
      <NavBar data={navbarData} />
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Modal />
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <main>
              <div>
                <HeroText
                  rotatingWordList={rotatingText1.rotatingWordList}
                  rightText={rotatingText1.staticText}
                />
              </div>
              <div className={layoutClass + " mb-40"}>
                <ExplainingText
                  rows={paragraph1.rows}
                  prompt={paragraph1.prompt}
                  cta={paragraph1.cta}
                />
              </div>
              <div className={layoutClass} id="community">
                <Constilation
                  imageHeader1={showCase1.headerThin}
                  imageHeader2={showCase1.headerThick}
                  callToActionHref="/"
                  callToActionText={showCase1.callToActionText}
                  setItem={setCurrentData1}
                  items={showCase1.items}
                  {...showCase1.items[currentData1.index]}
                />
              </div>
              <HeroText
                rotatingWordList={rotatingText2.rotatingWordList}
                rightText={rotatingText2.staticText}
              />
              <div className={layoutClass + " mb-40"}>
                <ExplainingText
                  rows={paragraph2.rows}
                  prompt={paragraph2.prompt}
                  cta={paragraph2.cta}
                />
              </div>
              <div className={layoutClass + " mb-40"}>
                <Constilation
                  imageHeader1={showCase2.headerThin}
                  imageHeader2={showCase2.headerThick}
                  callToActionHref="/"
                  callToActionText={showCase2.callToActionText}
                  setItem={setCurrentData2}
                  items={showCase2.items}
                  {...showCase2.items[currentData2.index]}
                />
                <div className="mt-20">
                  <SpacesCardContainer />
                </div>
              </div>
              <ScrollingText text={scrollingText} />
              <div className={layoutClass + " mb-40 z-40 relative"}>
                <Constilation
                  imageHeader1={showCase3.headerThin}
                  imageHeader2={showCase3.headerThick}
                  callToActionHref="/"
                  callToActionText={showCase3.callToActionText}
                  setItem={setCurrentData3}
                  items={showCase3.items}
                  {...showCase3.items[currentData3.index]}
                />
              </div>
            </main>
            <Footer data={footerData} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

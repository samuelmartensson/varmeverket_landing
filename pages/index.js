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
import { getStoryblokApi } from "@storyblok/react";
import Renderer from "../Components/Renderer";

const layoutClass = "p-6 m-auto max-w-7xl";

export const getServerSideProps = async () => {
  const storyblokApi = getStoryblokApi();
  let slug = "home";
  let sbParams = {
    version: "published",
  };
  let { data: sbData } = await storyblokApi.get(
    `cdn/stories/${slug}`,
    sbParams
  );

  const footerData = sbData.story.content.body.find(
    (item) => item.component === "Footer"
  );

  return {
    props: {
      components: sbData.story.content.body,
      navbarData: sbData.story.content.body.find(
        (item) => item.component === "Navbar"
      ),
      footerData: {
        ...footerData,
        officeRows: footerData.officeRows.map((item) => item.text),
      },
    },
  };
};

export default function Home({ navbarData, footerData, components }) {
  const { isOpen } = useModalContext();

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
              {components.map((item) => (
                <Renderer key={item._uid} {...item} />
              ))}
            </main>
            <Footer data={footerData} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

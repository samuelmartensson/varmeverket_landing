import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";
import BgSwirlVideo from "../Components/BgSwirlVideo";
import Modal from "../Components/Modal";
import { getStoryblokApi } from "@storyblok/react";
import Renderer from "../Components/Renderer";
import { motion } from "framer-motion";
import Head from "next/head";
import { useEffect } from "react";

export const getServerSideProps = async (context) => {
  const storyblokApi = getStoryblokApi();
  let slug = "home";
  let sbParams = {
    version: "published",
  };
  let { data: sbData } = await storyblokApi.get(
    `cdn/stories/${slug}`,
    sbParams
  );

  const componentMap = Object.fromEntries(
    sbData.story.content.body.map((item) => [item.component, item])
  );

  const footerData = sbData.story.content.body.find(
    (item) => item.component === "Footer"
  );

  return {
    props: {
      components: sbData.story.content.body,
      modalData: componentMap["Modal"],
      navbarData: componentMap["Navbar"],
      footerData: {
        ...footerData,
        officeRows: footerData.officeRows.map((item) => item.text),
      },
    },
  };
};

export default function Home({
  navbarData,
  modalData,
  footerData,
  components,
}) {
  const fadeVariant = {
    hidden: {
      y: 40,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  useEffect(() => {
    document.body.classList.add("landing-country-selector");

    return () => {
      document.body.classList.remove("landing-country-selector");
    };
  }, []);

  return (
    <>
      <Head>
        <title>Värmeverket</title>
      </Head>
      <BgSwirlVideo source="https://hypermedia.varmeverket.com/73_at_24s.mp4" />
      <NavBar data={navbarData} />
      <Modal data={modalData} />
      <main>
        {components.map((item) => (
          <motion.div
            key={item._uid}
            className="relative z-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-35% 0px -35% 0px" }}
            variants={fadeVariant}
            transition={{
              delay: 0.2,
              type: "spring",
              bounce: 0,
              stiffness: 90,
              damping: 35,
            }}
          >
            <Renderer {...item} />
          </motion.div>
        ))}
      </main>
      <Footer data={footerData} />
    </>
  );
}

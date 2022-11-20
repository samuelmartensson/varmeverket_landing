import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";
import BgSwirlVideo from "../Components/BgSwirlVideo";
import Modal from "../Components/Modal";
import { getStoryblokApi } from "@storyblok/react";
import Renderer from "../Components/Renderer";

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
  return (
    <>
      <BgSwirlVideo source="https://hypermedia.varmeverket.com/73_at_24s.mp4" />
      <NavBar data={navbarData} />
      <Modal />
      <main>
        {components.map((item) => (
          <Renderer key={item._uid} {...item} />
        ))}
      </main>
      <Footer data={footerData} />
    </>
  );
}

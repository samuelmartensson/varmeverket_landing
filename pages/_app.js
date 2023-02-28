import { storyblokInit, apiPlugin } from "@storyblok/react";
import { useRouter } from "next/router";
import ModalContextProvider from "../Components/ModalContextProvider";
import "../styles/globals.scss";

storyblokInit({
  accessToken: "LT4ExTZZO2fHJZdwsVpNAAtt",
  use: [apiPlugin],
  apiOptions: {
    cache: {
      clear: "auto",
      type: "none",
    },
  },
});

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <ModalContextProvider>
      <Component {...pageProps} />
    </ModalContextProvider>
  );
}

export default MyApp;

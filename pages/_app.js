import { storyblokInit, apiPlugin } from "@storyblok/react";
import ModalContextProvider from "../Components/ModalContextProvider";
import "../styles/globals.css";

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
  return (
    <ModalContextProvider>
      <Component {...pageProps} />
    </ModalContextProvider>
  );
}

export default MyApp;

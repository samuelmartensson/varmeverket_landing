import { storyblokInit, apiPlugin } from "@storyblok/react";
import Script from "next/script";
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
      <Script
        strategy="beforeInteractive"
        type="text/javascript"
        src="https://cdn.weglot.com/weglot.min.js"
      />
      <Script defer id="weglot-init">
        {`Weglot.initialize({
          api_key: "wg_b7a38d55c8c16db709cc65c1ca09d3545",
        })`}
      </Script>
      <Component {...pageProps} />
    </ModalContextProvider>
  );
}

export default MyApp;

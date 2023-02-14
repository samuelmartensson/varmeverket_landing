import { storyblokInit, apiPlugin } from "@storyblok/react";
import { useRouter } from "next/router";
import Script from "next/script";
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
      <Script
        strategy="beforeInteractive"
        type="text/javascript"
        src="https://cdn.weglot.com/weglot.min.js"
      />
      <Script
        onReady={() => {
          if (router.pathname !== "/") return;

          let interval;
          interval = setInterval(() => {
            if (
              Weglot.initialized &&
              document.querySelector(".country-selector")
            ) {
              document
                .querySelector(".country-selector")
                ?.classList.add("landing-country-selector");
              clearInterval(interval);
            }
          }, 1);
        }}
        defer
        id="weglot-init"
      >
        {`Weglot.initialize({
          api_key: "wg_b7a38d55c8c16db709cc65c1ca09d3545",
        });
        `}
      </Script>
      <Component {...pageProps} />
    </ModalContextProvider>
  );
}

export default MyApp;

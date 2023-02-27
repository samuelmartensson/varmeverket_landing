/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React, { useState } from "react";
import { useWindowSize } from "../hooks/useWindowSize";

const Grid = () => {
  const { width } = useWindowSize();

  const trClassName =
    "grid xl:grid-cols-[repeat(4,_1fr)] grid-cols-[repeat(2,_1fr)]";

  const TableRow = () =>
    width >= 1280 ? (
      <tr className={trClassName}>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    ) : (
      <tr className={trClassName}>
        <td></td>
        <td></td>
      </tr>
    );

  return (
    <table className="grid absolute inset-0">
      <tbody>
        <TableRow />
        {width >= 1280 ? (
          <tr className={trClassName}>
            <td></td>
            <td style={{ gridColumn: "span 2" }}></td>
            <td></td>
          </tr>
        ) : (
          <TableRow />
        )}
        {width < 1280 ? (
          <tr className={trClassName}>
            <td style={{ gridColumn: "span 2" }}></td>
          </tr>
        ) : (
          <TableRow />
        )}
        {width < 1280 && <TableRow />}
      </tbody>
    </table>
  );
};

const Logo = () => (
  <Image
    className="object-contain"
    width={70}
    height={70}
    src="/Images/logo.png"
    alt="värmeverket"
  />
);

const SectionOne = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <div className="m-auto min-h-screen text-black p-4 grid grid-rows-[min-content_auto]">
        <div className="mt-12 p-6 pb-10 flex justify-between relative border-2 border-b-0 border-black">
          <div className="inline-block my-auto ml-0 mr-auto">
            <Logo />
          </div>
          <div className="relative cursor-pointer grid place-items-center">
            <button onClick={() => setMenuOpen((s) => !s)}>
              <div className="w-12 h-1 mb-1.5 bg-black" />
              <div className="w-12 h-1 bg-black" />
            </button>
            {menuOpen && (
              <div className="z-10 absolute top-full right-0 bg-black text-white">
                <a
                  className="border-b border-white hover:bg-white hover:text-black whitespace-nowrap block p-4"
                  href="#"
                >
                  Menu 1
                </a>
                <a
                  className="border-b border-white hover:bg-white hover:text-black whitespace-nowrap block p-4"
                  href="#"
                >
                  Menu 2
                </a>
                <a
                  className="hover:bg-white hover:text-black whitespace-nowrap block p-4"
                  href="#"
                >
                  Menu 3
                </a>
              </div>
            )}
          </div>
        </div>
        <div className="relative text-black">
          <div className="w-full flex items-end h-full">
            <img
              className="object-cover w-full h-full"
              src="/Images/unmute_bg.png"
              alt="gradient"
            />
            <div className="absolute inset-0 grid xl:grid-rows-[repeat(3,_33.333%)] xl:grid-cols-[repeat(4,_25%)] grid-cols-[1fr_1fr] grid-rows-[repeat(4,_25%)]">
              <Grid />
              <a
                href="#residency"
                className="duration-200 hover:bg-white/20 grid place-items-center 2xl:text-5xl xl:text-3xl text-xl xl:col-start-auto col-start-2"
              >
                residency
              </a>
              <div className="flex items-center h-full w-full m-auto xl:col-start-2 xl:row-start-2 xl:col-span-2 row-start-3 col-span-2">
                <video
                  className="pointer-events-none mix-blend-lighten"
                  src="/Images/unmute.mp4"
                  alt="gradient"
                  controls={false}
                  autoPlay
                  muted
                  loop
                />
              </div>
              <a
                href="#"
                className="duration-200 hover:bg-white/20 w-full h-full grid place-items-center break-all 2xl:text-5xl xl:text-3xl text-xl xl:justify-self-start xl:row-start-3 xl:col-start-2 row-start-2 col-start-1 m-auto"
              >
                learn____more
              </a>
              <a
                href="#"
                className="duration-200 hover:bg-white/20 w-full h-full grid place-items-center break-all 2xl:text-5xl xl:text-3xl text-xl xl:justify-self-end xl:row-start-3 xl:col-start-4 m-auto row-start-4 col-start-1"
              >
                apply____now!
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SectionTwo = () => (
  <div className="min-h-screen mt-20 flex p-4">
    <div
      className="text-center grid place-items-center m-auto p-16 text-black text-lg"
      style={{
        maxWidth: 400,
        aspectRatio: 1 / 1,
        borderImage: "linear-gradient(#e004fc, #f63a92) 30",
        borderWidth: "4px",
        borderStyle: "solid",
      }}
    >
      <p className="mb-4">
        Värmeverket is a not-for-profit creative hub offering grants, workshops
        and shared space to a wide variety of culture pioneers in our community.
      </p>
      <p>
        We primarily focus on supporting underrepresented artists in 127
        Skarholmen.
      </p>
    </div>
  </div>
);

const SectionThree = () => (
  <div id="residency" className="min-h-screen mt-20 p-4 grid">
    <div className="h-full border-2 border-black grid gap-8 grid-rows-[110px_1fr]">
      <div className="border-b-2 w-full border-black"></div>
      <div className="grid place-items-center text-black">
        <div className="grid place-items-center gap-12">
          <h2 className="lg:text-7xl text-5xl">residency</h2>
          <div className="max-w-screen-md gap-8 flex lg:flex-row flex-col text-xl p-4">
            <a href="#" className="whitespace-nowrap underline">
              Read more about our requirements
            </a>
            <div>
              <p className="mb-4">
                Our residency program primarily focuses on supporting the
                diversed Community. Through this initiative, we aim to elevate
                new talent and ideas, to adress inequality in the creative
                industries and inspire others to rise.
              </p>
              <p>Residency is given to individuals based in Stockholm</p>
            </div>
          </div>
        </div>
        <div
          style={{ backgroundImage: "url(/Images/unmute_bg.png)" }}
          className="m-4 lg:text-3xl border-2 border-black grid place-items-center grid-cols-2 w-11/12"
        >
          <a
            href="#"
            className="duration-200 hover:bg-white/20 grid place-items-center lg:p-16 md:p-8 p-4 w-full h-full border-r-2 border-black/30"
          >
            LEARN__MORE
          </a>
          <a
            href="#"
            className="duration-200 hover:bg-white/20 w-full h-full lg:p-16 md:p-8 p-4 grid place-items-center"
          >
            APPLY__NOW
          </a>
        </div>
      </div>
    </div>
  </div>
);
const Unmute = () => {
  return (
    <div className="unmute-page">
      <div className="max-w-[1920px] m-auto">
        <SectionOne />
        <SectionTwo />
        <SectionThree />
      </div>
    </div>
  );
};

export default Unmute;

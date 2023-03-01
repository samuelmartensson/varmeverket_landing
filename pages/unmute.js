/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useWindowSize } from "../hooks/useWindowSize";

const Grid = () => {
  const { width } = useWindowSize();

  const trClassName =
    "grid lg:grid-cols-[repeat(4,_1fr)] grid-cols-[repeat(2,_1fr)]";

  const TableRow = () =>
    width >= 1024 ? (
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
        {width >= 1024 ? (
          <tr className={trClassName}>
            <td></td>
            <td style={{ gridColumn: "span 2" }}></td>
            <td></td>
          </tr>
        ) : (
          <TableRow />
        )}
        {width < 1024 ? (
          <tr className={trClassName}>
            <td style={{ gridColumn: "span 2" }}></td>
          </tr>
        ) : (
          <TableRow />
        )}
        {width < 1024 && <TableRow />}
        {width < 1024 && <TableRow />}
      </tbody>
    </table>
  );
};

const Logo = ({ width = 70 }) => (
  <Image
    className="object-contain"
    width={width}
    height={width}
    src="/Images/logo.png"
    alt="värmeverket"
  />
);

const SectionOne = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { width } = useWindowSize();

  return (
    <div className="min-h-screen">
      <div className="m-auto min-h-screen text-black p-4 grid grid-rows-[132px_auto]">
        <div className="mt-6 lg:p-8 p-4 flex items-center justify-between relative border border-b-0 border-black">
          <div className="inline-block my-auto ml-0 mr-auto">
            <Logo width={width > 1024 ? 70 : 60} />
          </div>
          <div className="relative cursor-pointer grid place-items-center">
            {!menuOpen ? (
              <>
                <button onClick={() => setMenuOpen((s) => !s)} className="mb-2">
                  <div className="w-12 h-1 mb-1.5 bg-black" />
                  <div className="w-12 h-1 bg-black" />
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      console.log("swap to en locale");
                    }}
                    className="text-xl"
                  >
                    en
                  </button>
                  <button
                    onClick={() => {
                      console.log("swap to sv locale");
                    }}
                    className="text-xl"
                  >
                    sv
                  </button>
                </div>
              </>
            ) : (
              <button
                className="text-2xl underline"
                onClick={() => setMenuOpen(false)}
              >
                close
              </button>
            )}
          </div>
        </div>
        <div className="relative text-black">
          <div
            style={{
              backgroundImage: "url(/Images/unmute_bg.png)",
              backgroundSize: "cover",
              backgroundPosition: "50% 0%",
            }}
            className="w-full flex h-full"
          >
            {menuOpen ? (
              <div className="border border-black z-10 lg:absolute fixed inset-0 overflow-auto lg:p-16 p-8">
                <div className="relative lg:h-full z-10">
                  <div className="lg:hidden flex mb-16 justify-between">
                    <Logo width={60} />
                    <button
                      className="text-2xl"
                      onClick={() => setMenuOpen(false)}
                    >
                      close
                    </button>
                  </div>
                  <div className="relative items-center overflow-auto grid lg:h-full lg:gap-12 gap-8 2xl:text-5xl lg:text-3xl text-xl font-GTAmericaExpandedRegular">
                    <a href="#" className="lg:text-center text-left">
                      VÄRMEVERKET
                    </a>
                    <a href="#" className="lg:text-center text-left">
                      UNMUTE
                    </a>
                    <a
                      onClick={() => setMenuOpen(false)}
                      href="#residency"
                      className="lg:text-center text-left"
                    >
                      RESIDENCY
                    </a>
                    <a href="#" className="lg:text-center text-left">
                      BECOME_A_MEMBER
                    </a>
                    <a href="#" className="lg:text-center text-left">
                      LEARN__MORE
                    </a>
                    <a href="#" className="lg:text-center text-left">
                      APPLY__NOW
                    </a>
                    <div className="font-GtAmerica text-lg mt-12 lg:flex flex-row-reverse gap-8 lg:m-auto">
                      <div>+46 72 394 04 96</div>
                      <a href="mailto:info@varmeverket.com">
                        info@varmeverket.com
                      </a>
                      <div className="grid gap-6 grid-flow-col lg:m-0 mt-4 w-min">
                        <a href="#" className="underline">
                          instagram
                        </a>
                        <a href="#" className="underline">
                          tiktok
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <img
                  className="lg:hidden inset-0 fixed object-cover min-h-screen"
                  src="/Images/unmute_bg.png"
                  alt="gradient"
                />
              </div>
            ) : (
              <div className="grid lg:grid-rows-[repeat(3,_33.333%)] lg:grid-cols-[repeat(4,_25%)] grid-cols-[1fr_1fr] grid-rows-[repeat(5,_20%)]">
                <Grid />
                <a
                  href="#residency"
                  className="duration-200 hover:bg-white/20 grid place-items-center 2xl:text-5xl xl:text-3xl text-xl"
                >
                  residency
                </a>
                <div className="flex items-center h-full w-full m-auto lg:col-start-2 lg:row-start-2 lg:col-span-2 row-start-3 col-span-2">
                  <video
                    playsInline
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
                  className="duration-200 hover:bg-white/20 w-full h-full grid place-items-center break-all 2xl:text-5xl xl:text-3xl text-lg lg:justify-self-end lg:row-start-3 lg:col-start-4 m-auto row-start-2 col-start-2"
                >
                  apply____now!
                </a>
                <a
                  href="#"
                  className="duration-200 hover:bg-white/20 w-full h-full grid place-items-center break-all 2xl:text-5xl xl:text-3xl text-lg lg:justify-self-start lg:row-start-3 lg:col-start-2 row-start-4 col-start-2 m-auto"
                >
                  learn____more
                </a>
                <a
                  href="#"
                  className="lg:hidden duration-200 hover:bg-white/20 w-full h-full grid place-items-center break-all 2xl:text-5xl xl:text-3xl text-lg lg:justify-self-start lg:row-start-3 lg:col-start-2 row-start-5 col-start-1 m-auto"
                >
                  become_a_member
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const SectionTwo = () => (
  <div className="my-5vh mt-20 flex p-4">
    <div
      className="text-center grid place-items-center m-auto lg:p-32 md:p-16 p-8 text-black md:text-4xl sm:text-2xl text-xl border-4 lg:border-8"
      style={{
        maxWidth: 800,
        aspectRatio: 1 / 1,
        borderImage: "linear-gradient(#e004fc, #f63a92) 30",
        borderStyle: "solid",
      }}
    >
      <div className="grid lg:gap-16 gap-4">
        <p className="mb-4">
          Värmeverket is a not-for-profit creative hub offering grants,
          workshops and shared space to a wide variety of culture pioneers in
          our community.
        </p>
        <p>
          We primarily focus on supporting underrepresented artists in 127
          Skärholmen.
        </p>
      </div>
    </div>
  </div>
);

const SectionThree = () => (
  <div id="residency" className="lg:min-h-[80vh] mt-20 p-4 grid">
    <div className="h-full border border-black grid gap-8 grid-rows-[110px_1fr]">
      <div className="border-b w-full border-black"></div>
      <div className="grid place-items-center text-black p-4">
        <div className="grid place-items-center gap-12">
          <h2 className="lg:text-7xl text-5xl lg:-translate-x-1/4 lg:place-self-center place-self-start">
            residency
          </h2>
          <div className="max-w-screen-lg gap-8 grid lg:grid-cols-2 lg:grid-flow-col lg:text-2xl text-xl">
            <a
              href="#"
              className="lg:justify-self-end whitespace-nowrap underline lg:row-start-1 row-start-2"
            >
              Read more about our requirements
            </a>
            <div className="row-start-1">
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
          style={{
            backgroundImage: "url(/Images/unmute_bg.png)",
            backgroundSize: "130%",
            backgroundPosition: "0% 100%",
          }}
          className="self-end mb-8 lg:text-3xl border border-black grid place-items-center md:grid-cols-2 w-full mt-8"
        >
          <a
            href="#"
            className="duration-200 hover:bg-white/20 grid place-items-center lg:p-16 md:p-8 p-6 w-full h-full md:border-r border-black md:row-start-1 row-start-2"
          >
            LEARN__MORE
          </a>
          <a
            href="#"
            className="duration-200 hover:bg-white/20 w-full h-full lg:p-16 md:p-8 p-6 grid place-items-center row-start-1 md:border-none border-b border-black"
          >
            APPLY__NOW
          </a>
        </div>
      </div>
    </div>
  </div>
);
const Unmute = () => {
  const { width } = useWindowSize();

  return (
    <div key={width} className="unmute-page">
      <div className="max-w-screen-2xl m-auto">
        <SectionOne />
        <SectionTwo />
        <SectionThree />
      </div>
    </div>
  );
};

export default Unmute;

/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React from "react";
import { useWindowSize } from "../hooks/useWindowSize";

const Grid = () => {
  const { width } = useWindowSize();

  const TableRow = () =>
    width > 1278 ? (
      <tr className="grid xl:grid-cols-[repeat(4,_1fr)] grid-cols-[repeat(2,_1fr)]">
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    ) : (
      <tr className="grid xl:grid-cols-[repeat(4,_1fr)] grid-cols-[repeat(2,_1fr)]">
        <td></td>
        <td></td>
      </tr>
    );

  return (
    <table className="absolute inset-0">
      <tbody>
        <TableRow />
        <TableRow />
        <TableRow />
        {width < 1278 && <TableRow />}
      </tbody>
    </table>
  );
};

const Logo = () => (
  <Image
    className="object-contain"
    fill
    src="/Images/logo.png"
    alt="värmeverket"
  />
);

const Unmute = () => {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "#e4e3e1",
      }}
    >
      <div className="m-auto min-h-screen text-black p-4 grid xl:gap-4 xl:grid-rows-[min-content_auto] grid-rows-[64px_min-content_minmax(50vh,_1fr)]">
        <div className="flex border-b border-black pb-3 mb-4 xl:hidden">
          <div className="relative h-10 w-12">
            <Logo />
          </div>
        </div>
        <div className="relative">
          <div className="hidden xl:block absolute xl:top-[42px] left-0 right-0 border-b border-black" />
          <div className="absolute hidden xl:block xl:top-[60px] left-0">
            <div className="relative h-12 w-20">
              <Logo />
            </div>
          </div>
          <div className="leading-5 relative m-auto xl:max-w-5xl md:gap-6 md:pb-8 grid xl:grid-flow-col lg:grid-cols-[1fr_1fr_1fr]">
            <div className="mb-1">
              <h2 className="text-2xl xl:text-3xl xl:mb-5 mb-1">värmeverket</h2>
              <p>
                We are a creative hub for cultural pioneers who believe in the
                power of creativity to drive local prosperity.
              </p>
            </div>
            <div className="mb-1">
              <h2 className="text-2xl xl:text-3xl xl:mb-5 mb-1">season one</h2>
              <p>
                As our community grows, we ask ourselves; what happens if we
                give space to the unheard and explore the true power of sound -
                to use it to create more meaningful experiences?
              </p>
            </div>
            <div className="mb-8">
              <h2 className="text-2xl xl:text-3xl xl:mb-5 mb-1">unmute</h2>
              <p>
                It&apos;s time to press unmute… time to embrace the diversity of
                sounds and music across cultures and traditions, and use them to
                bring people together.
              </p>
            </div>
          </div>
        </div>
        <div className="relative text-white">
          <div className="w-full flex items-end h-full">
            <img
              className="object-cover w-full h-full"
              src="/Images/unmute-bg.png"
              alt="gradient"
            />
            <div className="absolute inset-0 grid xl:grid-rows-[repeat(3,_33.333%)] xl:grid-cols-[repeat(4,_25%)] grid-cols-[1fr_1fr] grid-rows-[repeat(4,_1fr)]">
              <Grid />
              <div className="lg:text-4xl text-xl grid place-items-center xl:col-start-auto col-start-2">
                season one
              </div>
              <div className="m-auto xl:col-start-3 xl:row-start-1 row-start-3 col-start-2 w-10/12">
                <img
                  className="xl:col-start-3 xl:col-span-2"
                  src="/Images/un_mute_display.png"
                  alt="gradient"
                />
              </div>
              <a
                href="/unmute/learn-more"
                className="font-GTAmericaExpandedRegular break-all xl:translate-y-6 lg:translate-y-3 2xl:text-3xl xl:text-2xl text-sm xl:justify-self-start xl:row-start-3 xl:col-start-2 row-start-2 col-start-1 m-auto"
              >
                LEARN____MORE
              </a>
              <a
                href="/unmute/early-access"
                className="font-GTAmericaExpandedRegular break-all xl:translate-y-6 lg:translate-y-3 2xl:text-3xl xl:text-2xl text-sm xl:justify-self-end xl:row-start-3 xl:col-start-4 m-auto row-start-4 col-start-1"
              >
                EARLY____ACCESS
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unmute;

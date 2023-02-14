/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React from "react";

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
      style={{
        backgroundColor: "#e4e3e1",
      }}
    >
      <div className="m-auto min-h-screen text-black p-4 grid xl:gap-4 xl:grid-rows-[1fr_minmax(800px,_77vh)] grid-rows-[64px_min-content_minmax(50vh,_1fr)]">
        <div className="flex border-b border-black pb-3 mb-4 xl:hidden">
          <div className="relative h-10 w-12">
            <Logo />
          </div>
        </div>
        <div className="relative">
          <div className="hidden xl:block absolute xl:top-[72px] left-0 right-0 border-b border-black" />
          <div className="absolute hidden xl:block xl:top-[90px] left-0">
            <div className="relative h-12 w-20">
              <Logo />
            </div>
          </div>
          <div className="leading-5 relative xl:top-[30px] m-auto xl:max-w-5xl md:gap-6 md:pb-8 grid xl:grid-flow-col lg:grid-cols-[1fr_1fr_1fr]">
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
        <div className="relative text-white overflow-hidden">
          <div className="relative w-full h-full">
            <img
              className="object-cover h-full w-full"
              src="/Images/unmute-bg.png"
              alt="gradient"
            />
          </div>
          <div className="absolute inset-0 -top-8 grid place-items-center">
            <div className="grid xl:gap-16 place-items-center">
              <div className="text-xl xl:text-4xl mb-8">season one</div>
              <img
                className="w-8/12 mb-10"
                src="/Images/un_mute_display.png"
                alt="gradient"
              />
              <div className="xl:text-3xl text-lg grid gap-8 xl:w-full place-items-center xl:grid-flow-col">
                <a
                  href="/unmute/learn-more"
                  className="font-GTAmericaExpandedRegular xl:justify-self-start"
                >
                  LEARN___MORE
                </a>
                <a
                  href="/unmute/early-access"
                  className="font-GTAmericaExpandedRegular xl:justify-self-end"
                >
                  EARLY____ACCESS
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unmute;

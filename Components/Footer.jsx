import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const Footer = () => {
  const [scrollY, setScrollY] = useState(0);

  const { scrollYProgress } = useScroll();
  const { scrollYProgress: scrollYFade } = useScroll();

  const transform = useTransform(scrollYProgress, [0.85, 1], [0, 100]);
  const transformFade = useTransform(scrollYFade, [0.85, 0.875], [0, 1]);

  const scroll = useSpring(transform, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const scrollFade = useSpring(transformFade);

  useEffect(() => {
    return scroll.onChange((latest) => {
      setScrollY(latest);
    });
  }, [scroll]);

  return (
    <footer
      style={{ filter: `invert(${scrollY}%)` }}
      className="bg-black relative"
    >
      <motion.div
        style={{
          transform: "translateY(-99%)",
          opacity: scrollFade,
          background: "linear-gradient(0deg, black 75%, transparent)",
        }}
        className="background bg-black pointer-events-none absolute top-0 w-full bg-blue h-[125vh] z-10"
      />
      <div className="max-w-7xl h-screen  text-white md:p-8 p-4 flex flex-col justify-center m-auto">
        <p id="contact" className="mb-8 font-semibold">
          CONTACT
        </p>
        <h1 className="md:text-7xl text-5xl mb-6">
          <span>KEEP.IN.</span>
          <span className="font-bold">TOUCH.</span>
        </h1>
        <h1 className="mb-8 text-lg md:text-2xl">
          <a href="mailto:info@varmeverket.com">info@varmeverket.com</a>
        </h1>
        <div className="flex pb-12">
          <div className="mr-20 md:mr-28 2xl:mr-40">
            <h2 className="md:text-2xl mb-6">Our office</h2>
            <h1 className="md:text-4xl mb-2">Stockholm</h1>
            <p className="md:text-md">Bredängsvägen 203</p>
            <p className="md:text-md">12734 Skärholmen</p>
            <p className="md:text-md mb-12"> Stockholm </p>
            <h2 className="md:text-md mb-8 ">OUR POLICY</h2>
            <a className="underline md:text-md">TERMS OF SERVICE</a>
          </div>
          <div>
            <h2 className="text-2xl mb-6">Our socials</h2>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className="underline text-2xl"
            >
              LinkedIn
            </a>
            <br />
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              className="underline text-2xl"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

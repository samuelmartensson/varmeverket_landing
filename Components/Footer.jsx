import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const Footer = ({ data }) => {
  const {
    contact,
    largeHeaderThin,
    largeHeaderBold,
    tosHref,
    tosText,
    conversation,
    email,
    officeHeader,
    officeText,
    officeRows,
    policyHeader,
    socialsHeader,
    socials,
  } = data;
  const [scrollY, setScrollY] = useState(0);

  const { scrollYProgress } = useScroll();
  const { scrollYProgress: scrollYFade } = useScroll();

  const transform = useTransform(scrollYProgress, [0.9, 0.95], [0, 100]);
  const transformFade = useTransform(scrollYFade, [0.9, 0.95], [0, 1]);

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
      className="bg-black relative mt-40"
    >
      <motion.div
        style={{
          transform: "translateY(-99%)",
          opacity: scrollFade,
          background: "linear-gradient(0deg, black 75%, transparent)",
        }}
        className="background bg-black pointer-events-none absolute top-0 w-full bg-blue h-[125vh] z-10"
      />
      <div className="max-w-7xl min-h-screen text-white md:p-8 p-6 flex flex-col justify-center m-auto">
        <div className="max-w-3xl">
          <p id="contact" className="md:text-xl mb-8">
            {contact}
          </p>
          <h1 className="md:text-7xl text-[40px] md:mb-12 mb-4">
            <span>{largeHeaderThin}</span>
            <span className="font-bold">{largeHeaderBold}</span>
          </h1>
          <div className="pb-12">
            <p className="mb-8">{conversation}</p>
            <a
              className="block mb-8 text-2xl md:text-4xl"
              href="mailto:info@varmeverket.com"
            >
              {email}
            </a>
            <div className="text-2xl mb-6">{officeHeader}</div>
            <div className="text-4xl mb-4">{officeText}</div>
            <div className="grid gap-4">
              <div className="mb-4">
                {officeRows.map((item) => (
                  <p key={item} className="text-sm">
                    {item}
                  </p>
                ))}
              </div>
              <div className="grid grid-cols-2">
                <div>
                  <p className="mb-4 text-2xl">{policyHeader}</p>
                  <a
                    href={tosHref}
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                  >
                    {tosText}
                  </a>
                </div>
                <div>
                  <p className="text-2xl mb-8">{socialsHeader}</p>
                  <div className="underline text-xl">
                    {socials.map((item) => (
                      <a
                        key={item.text}
                        className="block"
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {item.text}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

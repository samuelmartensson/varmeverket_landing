import { useWindowSize } from "../hooks/useWindowSize";
import { useModalContext } from "./ModalContextProvider";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import NoSSR from "./NoSSR";

const MENU_BREAKPOINT = 1024;
const lineVariant = {
  hidden: {
    width: "0%",
  },
  visible: {
    width: "100%",
  },
};

let timer = null;

const NavBarItem = ({ onClick, href, label }) => {
  const [hover, setHover] = useState(false);

  return (
    <li
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative whitespace-nowrap cursor-pointer"
    >
      <a onClick={onClick} href={href}>
        {label}
      </a>
      <AnimatePresence mode="wait">
        {hover && (
          <motion.div
            variants={lineVariant}
            animate="visible"
            exit="hidden"
            transition={{
              type: "tween",
              easings: [0.65, 0.05, 0.36, 1],
              duration: 0.6,
            }}
            className="h-0.5 bg-white absolute bottom-0 left-1/2 -translate-x-1/2"
          />
        )}
      </AnimatePresence>
    </li>
  );
};

export default function NavBar({ data }) {
  const { socials, email, phoneNumber } = data;
  const router = useRouter();
  const { setIsOpen } = useModalContext();
  const [isHover, setIsHover] = useState(false);
  const [isExpanded, setExpanded] = useState(false);
  const size = useWindowSize();
  const [options, setOptions] = useState({
    hidden: false,
    lastHiddenY: 0,
    fill: false,
  });
  const [scrollData, setScrollData] = useState({
    x: 0,
    y: 0,
    lastX: 0,
    lastY: 0,
  });
  const { lastY, y } = scrollData;

  const handleScroll = () => {
    if (timer !== null) {
      clearTimeout(timer);
    }

    timer = setTimeout(function () {
      setOptions((s) => {
        if (window.scrollY > s.lastHiddenY) {
          return {
            ...s,
            lastHiddenY: window.scrollY,
          };
        }

        return s;
      });
    }, 150);

    setScrollData((last) => {
      return {
        y: window.scrollY,
        lastY: last.y,
      };
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let shouldHide = false;

    if (y > 60 && y - lastY > 0) {
      shouldHide = true;
      setExpanded(false);
    }

    setOptions((s) => {
      if (s.lastHiddenY - y < 4 && y > 60) {
        shouldHide = true;
      }

      return {
        hidden: shouldHide,
        fill: y > 20 || isExpanded,
        lastHiddenY: shouldHide ? y : s.lastHiddenY,
      };
    });
  }, [y, lastY, setExpanded, isExpanded]);

  useEffect(() => {
    if (size.width > MENU_BREAKPOINT) {
      setExpanded(false);
    }
  }, [size.width, setExpanded]);

  const handleNavigate = (id) => {
    setIsOpen(false);
    setExpanded(false);
    window.location.hash = id;
  };

  return (
    <NoSSR>
      <div
        style={{
          height: isExpanded ? "100%" : "unset",
          transform: options.hidden ? "translateY(-100%)" : "translateY(0%)",
        }}
        className={`fixed top-0 left-0 right-0 duration-300 z-50 ${
          options.fill ? "bg-black/90" : ""
        }`}
      >
        {isExpanded && (
          <motion.img
            alt=""
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inset-0 fixed object-cover z-10 h-full w-full"
            src="https://a.storyblok.com/f/183192/1181x1161/55ce2d7686/vv-bg.jpg"
          />
        )}
        <div className="p-6 lg:py-6 lg:px-12 max-w-7xl m-auto relative z-20">
          <div className="flex">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
              onClick={() => {
                router.push("/");
                setExpanded(false);
                setIsOpen(false);
              }}
              style={{ filter: "invert(1)" }}
              className="cursor-pointer md:h-16 h-10"
              src={isHover ? "/Images/logo.gif" : "/Images/logo-freeze.gif"}
              alt="värmeverket"
            />
            {size.width > MENU_BREAKPOINT ? (
              <ul className="text-lg ml-auto flex items-center justify-between gap-16">
                <NavBarItem
                  onClick={() => handleNavigate("spaces")}
                  href="https://www.varmeverket.com/sign-up"
                  label="APPLY NOW"
                />
                <NavBarItem
                  onClick={() => handleNavigate("spaces")}
                  label="SPACES"
                />
                <NavBarItem
                  onClick={() => handleNavigate("community")}
                  label="COMMUNITY"
                />
                <NavBarItem
                  onClick={() => handleNavigate("contact")}
                  label="CONTACT"
                />
              </ul>
            ) : (
              <div
                className="header ml-auto underline text-xl place-self-end self-center"
                onClick={() => setExpanded((s) => !s)}
              >
                {isExpanded ? "CLOSE" : "MENU"}
              </div>
            )}
          </div>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                transition={{ duration: 0.2 }}
                className="h-full overflow-hidden"
              >
                <div className="relative content text-left mt-24 mb-12">
                  <ul className="font-GtAmericaExpandedBlack text-4xl ">
                    <li className="mb-8">
                      <a
                        className="cursor-pointer hover:underline"
                        href="https://www.varmeverket.com/sign-up"
                      >
                        APPLY
                      </a>
                    </li>
                    <li className="mb-8">
                      <a
                        className="cursor-pointer hover:underline"
                        onClick={() => handleNavigate("community")}
                        href="#community"
                      >
                        COMMUNITY
                      </a>
                    </li>
                    <li className="mb-8">
                      <a
                        className="cursor-pointer hover:underline"
                        onClick={() => handleNavigate("spaces")}
                        href="#spaces"
                      >
                        SPACES
                      </a>
                    </li>
                    <li className="mb-8">
                      <a
                        className="cursor-pointer hover:underline"
                        onClick={() => handleNavigate("contact")}
                        href="#contact"
                      >
                        CONTACT
                      </a>
                    </li>
                  </ul>
                  <div>
                    <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>
                    <br />
                    <a href={`mailto: ${email}`}>{email}</a>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 underline text-sm">
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </NoSSR>
  );
}

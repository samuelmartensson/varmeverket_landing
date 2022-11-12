import { useWindowSize } from "../hooks/useWindowSize";
import useCollapse from "react-collapsed";
import { useModalContext } from "./ModalContextProvider";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const MENU_BREAKPOINT = 1024;

export default function NavBar() {
  const router = useRouter();
  const { setIsOpen } = useModalContext();
  const { getCollapseProps, getToggleProps, isExpanded, setExpanded } =
    useCollapse();
  const size = useWindowSize();
  const [options, setOptions] = useState({ hidden: false, fill: false });
  const [data, setData] = useState({
    x: 0,
    y: 0,
    lastX: 0,
    lastY: 0,
  });
  const { lastY, y } = data;

  const handleScroll = () => {
    setData((last) => {
      return {
        x: window.scrollX,
        y: window.scrollY,
        lastX: last.x,
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
    setOptions({
      hidden: shouldHide,
      fill: y > 20 || size.width < MENU_BREAKPOINT,
    });
  }, [y, lastY, setExpanded, size.width]);

  useEffect(() => {
    if (size.width > MENU_BREAKPOINT) {
      setExpanded(false);
    }
  }, [size.width, setExpanded]);

  const handleNavigate = (id) => {
    setIsOpen(false);
    setExpanded(false);

    setTimeout(() => {
      requestAnimationFrame(() => {
        document.querySelector("#" + id).scrollIntoView();
      });
    }, 80);
  };

  return (
    <div
      style={{
        transform: options.hidden ? "translateY(-100%)" : "translateY(0%)",
      }}
      className={`fixed top-0 left-0 right-0 duration-300 z-50 ${
        options.fill ? "bg-black/90" : ""
      }`}
    >
      <div className="p-4 lg:py-8 lg:px-12 max-w-7xl m-auto">
        <div className="flex">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            onClick={() => {
              router.push("/");
              setExpanded(false);
              setIsOpen(false);
            }}
            className="cursor-pointer sm:h-20 md:h-15 lg:h-15 xl:h-20 2xl:h-20 h-14"
            src="https://hypermedia.varmeverket.com/logo.svg"
            alt="värmeverket"
          />
          {size.width > MENU_BREAKPOINT ? (
            <ul className="text-lg ml-auto flex items-center justify-between gap-16">
              <li className="whitespace-nowrap cursor-pointer">
                <a href="https://www.varmeverket.com/sign-up">APPLY NOW</a>
              </li>
              <li className="whitespace-nowrap cursor-pointer">
                <a onClick={() => handleNavigate("spaces")} href="#spaces">
                  SPACES
                </a>
              </li>
              <li className="whitespace-nowrap cursor-pointer">
                <a
                  onClick={() => handleNavigate("community")}
                  href="#community"
                >
                  COMMUNITY
                </a>
              </li>
              <li className="whitespace-nowrap cursor-pointer">
                <a onClick={() => handleNavigate("contact")} href="#contact">
                  CONTACT
                </a>
              </li>
            </ul>
          ) : (
            <div
              className="header ml-auto underline text-xl place-self-end self-center"
              onMouseDown={() => !isExpanded && setIsOpen(false)}
              {...getToggleProps()}
            >
              {isExpanded ? "CLOSE" : "MENU"}
            </div>
          )}
        </div>

        <div {...getCollapseProps()} className="col-span-2 ">
          <div className="content text-left mt-24 mb-12">
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
              <a href="tel:+46 72 123 45 67"> +46 72 123 45 67</a>
              <br />
              <a href="mailto: booking@varmeverket.com">
                booking@varmeverket.com
              </a>
            </div>
          </div>
          <div className="flex space-x-4 underline text-sm">
            <a>TWITTER</a>
            <a>INSTAGRAM</a>
            <a>FACEBOOK</a>
            <a>TIKTOK</a>
          </div>
        </div>
      </div>
    </div>
  );
}

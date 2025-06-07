import { useEffect, useState } from "react";
import Navigation from "../features/header/Navigation";
import Notification from "../features/header/Notification";
import { Icon } from "@iconify-icon/react";
import { AnimatePresence } from "framer-motion";
import SearchBar from "../features/header/SearchBar";

function Header({ isNavActive, setIsNavActive }) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 1050px)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1050px)");
    const handler = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className="relative h-20 bg-bordo-600/0 w-full flex items-center px-4 sm:px-6 lg:px-8 justify-between z-20">
        <Navigation isNavActive={isNavActive} setIsNavActive={setIsNavActive} />
        <div className="h-fit flex items-center gap-4 fixed ">
          <Icon
            onClick={() => setIsNavActive(true)}
            icon="mdi:menu"
            width={isMobile ? "30" : "42"}
            height={isMobile ? "30" : "42"}
            className="cursor-pointer"
          />

          <Icon
            onClick={() => setNotifOpen((o) => !o)}
            icon={notifOpen ? "mdi:bell" : "mdi:bell-outline"}
            width={isMobile ? "28" : "36"}
            height={isMobile ? "30" : "42"}
            className="cursor-pointer"
          />

          <AnimatePresence>
            {notifOpen && (
              <Notification
                onEmpty={() => setNotifOpen(false)}
                className="left-0 md:left-20"
              />
            )}
          </AnimatePresence>
        </div>
        <SearchBar />
      </header>
    </>
  );
}

export default Header;

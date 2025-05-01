import { useState } from "react";
import Navigation from "../features/header/Navigation";
import Notification from "../features/header/Notification";
import { Icon } from "@iconify-icon/react";
import { AnimatePresence } from "framer-motion";
import SearchBar from "../features/header/SearchBar";

function Header({ isNavActive, setIsNavActive }) {
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <>
      <header className="relative h-24 bg-bordo-600/0 w-full flex items-center px-8 justify-between z-20">
        <Navigation isNavActive={isNavActive} setIsNavActive={setIsNavActive} />
        <div className="h-full flex items-center  gap-4">
          <Icon
            onClick={() => setIsNavActive(true)}
            icon="mdi:menu"
            width="42"
            height="42"
            className="cursor-pointer stroke-black stroke-[0.5]"
          />

          <Icon
            onClick={() => setNotifOpen((o) => !o)}
            icon={notifOpen ? "mdi:bell" : "mdi:bell-outline"}
            width="36"
            height="42"
            className="cursor-pointer stroke-black stroke-[0.5]"
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

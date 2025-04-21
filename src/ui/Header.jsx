// Header.jsx
import { useState } from "react";
import Navigation from "./Navigation";
import Notification from "./Notification";
import { Icon } from "@iconify-icon/react";
import { AnimatePresence } from "framer-motion";
import SearchBar from "./SearchBar";

function Header({ isNavActive, setIsNavActive }) {
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <>
      <header className="relative h-24 bg-bordo-600/0 w-full flex items-center px-8 justify-between z-1">
        <Navigation isNavActive={isNavActive} setIsNavActive={setIsNavActive} />
        <div className="h-full flex items-center gap-4">
          <Icon
            onClick={() => setIsNavActive(true)}
            icon="mdi:menu"
            width="42"
            height="42"
            className="cursor-pointer"
          />

          <Icon
            onClick={() => setNotifOpen((o) => !o)}
            icon={notifOpen ? "mdi:bell" : "mdi:bell-outline"}
            width="36"
            height="42"
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
        {/* <Icon
          icon="jam:search"
          width="40"
          height="40"
          className="cursor-pointer"
        /> */}
      </header>
    </>
  );
}

export default Header;

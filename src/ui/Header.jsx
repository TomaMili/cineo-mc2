import Navigation from "./Navigation";
import { Icon } from "@iconify-icon/react";

function Header({ isNavActive, setIsNavActive }) {
  return (
    <>
      <Navigation isNavActive={isNavActive} setIsNavActive={setIsNavActive} />
      <header className="h-24 bg-bordo-600 w-full flex items-center px-8 justify-between">
        <div className="h-full flex items-center gap-4 ">
          <Icon
            onClick={() => setIsNavActive(true)}
            icon="mdi:menu"
            width="42"
            height="42"
            className=""
          />
          <Icon
            icon="mdi:bell-outline"
            width="36"
            height="42"
            className="pl-0"
          />
        </div>
        <Icon icon="jam:search" width="40" height="40" />
      </header>
    </>
  );
}

export default Header;

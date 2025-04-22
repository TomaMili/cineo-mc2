import { NavLink, useLocation } from "react-router-dom";
import { Icon } from "@iconify-icon/react";
import { useEffect } from "react";

function Navigation({ isNavActive, setIsNavActive }) {
  const location = useLocation();

  // Whenever the URL changes, close the nav
  useEffect(() => {
    setIsNavActive(false);
  }, [location.pathname, setIsNavActive]);

  return (
    <>
      <div
        className={`
          fixed inset-0 bg-black z-9
          transition-opacity duration-300 ease-in-out
          ${
            isNavActive
              ? "opacity-50 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setIsNavActive(false)}
      />
      <nav
        className={`
          fixed inset-y-0 left-0 w-70 max-w-xs
           text-siva-200 text-2xl
          transform transition-all duration-300 ease-in-out z-20
          ${isNavActive ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex items-start flex-col h-full bg-siva-800 text-2xl pt-8 pb-10 px-8">
          <Icon
            onClick={() => setIsNavActive(false)}
            icon="mdi:menu"
            width="36"
            height="36"
            className="cursor-pointer pb-10"
          />
          <NavLink
            to="/homepage"
            className="flex items-center gap-4 mb-6 hover:text-siva-100"
          >
            <Icon icon="codicon:home" width="36" height="36" />
            <span className="pt-2 ">Home</span>
          </NavLink>

          <NavLink
            to="/watchlater"
            className="flex items-center gap-4 mb-6 hover:text-siva-100"
          >
            <Icon
              icon="material-symbols:bookmark-outline"
              width="36"
              height="36"
            />
            <span>Watch later</span>
          </NavLink>

          <NavLink
            to="/watched"
            className="flex items-center gap-4 mb-6 hover:text-siva-100"
          >
            <Icon icon="mdi:eye-outline" width="36" height="36" />
            <span>Watched</span>
          </NavLink>

          <NavLink
            to="/watch-together"
            className="flex items-center gap-4 mb-6 text-left hover:text-siva-100"
          >
            <Icon icon="mingcute:group-line" width="36" height="36" />
            <span>Watch together</span>
          </NavLink>

          <NavLink
            to="/collections"
            className="flex items-center gap-4 mb-6 hover:text-siva-100"
          >
            <Icon icon="proicons:library" width="36" height="36" />
            <span>Collections</span>
          </NavLink>

          <button
            onClick={() => alert("Superpreporuka")}
            className="flex items-center gap-4 mb-6 text-left hover:text-siva-100 cursor-pointer"
          >
            <Icon icon="hugeicons:ai-idea" width="36" height="36" />
            <span>Supersuggestion</span>
          </button>

          <hr className="border-t w-full border-white/50 my-4 mb-8" />

          <button
            onClick={() => alert("Toggled light mode")}
            className="flex items-center gap-4 mb-6 text-left hover:text-siva-100  cursor-pointer"
          >
            <Icon icon="flowbite:sun-outline" width="36" height="36" />
            <span>Light mode</span>
          </button>

          <NavLink
            to="/profile"
            className="flex items-center gap-4 mb-6 hover:text-siva-100"
          >
            <Icon icon="ix:user-profile" width="36" height="36" />
            <span>Profile</span>
          </NavLink>

          <NavLink
            to="/settings/info"
            className="flex items-center gap-4 mb-6 hover:text-siva-100 cursor-pointer"
          >
            <Icon icon="pajamas:settings" width="36" height="30" />
            <span>Settings</span>
          </NavLink>

          <hr className="border-t w-full border-white/50 my-4 mb-8" />

          <button
            onClick={() => alert("Signed out")}
            className="flex items-center gap-4 text-left ml-0 hover:text-siva-100 cursor-pointer"
          >
            <Icon icon="ic:twotone-logout" width="34" height="36" />
            <span>Sign out</span>
          </button>
        </div>
        <span className="z-20 absolute bottom-2 text-center w-full font-extralight text-sm">
          © 2025 Cineo - NOPE Team
        </span>
      </nav>
    </>
  );
}

export default Navigation;

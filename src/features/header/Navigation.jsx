import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import ThemeToggleButton from "../../ui/ThemeToggleButton";
import IconWithSkeleton from "./IconWithSkeleton";
import { useSuperSuggest } from "../../context/SuperSuggestContext";

const ICON_SIZE = 30;

function Navigation({ isNavActive, setIsNavActive }) {
  const location = useLocation();
  const { show } = useSuperSuggest();

  useEffect(() => {
    if (isNavActive) setIsNavActive(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

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
          fixed inset-y-0 left-0 w-64 max-w-xs
          text-siva-200 text-lg
          transform transition-all duration-300 ease-in-out z-20
          ${isNavActive ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex flex-col items-start  h-full bg-siva-800 text-xl pt-6 pb-6 px-5">
          <div className="flex items-center justify-center min-w-[30px] min-h-[30px] h-10 mb-6">
            <IconWithSkeleton
              icon="mdi:menu"
              width={36}
              height={36}
              onClick={() => setIsNavActive(false)}
              className="cursor-pointer"
            />
          </div>

          <NavLink
            to="/homepage"
            className="flex items-center gap-3 mb-4 hover:text-siva-100 h-10"
            onClick={() => setIsNavActive(false)}
          >
            <IconWithSkeleton
              icon="codicon:home"
              width={ICON_SIZE}
              height={ICON_SIZE}
            />
            <span className="pt-1">Home</span>
          </NavLink>
          <NavLink
            to="/watchlater"
            className="flex items-center gap-3 mb-4 hover:text-siva-100 h-10"
          >
            <IconWithSkeleton
              icon="material-symbols:bookmark-outline"
              width={ICON_SIZE}
              height={ICON_SIZE}
            />
            <span>Watch later</span>
          </NavLink>
          <NavLink
            to="/watched"
            className="flex items-center gap-3 mb-4 hover:text-siva-100 h-10"
          >
            <IconWithSkeleton
              icon="mdi:eye-outline"
              width={ICON_SIZE}
              height={ICON_SIZE}
            />
            <span>Watched</span>
          </NavLink>

          <NavLink
            to="/collections"
            className="flex items-center gap-3 mb-4 hover:text-siva-100 h-10"
          >
            <IconWithSkeleton
              icon="proicons:library"
              width={ICON_SIZE}
              height={ICON_SIZE}
            />
            <span>Collections</span>
          </NavLink>
          <NavLink
            to="/watch-together"
            className="flex items-center gap-3 mb-4 text-left hover:text-siva-100 h-10"
          >
            <IconWithSkeleton
              icon="mingcute:group-line"
              width={ICON_SIZE}
              height={ICON_SIZE}
            />
            <span>Watch together</span>
          </NavLink>
          <button
            onClick={() => {
              setIsNavActive(false);
              show();
            }}
            className="flex items-center gap-3 mb-4 text-left hover:text-siva-100 cursor-pointer h-10"
          >
            <IconWithSkeleton
              icon="hugeicons:ai-idea"
              width={ICON_SIZE}
              height={ICON_SIZE}
            />
            <span>Supersuggestion</span>
          </button>
          <hr className="border-t w-full border-white/50 my-3 mb-5" />
          <ThemeToggleButton />

          <NavLink
            to="/profile"
            className="flex items-center gap-3 mb-4 hover:text-siva-100 h-10"
          >
            <IconWithSkeleton
              icon="ix:user-profile"
              width={ICON_SIZE}
              height={ICON_SIZE}
            />
            <span>Profile</span>
          </NavLink>
          <NavLink
            to="/settings/info"
            className="flex items-center gap-3 mb-4 hover:text-siva-100 cursor-pointer h-10"
          >
            <IconWithSkeleton
              icon="pajamas:settings"
              width={ICON_SIZE}
              height={ICON_SIZE}
            />
            <span>Settings</span>
          </NavLink>
          <hr className="border-t w-full border-white/50 my-3 mb-5" />
          <button
            onClick={() => alert("Signed out")}
            className="flex items-center gap-3 text-left ml-0 hover:text-siva-100 cursor-pointer h-10 mb-2"
          >
            <IconWithSkeleton
              icon="ic:twotone-logout"
              width={ICON_SIZE}
              height={ICON_SIZE}
            />
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

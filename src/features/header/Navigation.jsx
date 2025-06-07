import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import ThemeToggleButton from "../../ui/ThemeToggleButton";
import IconWithSkeleton from "./IconWithSkeleton";
import { useSuperSuggest } from "../../context/SuperSuggestContext";
import { useLogout } from "../../hooks/useAuth";

const ICON_SIZE = 30;

function Navigation({ isNavActive, setIsNavActive }) {
  const location = useLocation();
  const { show } = useSuperSuggest();
  const { logout, isLoading } = useLogout();

  useEffect(() => {
    if (isNavActive) setIsNavActive(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const prefetchMap = {
    "/homepage": () => import("../../pages/app_layout/HomePage"),
    "/watchlater": () => import("../../pages/app_layout/WatchLater"),
    "/watched": () => import("../../pages/app_layout/Watched"),
    "/collections": () => import("../../pages/app_layout/Collections"),
    "/watch-together": () => import("../../pages/WatchTogether"),
    "/movie": () => import("../../pages/app_layout/MovieDetail"),
    "/browse": () => import("../../pages/LandingPage"),
    "/settings": () => import("../../pages/app_layout/Settings"),
    "/profile": () => import("../../pages/app_layout/Profile"),
  };
  function handlePrefetch(path) {
    const loader = prefetchMap[path];
    if (loader) loader();
  }

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
          fixed inset-y-0 left-0 lg:w-64 w-full
          text-siva-200 lg:text-2xl text-xl
          transform transition-all duration-300 ease-in-out z-40
          ${isNavActive ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex flex-col items-start  h-full bg-siva-800 text-2xl lg:text-xl pt-6 pb-6 px-6 lg:px-6 ">
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
            onMouseEnter={() => handlePrefetch("/homepage")}
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
            onMouseEnter={() => handlePrefetch("/watchlater")}
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
            onMouseEnter={() => handlePrefetch("/watched")}
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
            onMouseEnter={() => handlePrefetch("/collections")}
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
            onMouseEnter={() => handlePrefetch("/watch-together")}
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
            onMouseEnter={() => handlePrefetch("/profile")}
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
            onMouseEnter={() => handlePrefetch("/settings")}
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
            onClick={logout}
            disabled={isLoading}
            onMouseEnter={() => handlePrefetch("/landing-page")}
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

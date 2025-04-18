import { NavLink } from "react-router-dom";

function Navigation({ isNavActive, setIsNavActive }) {
  if (!isNavActive) return null;
  return (
    <nav
      className="max-w-50 absolute top-0 "
      onMouseLeave={() => setIsNavActive(false)}
    >
      <div className="flex flex-col  justify-center h-full gap-10 pt-14 pl-10 bg-green-500">
        <NavLink to="/homepage"> Home </NavLink>
        <NavLink to="/watchlater"> Watch later </NavLink>
        <NavLink to="/watched"> Watched </NavLink>
        <NavLink to="/watch-together"> Watch together </NavLink>
        <NavLink to="/collections"> Collections </NavLink>
        <button
          onClick={() => alert("Superpreporuka")}
          className="cursor-pointer text-left"
        >
          Supersuggestion
        </button>
        <NavLink to="/profile"> Profile </NavLink>
        <NavLink to="/settings/info"> Settings </NavLink>
        <button
          onClick={() => alert("Signed out")}
          className="cursor-pointer text-left"
        >
          Sign out
        </button>
      </div>
    </nav>
  );
}

export default Navigation;

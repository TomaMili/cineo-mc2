import { NavLink } from "react-router-dom";

export default function TabNav({ tabs }) {
  return (
    <nav className="flex bg-gray-500/40 rounded-full overflow-hidden h-9">
      {tabs.map(([to, label]) => (
        <NavLink
          key={label}
          to={to}
          end={to === ""}
          className={({ isActive }) =>
            `flex-1 text-center leading-9 transition-colors text-md
             ${
               isActive
                 ? "bg-bordo-500 text-white"
                 : "text-siva-300 hover:bg-bordo-400 hover:text-white"
             }`
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
}

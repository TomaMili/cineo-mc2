import { NavLink, Outlet } from "react-router-dom";
import SettingsAvatar from "../../features/settings/SettingsAvatar";

export default function Settings() {
  return (
    <>
      {/* HERO SECTION */}
      <div
        className="w-full bg-cover bg-center -mt-24 "
        style={{ backgroundImage: "url(/bg-image.jpg)" }}
      >
        <h1 className="text-4xl font-bold text-white text-center pt-10 pb-40 mb-8">
          SETTINGS
        </h1>
        <div className="flex justify-center items-end">
          <SettingsAvatar />
        </div>
      </div>

      {/* TABS + CONTENT */}
      <div className="bg-siva-800 pt-12 pb-12">
        <nav className="max-w-3xl mx-auto flex bg-gray-500/40  rounded-full overflow-hidden mb-20">
          {[
            ["info", "Info & Password"],
            ["platforms", "Platforms"],
            ["plan", "Plan"],
          ].map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              end={to === "info"}
              className={({ isActive }) =>
                `flex-1 text-center py-2 transition-colors ${
                  isActive
                    ? "bg-bordo-500 text-white"
                    : "text-gray-300 hover:bg-bordo-400 hover:text-white"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="max-w-3xl mx-auto  rounded-lg p-6">
          <Outlet />
        </div>
      </div>
    </>
  );
}

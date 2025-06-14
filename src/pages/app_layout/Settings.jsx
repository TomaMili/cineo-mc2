import { NavLink, Outlet } from "react-router-dom";
import SettingsAvatar from "../../features/settings/SettingsAvatar";
import Spinner from "../../ui/Spinner";
import ErrorNotice from "../../ui/ErrorNotice";
import { useCurrentUser } from "../../hooks/useAuth";

export default function Settings() {
  const { profile, isLoading, isError } = useCurrentUser();

  if (isError)
    return (
      <div className="flex items-center justify-center h-screen bg-siva-800">
        <ErrorNotice title="Couldn't load Profile" message={isError.message} />
      </div>
    );

  if (isLoading)
    return (
      <div className="h-screen -m-24 flex justify-center items-center">
        <Spinner size={46} />
      </div>
    );

  return (
    <>
      <div
        className="w-full bg-cover bg-center -mt-24 "
        style={{ backgroundImage: "url(/bg-image.jpg)" }}
      >
        <h1 className="text-4xl font-medium text-white text-center pt-26 sm:pt-10 sm:pb-40 mb-8">
          SETTINGS
        </h1>
        <div className="flex justify-center items-end">
          <SettingsAvatar name={profile.username} />
        </div>
      </div>

      <div className="bg-siva-800 pt-12 pb-12 sm:px-0 px-4">
        <nav className="max-w-3xl mx-auto flex bg-gray-500/40  rounded-full overflow-hidden mb-20 text-sm sm:text-md">
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
                    : "text-siva-300 hover:bg-bordo-400 hover:text-white"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="w-full sm:max-w-6xl mx-auto  rounded-lg sm:p-6">
          <Outlet />
        </div>
      </div>
    </>
  );
}

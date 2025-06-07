import React from "react";
import { useAllProviders } from "../../hooks/useAllProviders";
import { useCurrentUser } from "../../hooks/useAuth";
import { useUpdateUser } from "./useUpdateUser";
import ErrorNotice from "../../ui/ErrorNotice";
import Spinner from "../../ui/Spinner";

export default function SettingsPlatforms() {
  const {
    data: allProviders = [],
    isLoading: isAllLoading,
    isError: isAllError,
    error: allError,
  } = useAllProviders();

  const {
    profile,
    isLoading: isProfileLoading,
    isError: isProfileError,
    error: profileError,
  } = useCurrentUser();

  const { updateUser, isUpdating } = useUpdateUser();

  if (isAllError || isProfileError) {
    return (
      <div className="flex items-center justify-center h-screen bg-siva-800">
        <ErrorNotice
          title="Couldn't load Platforms"
          message={(allError || profileError).message}
        />
      </div>
    );
  }
  if (isAllLoading || isProfileLoading) {
    return (
      <div className="h-full -m-24 flex justify-center items-center">
        <Spinner size={46} />
      </div>
    );
  }

  const selected = profile?.platforms ?? [];

  const toggle = (id) => {
    const next = selected.includes(id)
      ? selected.filter((p) => p !== id)
      : [...selected, id];
    updateUser({ platforms: next });
  };

  return (
    <div
      className={`
        grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8  lg:grid-cols-9 xl:grid-cols-10 gap-2 overflow-auto px-1 py-2
        ${isUpdating ? "opacity-50 pointer-events-none" : ""}
      `}
    >
      {allProviders.map((p) => {
        const isSelected = selected.includes(p.id);
        return (
          <button
            key={p.id}
            onClick={() => toggle(p.id)}
            className={`
              p-1 rounded-2xl flex items-center justify-center
              hover:bg-bordo-400 cursor-pointer
              ${
                isSelected ? "border-bordo-500 bg-bordo-500" : "border-gray-600"
              }
            `}
          >
            <img
              src={p.logo}
              alt={p.label}
              className={`
                max-h-30 w-full rounded-2xl object-contain
                ${isSelected ? "grayscale-0" : "grayscale"}
              `}
            />
          </button>
        );
      })}
    </div>
  );
}

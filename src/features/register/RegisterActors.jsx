import { useEffect } from "react";
import { useRegistrationContext } from "./RegistrationContext";
import SearchPeopleInput from "../../features/supersuggestion/SearchPeopleInput";

export default function RegisterActors() {
  const { data, update } = useRegistrationContext();
  const { actors } = data;

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("step-valid", { detail: actors.length > 0 })
    );
  }, [actors]);

  const toggleActor = (name) => {
    if (actors.includes(name)) {
      update({ actors: actors.filter((a) => a !== name) });
    } else {
      update({ actors: [...actors, name] });
    }
  };

  return (
    <div className="flex flex-col h-[60dvh] gap-5">
      {/* Top section: 25% height */}
      <div className="h-3/7">
        <SearchPeopleInput
          type="Actors"
          selected={actors}
          onSelect={toggleActor}
          className="h-full overflow-hidden"
        />
      </div>

      {/* Bottom section: 75% height with vertical scroll */}
      <div className="h-4/7 overflow-y-scroll flex flex-col gap-2 p-2 border-2 rounded-md border-bordo-600/20">
        {actors.map((name) => (
          <div
            key={name}
            className="flex items-center justify-between bg-bordo-600/80 px-3 py-2 rounded-lg text-sm text-white h-10 "
          >
            <span className="truncate">{name}</span>
            <button
              onClick={() => toggleActor(name)}
              className="ml-2 text-white hover:text-red-300 cursor-pointer"
              aria-label={`Remove ${name}`}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

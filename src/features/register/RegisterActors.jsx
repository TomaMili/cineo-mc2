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
    <div className="space-y-6">
      <SearchPeopleInput
        type="Actors"
        selected={actors}
        onSelect={toggleActor}
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {actors.map((name) => (
          <div
            key={name}
            className="flex items-center justify-between bg-bordo-600/80 px-3 py-2 rounded-lg text-sm text-white"
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

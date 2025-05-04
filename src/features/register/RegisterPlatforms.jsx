import { useEffect } from "react";
import { useRegistrationContext } from "./RegistrationContext";
import { useAllProviders } from "../../hooks/useAllProviders";

export default function RegisterPlatforms() {
  const { data: formData, update } = useRegistrationContext();
  const selected = formData.platforms || [];

  // Fetch all available providers
  const { data: allProviders = [], isLoading } = useAllProviders();

  function toggle(id) {
    update({
      platforms: selected.includes(id)
        ? selected.filter((p) => p !== id)
        : [...selected, id],
    });
  }

  // Signal step validity when at least one is selected
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("step-valid", { detail: selected.length > 0 })
    );
  }, [selected]);

  if (isLoading) return <p>Loading platforms…</p>;

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6  lg:grid-cols-7 xl:grid-cols-8 gap-2">
      {allProviders.map((p) => (
        <button
          key={p.id}
          onClick={() => toggle(p.id)}
          className={`
            p-1 rounded-2xl flex items-center justify-center
            hover:bg-bordo-400 cursor-pointer
            ${
              selected.includes(p.id)
                ? "border-bordo-500 bg-bordo-500"
                : "border-gray-600"
            }
          `}
        >
          <img
            src={p.logo}
            alt={p.label}
            className={`
              max-h-26 w-full rounded-2xl object-contain
              ${selected.includes(p.id) ? "grayscale-0" : "grayscale"}
            `}
          />
        </button>
      ))}
    </div>
  );
}

import { useEffect } from "react";
import { useRegistrationContext } from "./RegistrationContext";

const PLATFORMS = [
  { id: "netflix", label: "Netflix" },
  { id: "prime", label: "Prime Video" },
  { id: "hbo", label: "HBO Max" },
  { id: "disney", label: "Disney+" },
  { id: "hulu", label: "Hulu" },
  { id: "apple", label: "Apple TV+" },
];

export default function RegisterPlatforms() {
  const { data, update } = useRegistrationContext();
  const { platforms } = data;

  function toggle(id) {
    update({
      platforms: platforms.includes(id)
        ? platforms.filter((p) => p !== id)
        : [...platforms, id],
    });
  }

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("step-valid", { detail: platforms.length > 0 })
    );
  }, [platforms]);

  return (
    <div className="grid grid-cols-2 gap-4">
      {PLATFORMS.map((p) => (
        <div
          key={p.id}
          onClick={() => toggle(p.id)}
          className={`cursor-pointer p-4 rounded-lg text-center border transition ${
            platforms.includes(p.id)
              ? "border-bordo-500 bg-bordo-500/20"
              : "border-gray-600"
          }`}
        >
          {p.label}
        </div>
      ))}
    </div>
  );
}

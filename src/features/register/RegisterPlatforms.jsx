import { useEffect } from "react";
import { useRegistrationContext } from "./RegistrationContext";

const PLATFORMS = [
  { id: "netflix", label: "Netflix", logo: "/netflix-logo.png" },
  { id: "prime-video", label: "Prime Video", logo: "/prime-video-logo.png" },
  { id: "hbo-max", label: "HBO Max", logo: "/hbo-max-logo.png" },
  { id: "disney+", label: "Disney+", logo: "/disney-logo.png" },
  { id: "hulu", label: "Hulu", logo: "/hulu-logo.png" },
  { id: "apple-tv+", label: "Apple TV+", logo: "/appletv-logo.png" },
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
    <div className="grid grid-cols-3 gap-3">
      {PLATFORMS.map((p) => (
        <button
          key={p.id}
          onClick={() => toggle(p.id)}
          className={`p-1 rounded-lg flex items-center justify-center hover:bg-bordo-400 cursor-pointer ${
            platforms.includes(p.id)
              ? "border-bordo-500 bg-bordo-500"
              : "border-gray-600"
          } `}
        >
          <img
            src={p.logo}
            alt={p.label}
            className="max-h-26 w-full object-contain"
          />
        </button>
      ))}
    </div>
  );
}

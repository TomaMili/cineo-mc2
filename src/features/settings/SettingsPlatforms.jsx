// src/features/settings/SettingsPlatforms.jsx

const platforms = [
  { id: "netflix", label: "Netflix", logo: "/netflix-logo.png" },
  { id: "prime-video", label: "Prime Video", logo: "/prime-video-logo.png" },
  { id: "hbo-max", label: "HBO Max", logo: "/hbo-max-logo.png" },
  { id: "disney+", label: "Disney+", logo: "/disney-logo.png" },
  { id: "hulu", label: "Hulu", logo: "/hulu-logo.png" },
  { id: "apple-tv+", label: "Apple TV+", logo: "/appletv-logo.png" },
];

function PlatformGrid({ title, items }) {
  return (
    <div className="max-w-md mx-auto bg-black/80 rounded-lg p-6 text-white">
      <h2 className="text-2xl font-semibold text-center pb-6">{title}</h2>
      <div className="grid grid-cols-2 gap-4">
        {items.map((p) => (
          <button
            key={p.id}
            className="  p-2 rounded-lg flex items-center justify-center hover:bg-bordo-400 cursor-pointer"
          >
            <img
              src={p.logo}
              alt={p.label}
              className="max-h-20 object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function SettingsPlatforms() {
  return (
    <div className="space-y-12">
      <PlatformGrid title="Platforms you use" items={platforms} />
      <PlatformGrid title="Notify me for these platforms" items={platforms} />
    </div>
  );
}

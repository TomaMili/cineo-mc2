// src/features/settings/SettingsPlatforms.jsx

const platforms = [
  "netflix",
  "prime video",
  "hbo max",
  "disney+",
  "hulu",
  "apple tv+",
];

export default function SettingsPlatforms() {
  return (
    <div className="space-y-12">
      <div className="max-w-md mx-auto bg-black/80 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-semibold text-center pb-6">
          Platforms you use
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {platforms.map((p) => (
            <button
              key={p}
              className="border rounded-lg py-4 text-lg hover:bg-bordo-400 cursor-pointer"
            >
              {p.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
      <div className="max-w-md mx-auto bg-black/80 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-semibold text-center pb-6">
          Notify me for these platforms
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {platforms.map((p) => (
            <button
              key={p + "-notify"}
              className="border rounded-lg py-4 text-lg hover:bg-bordo-400"
            >
              {p.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

import {
  BarChart,
  Bar,
  XAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

// full names for tooltip
const dayNames = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
  Sun: "Sunday",
};

// genre → colour
const genreColors = {
  Drama: "#DC2626",
  "Sci-Fi": "#FBBF24",
  SciFi: "#FBBF24", // alias so your dummy data works
  Comedy: "#6B21A8",
  Other: "#9CA3AF",
};

// -------- custom tooltip UI --------
const TooltipContent = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg bg-gray-800/90 backdrop-blur px-4 py-2 shadow-lg">
      <p className="text-xs text-white/70 mb-1">{dayNames[label] || label}</p>
      {payload.map(
        (entry) =>
          entry.value > 0 && (
            <div key={entry.name} className="flex items-center gap-2 text-sm">
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ backgroundColor: genreColors[entry.name] || "#888" }}
              />
              <span className="text-white/90">{entry.name}</span>
              <span className="ml-auto text-white">{entry.value}</span>
            </div>
          )
      )}
    </div>
  );
};

export default function ActivityChart({ data = [] }) {
  // genres = every key except "day"
  const genres = Array.from(
    new Set(data.flatMap((d) => Object.keys(d).filter((k) => k !== "day")))
  );

  // ensure missing genre keys are zero so Recharts stacks properly
  const normalised = data.map((d) =>
    Object.fromEntries([["day", d.day], ...genres.map((g) => [g, d[g] ?? 0])])
  );

  return (
    <div className="w-84 h-52 bg-siva-800 rounded-lg px-3 py-4 overflow-visible shadow-2xl">
      <h3 className="text-white text-center mb-3 tracking-wide">ACTIVITY</h3>

      <ResponsiveContainer width="100%" height="80%">
        <BarChart data={normalised} barGap={2}>
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#fff", fontSize: 12 }}
          />

          <RechartsTooltip
            cursor={{ fill: "rgba(255,255,255,0.05)" }}
            content={<TooltipContent />}
            wrapperStyle={{ zIndex: 1000 }}
          />

          {genres.map((genre) => (
            <Bar key={genre} dataKey={genre} stackId="a" radius={[2, 2, 0, 0]}>
              {normalised.map((_, i) => (
                <Cell
                  key={`cell-${i}`}
                  fill={genreColors[genre] || "#888"}
                  // bar hover effect
                  className="transition-all duration-200 hover:opacity-90 hover:drop-shadow-md"
                />
              ))}
            </Bar>
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

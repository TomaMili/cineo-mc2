import {
  BarChart,
  Bar,
  XAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const baseColors = [
  "#b91c1c", // muted red (bordo-400)
  "#d97706", // burnt orange
  "#b45309", // earthy amber
  "#a16207", // mustard
  "#15803d", // muted emerald
  "#0f766e", // desaturated teal
  "#2563eb", // softened blue
  "#1e40af", // royal blue
  "#6d28d9", // deep purple
  "#7c3aed", // muted violet
  "#9333ea", // dusty grape
  "#c026d3", // dusty pink-purple
  "#db2777", // antique rose
  "#e11d48", // crimson red
  "#881337", // dark burgundy
  "#6b7280", // slate gray
  "#52525b", // deep gray
  "#374151", // onyx
  "#3f3f46", // charcoal gray
  "#171717", // near-black
];
const genreColor = (g) => {
  if (g === "Other") return "#9CA3AF";

  let hash = 5381;
  for (let i = 0; i < g.length; i++) {
    hash = (hash * 33) ^ g.charCodeAt(i);
  }

  const index = Math.abs(hash) % baseColors.length;
  return baseColors[index];
};

const dayNames = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
  Sun: "Sunday",
};

const TooltipContent = ({ active, payload, label }) =>
  active && payload?.length ? (
    <div className="rounded bg-gray-800/90 backdrop-blur px-4 py-2 shadow-lg">
      <p className="text-xs text-white/70 mb-1">{dayNames[label] || label}</p>
      {payload
        .filter((p) => p.value > 0)
        .map((e) => (
          <div key={e.name} className="flex items-center gap-2 text-sm">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ background: genreColor(e.name) }}
            />
            <span className="text-white/90">{e.name}</span>
            <span className="ml-auto text-white">{e.value}</span>
          </div>
        ))}
    </div>
  ) : null;

function ActivityChart({ data = [] }) {
  const genres = Array.from(
    new Set(data.flatMap((d) => Object.keys(d).filter((k) => k !== "day")))
  );

  const normalised = data.map((d) => {
    const obj = { day: d.day };
    genres.forEach((g) => (obj[g] = d[g] ?? 0));
    return obj;
  });

  return (
    <div className="w-full sm:w-1/2 h-44 sm:h-60 bg-black/20 rounded-xl px-3 py-4 shadow-lg shadow-siva-300/5">
      <h3 className="text-siva-100 text-center mb-3 tracking-wide">ACTIVITY</h3>

      <ResponsiveContainer width="100%" height="80%">
        <BarChart data={normalised} barGap={2}>
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "gray", fontSize: 14 }}
          />

          <RechartsTooltip
            cursor={{ fill: "rgba(255,255,255,0.05)" }}
            content={<TooltipContent />}
            wrapperStyle={{ zIndex: 1000 }}
          />

          {genres.map((g) => (
            <Bar key={g} dataKey={g} stackId="a" radius={[2, 2, 0, 0]}>
              {normalised.map((_, i) => (
                <Cell
                  key={i}
                  fill={genreColor(g)}
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

export default ActivityChart;

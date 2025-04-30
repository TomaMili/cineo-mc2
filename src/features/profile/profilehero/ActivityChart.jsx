import {
  BarChart,
  Bar,
  XAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

/* ─── nice colours: same 20-colour palette ─────────────── */
const baseColors = [
  "#DC2626",
  "#FBBF24",
  "#6B21A8",
  "#1D4ED8",
  "#059669",
  "#EA580C",
  "#D946EF",
  "#14B8A6",
  "#F43F5E",
  "#52525B",
  "#B91C1C",
  "#F59E0B",
  "#7C3AED",
  "#2563EB",
  "#047857",
  "#C2410C",
  "#A21CAF",
  "#0E7490",
  "#BE123C",
  "#374151",
];
const genreColor = (g) => {
  if (g === "Other") return "#9CA3AF";
  let h = 0;
  for (let i = 0; i < g.length; i++)
    h = (h + g.charCodeAt(i)) % baseColors.length;
  return baseColors[h];
};

/* ─── tooltip helper ───────────────────────────────────── */
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

/* ─── chart component ─────────────────────────────────── */
function ActivityChart({ data = [] }) {
  const genres = Array.from(
    new Set(data.flatMap((d) => Object.keys(d).filter((k) => k !== "day")))
  );

  /* ensure every bar stack gets zeros for missing keys */
  const normalised = data.map((d) => {
    const obj = { day: d.day };
    genres.forEach((g) => (obj[g] = d[g] ?? 0));
    return obj;
  });

  return (
    <div className="w-84 h-52 bg-siva-800 rounded-lg px-3 py-4 shadow-2xl">
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

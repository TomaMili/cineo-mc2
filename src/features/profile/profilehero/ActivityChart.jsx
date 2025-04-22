// src/features/profile/ActivityChart.jsx
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

// map single‐letter day codes to full names
const dayMap = {
  M: "Monday",
  T: "Tuesday",
  W: "Wednesday",
  T2: "Thursday",
  F: "Friday",
  S: "Saturday",
  S2: "Sunday",
};

// pick your genre → color mapping
const genreColors = {
  Drama: "#DC2626",
  "Sci‑Fi": "#FBBF24",
  Comedy: "#6B21A8",
  Other: "#D1D5DB",
};

export default function ActivityChart({ data = [] }) {
  // figure out which keys in your data are genres
  const genres =
    data.length > 0 ? Object.keys(data[0]).filter((k) => k !== "day") : [];

  return (
    <div className="w-64 h-32 bg-black rounded-lg p-2 overflow-visible">
      <h3 className="text-white text-center mb-1">ACTIVITY</h3>
      <ResponsiveContainer width="100%" height="80%">
        <BarChart data={data}>
          <XAxis
            dataKey="day"
            tick={{ fill: "white" }}
            axisLine={false}
            // show full name on hover of the axis label
            tickFormatter={(d) => d}
          />

          <RechartsTooltip
            // show full Day name
            labelFormatter={(label) => dayMap[label] || label}
            // list each genre/value in the default list
            formatter={(value, name) => [`${value}`, name]}
            contentStyle={{ backgroundColor: "#1F2937", border: "none" }}
            itemStyle={{ color: "#fff" }}
            wrapperStyle={{ zIndex: 999 }}
          />

          {genres.map((genre) => (
            <Bar
              key={genre}
              dataKey={genre}
              stackId="a"
              name={genre}
              fill={genreColors[genre] || "#888"}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

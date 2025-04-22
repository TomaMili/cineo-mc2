// src/features/profile/ProfileHero.jsx
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as ReTooltip,
  BarChart,
  Bar,
  XAxis,
  Tooltip as BTooltip,
  ResponsiveContainer,
} from "recharts";
import { Icon } from "@iconify-icon/react";

const donutData = [
  { name: "Drama", value: 30, fill: "#DC2626" },
  { name: "Sci‐Fi", value: 20, fill: "#FBBF24" },
  { name: "Comedy", value: 25, fill: "#6B21A8" },
  { name: "Other", value: 20, fill: "#D1D5DB" },
];

const activity = [
  { day: "M", value: 5, color: "#6B21A8" },
  { day: "T", value: 2, color: "#D1D5DB" },
  { day: "W", value: 8, color: "#DC2626" },
  { day: "T", value: 3, color: "#D1D5DB" },
  { day: "F", value: 4, color: "#6B21A8" },
  { day: "S", value: 12, color: "#6B21A8" },
  { day: "S", value: 6, color: "#FBBF24" },
];

export default function ProfileHero() {
  return (
    <div
      className="w-full bg-cover bg-center -mt-24"
      style={{ backgroundImage: "url(/bg-image.jpg)" }}
    >
      {/* Title */}
      <h2 className="text-4xl font-bold text-white text-center pt-12">
        PROFILE
      </h2>

      <div className="max-w-6xl mx-auto px-6 flex items-center justify-around flex-wrap gap-5 pt-50">
        {/* Avatar card */}
        <div className="relative bg-black/80 rounded-2xl px-8 pb-12 w-72 -mb-1">
          <img
            src="/profile-avatar.png"
            alt="avatar"
            className="w-48 h-48 rounded-full border-4 border-black object-cover mx-auto -mt-24"
          />
          <h3 className="mt-4 text-2xl font-semibold text-center text-white">
            Username
          </h3>
          <p className="text-center text-lg uppercase text-gray-300 mt-1">
            The Adventurer
          </p>
          <div className="mt-4 flex flex-col items-center text-yellow-400">
            <Icon
              icon="material-symbols:trophy-outline-sharp"
              width="36"
              height="36"
            />
            <span className="text-lg text-gray-200">8/45</span>
          </div>
        </div>

        {/* Charts */}
        <div className="flex flex-col items-center gap-6 ">
          {/* Interactive Pie (with hover tooltip) */}
          <div className="w-40 h-40 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  isAnimationActive
                >
                  {donutData.map((e) => (
                    <Cell key={e.name} fill={e.fill} />
                  ))}
                </Pie>
                {/* Hover tooltip to show name + value */}
                <ReTooltip
                  formatter={(value, name) => [`${value}`, name]}
                  contentStyle={{ backgroundColor: "#1F2937", border: "none" }}
                  itemStyle={{ color: "#fff" }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center ">
              <span className="text-2xl font-bold text-white">95</span>
              <span className="text-xs uppercase text-gray-300">
                movies watched
              </span>
            </div>
          </div>

          {/* Activity bar */}
          <div className="w-64 h-32 bg-black/60 rounded-lg p-2 gap-y-6">
            <h3 className="text-white text-center mb-1">ACTIVITY</h3>
            <ResponsiveContainer width="100%" height="80%">
              <BarChart data={activity}>
                <XAxis
                  dataKey="day"
                  tick={{ fill: "white" }}
                  axisLine={false}
                />
                <BTooltip
                  contentStyle={{ backgroundColor: "#1F2937", border: "none" }}
                  itemStyle={{ color: "#fff" }}
                />
                <Bar dataKey="value">
                  {activity.map((a) => (
                    <Cell key={a.day} fill={a.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

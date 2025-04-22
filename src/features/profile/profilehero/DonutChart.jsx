// src/features/profile/DonutChart.jsx

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const { name, value } = payload[0];
    return (
      <div className="bg-[#1F2937] text-white text-sm px-2 py-1 rounded z-50">
        {`${name}: ${value}`}
      </div>
    );
  }
  return null;
}

export default function DonutChart({
  data = [],
  total = 0,
  innerRadius = 70,
  outerRadius = 100,
}) {
  return (
    <div className="w-60 h-60 relative overflow-visible">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            startAngle={0}
            endAngle={360}
            isAnimationActive
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.fill} />
            ))}
          </Pie>
          <RechartsTooltip
            content={<CustomTooltip />}
            wrapperStyle={{ zIndex: 999 }}
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="absolute w-[140px] h-[140px] bg-black rounded-full pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center">
          <span className="text-3xl font-bold text-white">{total}</span>
          <span className="text-xs uppercase text-gray-300">
            movies watched
          </span>
        </div>
      </div>
    </div>
  );
}

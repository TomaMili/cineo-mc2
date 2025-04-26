import {
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";

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

function DonutChart({
  data = [],
  total = 0,
  innerRadius = 100,
  outerRadius = 135,
}) {
  const navigate = useNavigate();

  return (
    <div className="w-80 h-80 relative overflow-visible">
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

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute w-[200px] h-[200px] bg-siva-800 rounded-full pointer-events-none" />
        <div
          className="relative z-10 flex flex-col items-center cursor-pointer"
          onClick={() => navigate("/watched")}
          title="Go to Watched List"
        >
          <span className="text-5xl font-semibold text-white">{total}</span>
          <span className="text-lg uppercase text-gray-300">
            movies watched
          </span>
        </div>
      </div>
    </div>
  );
}

export default DonutChart;

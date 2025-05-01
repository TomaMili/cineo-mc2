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
      <div className="bg-[#1F2937] text-siva-100 text-sm px-2 py-1 rounded z-50">
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
            content={CustomTooltip}
            wrapperStyle={{ zIndex: 999 }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="absolute w-[200px] h-[200px] bg-siva-800 rounded-full pointer-events-none z-0" />
        <button
          className="relative z-10 flex flex-col items-center cursor-pointer pointer-events-auto border-none bg-transparent p-0 m-0"
          onClick={() => navigate("/watched")}
          title="Go to Watched List"
          style={{ outline: "none" }}
        >
          <span className="text-5xl font-semibold text-siva-100">{total}</span>
          <span className="text-lg uppercase text-siva-300">
            movies watched
          </span>
        </button>
      </div>
    </div>
  );
}

export default DonutChart;

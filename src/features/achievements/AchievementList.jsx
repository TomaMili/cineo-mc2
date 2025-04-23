//AchievementList.jsx
import { Icon } from "@iconify-icon/react";

export default function AchievementList({ items }) {
  return (
    <div className="space-y-2 mt-4">
      {items.map((ach) => (
        <div
          key={ach.id}
          className="flex items-center justify-between bg-red-900/80 hover:bg-red-800 transition-colors rounded-lg p-4"
        >
          <div className="flex items-center space-x-4">
            <Icon
              icon="material-symbols:trophy-outline"
              width={32}
              height={32}
              className="text-white"
            />
            <div>
              <h5 className="text-lg font-semibold text-white">{ach.title}</h5>
              <p className="text-sm text-gray-300">{ach.desc}</p>
              <p className="text-xs text-yellow-400">{ach.pct}% have this</p>
            </div>
          </div>
          <div className="text-sm text-gray-200">{ach.date}</div>
        </div>
      ))}
    </div>
  );
}

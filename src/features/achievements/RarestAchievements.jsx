//RarestAchievements.jsx
import { Icon } from "@iconify-icon/react";

export default function RarestAchievements({ items }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-8">
      {items.map((ach) => (
        <div
          key={ach.id}
          className="bg-red-800 rounded-lg p-6 flex flex-col items-center text-center space-y-4"
        >
          <Icon
            icon="material-symbols:trophy-outline"
            width={48}
            height={48}
            className="text-white"
          />
          <h4 className="text-xl font-bold text-white">{ach.title}</h4>
          <p className="text-sm text-gray-200">{ach.desc}</p>
          <p className="text-sm text-gray-100">{ach.date}</p>
          <p className="text-yellow-400 text-sm">
            {ach.pct}% of users have this achievement
          </p>
        </div>
      ))}
    </div>
  );
}

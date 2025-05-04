import clsx from "clsx";
import { Icon } from "@iconify-icon/react";
import IconWithSkeleton from "../header/IconWithSkeleton"; // ← adjust if header lives elsewhere

const ICON_SIZE = 30;

const diffToHms = (to) => {
  const s = Math.max(0, Math.floor((to - Date.now()) / 1000));
  return `${String(Math.floor(s / 3600)).padStart(2, "0")}h ${String(
    Math.floor((s % 3600) / 60)
  ).padStart(2, "0")}m ${String(s % 60).padStart(2, "0")}s`;
};

export default function RoomCard({ room, onEnter }) {
  const allReady =
    room.readyIds.length === room.members.length && room.members.length > 0;

  return (
    <div
      className={clsx(
        "relative w-[270px] md:w-[300px] rounded-xl p-5 bg-[#1a0d0d]/70 backdrop-blur-lg",
        "border border-white/15 hover:border-bordo-500 transition group"
      )}
    >
      {allReady ? (
        <Icon
          icon="mdi:check-circle"
          className="absolute top-4 right-4 text-green-500"
          width={24}
        />
      ) : (
        <Icon
          icon="material-symbols:pending"
          className="absolute top-4 right-4 text-white"
          width={24}
        />
      )}

      <h3 className="text-2xl font-medium mb-3 line-clamp-1">{room.name}</h3>

      <p className="mb-1 text-sm">Members:</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {room.members.map((m) => (
          <IconWithSkeleton
            key={m.id}
            icon="ix:user-profile"
            width={ICON_SIZE}
            height={ICON_SIZE}
            src={m.avatar}
            className="rounded-full border-2 border-white/20 object-cover"
          />
        ))}
      </div>

      <div className="text-xs space-y-1">
        <p>
          Time Left :{" "}
          <span className="font-semibold">{diffToHms(room.endsAt)}</span>
        </p>
        <p>
          Room Type : <span className="font-semibold">{room.type}</span>
        </p>
      </div>

      <div className="flex items-center justify-between mt-4">
        <p className="text-xs">
          Movie Limit (pp) : <span className="font-semibold">{room.limit}</span>
        </p>
        <button
          onClick={() => onEnter(room.id)}
          className="px-6 py-1.5 text-sm rounded bg-bordo-500 hover:bg-bordo-400 whitespace-nowrap cursor-pointer transition-colors duration-200"
        >
          Enter
        </button>
      </div>
    </div>
  );
}

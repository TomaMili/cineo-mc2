import clsx from "clsx";
import { Users } from "lucide-react";

export default function RoomCard({ room, onEnter }) {
  const readyCount = Number(room.ready_count ?? 0);
  const memberCount = Number(room.member_count ?? 0);

  const allReady = memberCount > 0 && readyCount === memberCount;
  console.log(room);
  return (
    <div
      className={clsx(
        "rounded-2xl p-6 backdrop-blur-md transition",
        "  backdrop-blur-2xl shadow-md ring-2",
        allReady
          ? " ring-green-700 bg-green-800/30"
          : "bg-bordo-400/5 ring-bordo-700"
      )}
    >
      <h2 className="text-3xl font-medium mb-3 line-clamp-1">{room.name}</h2>

      <div className="flex items-center gap-2 text-sm text-slate-300 mb-4">
        <Users size={16} /> {room.ready_count} / {room.member_count} ready
      </div>

      <p className="text-xs text-slate-400">
        {room.room_type} • limit {room.movie_limit} / user
      </p>

      <button
        onClick={() => onEnter(room.id)}
        className={clsx(
          "mt-5 w-full py-2 rounded-lg  text-white text-sm font-semibold cursor-pointer transition-all duration-300",
          allReady
            ? "bg-green-700 hover:bg-green-600"
            : "bg-bordo-600 hover:bg-bordo-500"
        )}
      >
        Enter
      </button>
    </div>
  );
}

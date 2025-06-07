import clsx from "clsx";
import { Users } from "lucide-react";

export default function RoomCard({ room, onEnter }) {
  const allReady =
    room.ready_count === room.member_count && room.member_count > 0;

  return (
    <div
      className={clsx(
        "rounded-2xl p-6 border backdrop-blur-md cursor-pointer transition",
        "border-white/10 bg-slate-800/60",
        allReady ? "ring-2 ring-green-400" : "hover:bg-slate-700/50"
      )}
      onClick={() => onEnter(room.id)}
    >
      <h2 className="text-2xl font-semibold mb-3 line-clamp-1">{room.name}</h2>

      <div className="flex items-center gap-2 text-sm text-slate-300 mb-4">
        <Users size={16} /> {room.ready_count}/{room.member_count} ready
      </div>

      <p className="text-xs text-slate-400">
        {room.room_type} • limit {room.movie_limit}/user
      </p>

      <button className="mt-5 w-full py-2 rounded-lg bg-bordo-600 hover:bg-bordo-500 text-white text-sm font-semibold">
        Enter
      </button>
    </div>
  );
}

import { useState } from "react";
import clsx from "clsx";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Icon } from "@iconify/react";
import { useRemoveMovieFromWatchRoom } from "../../hooks/useWatchTogetherMovies";
import MovieCard from "../../ui/MovieCard";

export default function MemberRow({ member, movies, limit, isMe, roomId }) {
  const [open, setOpen] = useState(false);
  const removeMovie = useRemoveMovieFromWatchRoom(roomId); // ✅ fix

  return (
    <div
      className={clsx(
        "rounded-lg overflow-hidden transition-colors",
        isMe
          ? member.is_ready
            ? "bg-bordo-700"
            : "bg-siva-800"
          : member.is_ready
          ? "bg-bordo-600"
          : "bg-siva-900"
      )}
    >
      <button
        className="flex justify-between w-full px-6 py-3"
        onClick={() => setOpen((o) => !o)}
      >
        <div className="flex items-center gap-4">
          <Icon
            icon="ix:user-profile"
            width={50}
            height={50}
            className="text-siva-200"
          />
          <div className="text-left">
            <p className="text-lg font-semibold">
              {isMe ? "You" : member.username}
            </p>
            <p className="text-xs text-slate-400">
              {member.is_ready ? "Ready" : "Waiting..."}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          Movies ({movies.length}/{limit})
          {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </button>

      {open && (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 px-6 pb-6">
          {movies.length === 0 ? (
            <p className="text-siva-300 col-span-full">No movies yet</p>
          ) : (
            movies.map((m) => (
              <MovieCard
                key={m.dbId ?? m.id}
                movie={m}
                onRemove={isMe ? () => removeMovie.mutate(m.dbId) : undefined}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}

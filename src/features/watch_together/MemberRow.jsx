import { useState } from "react";
import clsx from "clsx";
import {
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Clock,
  Film,
} from "lucide-react";
import { Icon } from "@iconify/react";

export default function MemberRow({ member, movies, limit, isMe }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={clsx(
        "rounded-lg transition-colors",
        isMe
          ? member.is_ready
            ? "bg-bordo-700" // you ready
            : "bg-siva-800" // you waiting
          : member.is_ready
          ? "bg-bordo-600" // other ready
          : "bg-siva-900" // other waiting
      )}
    >
      {/* Header row */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-6 py-3"
      >
        <div className="flex items-center gap-4">
          <Icon
            icon="ix:user-profile"
            width="50"
            height="50"
            className="rounded-full p-1 text-siva-200"
          />

          <div className="text-left">
            <p className="text-lg font-semibold">
              {isMe ? "You" : member.username}
            </p>
            <p className="text-xs text-slate-400">
              {member.is_ready ? "Ready" : "Waiting…"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <p>
            Movies ({movies.length}/{limit})
          </p>
          {open ? (
            <ChevronUp size={18} className="transition-transform" />
          ) : (
            <ChevronDown size={18} className="transition-transform" />
          )}
        </div>
      </button>

      {/* Collapsible list of movies */}
      {open && movies.length > 0 && (
        <div className="flex gap-3 overflow-x-auto px-6 pb-4">
          {movies.map((m) => (
            <figure
              key={`${m.user_id}-${m.movie_id}`}
              className="w-[90px] shrink-0"
            >
              <img
                src={m.movies?.poster || "/no-poster.jpg"}
                alt={m.movies?.title}
                className="aspect-[2/3] w-full rounded-md object-cover shadow-md"
              />
              <figcaption className="mt-1 truncate text-xs text-slate-300">
                {m.movies?.title}
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </div>
  );
}

// src/features/watch_together/MemberRow.jsx
import { useState } from "react";
import { Icon } from "@iconify-icon/react";
import { useQuery } from "@tanstack/react-query";
import IconWithSkeleton from "../header/IconWithSkeleton";
import { fetchMovieDetails } from "../../services/apiTmdb";

const ICON_SIZE = 32;
const POSTER_BASE = "https://image.tmdb.org/t/p/w185";

function MoviePoster({ movie }) {
  const id = typeof movie === "number" ? movie : null;

  const { data } = useQuery({
    queryKey: ["movie-mini", id],
    queryFn: ({ signal }) => fetchMovieDetails(id, signal),
    enabled: !!id,
    staleTime: 1000 * 60 * 60,
  });

  const obj =
    typeof movie === "object"
      ? movie
      : typeof movie === "string"
      ? { title: movie }
      : data ?? {};

  const title = obj.title ?? "Unknown";
  const posterUrl = obj.poster_path
    ? POSTER_BASE + obj.poster_path
    : "/placeholder.jpg";

  return (
    <div className="flex flex-col items-center w-24">
      <img src={posterUrl} alt={title} className="w-full rounded" />
      <p className="mt-1 text-xs text-center line-clamp-2">{title}</p>
    </div>
  );
}

export default function MemberRow({ member, limit, isHost }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <li
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center justify-between px-5 py-4 rounded cursor-pointer
          transition-colors duration-200
          ${
            member.ready
              ? "bg-bordo-400 transition duration-700 ease-in-out"
              : "bg-bordo-600/70 transition duration-700 ease-in-out"
          }
        `}
      >
        <div className="flex items-center gap-4 min-w-0 z-1">
          <IconWithSkeleton
            icon="ix:user-profile"
            width={ICON_SIZE}
            height={ICON_SIZE}
            src={member.avatar}
            className="rounded-full object-cover flex-shrink-0"
          />

          <div className="min-w-0">
            <p className="text-xl truncate">
              {member.name}
              {isHost && " (host)"}
            </p>
            <p className="text-sm text-siva-200 transition duration-700 ease-in-out">
              {member.ready ? "Ready" : "Waiting…"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-sm">
          <Icon icon="mdi:movie-open-outline" width={18} />
          <span>
            Movies ({member.movies.length}/{limit})
          </span>
          <Icon
            icon={open ? "mdi:chevron-up" : "mdi:chevron-down"}
            width={20}
          />
        </div>
      </li>

      {open && (
        <div className="px-10 py-4 bg-bordo-600/50 border-b border-white/10 transition duration-700 ease-in-out">
          {member.movies.length === 0 ? (
            <p className="text-siva-200 text-sm italic transition duration-700 ease-in-out">
              No movies yet
            </p>
          ) : (
            <div className="flex gap-4 overflow-x-auto transition duration-700 ease-in-out">
              {member.movies.map((m) => (
                <MoviePoster
                  key={typeof m === "object" ? m.id ?? m.title : m}
                  movie={m}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}

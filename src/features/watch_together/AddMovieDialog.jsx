// src/features/watch_together/AddMovieDialog.jsx
import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@iconify-icon/react";
import useDebounce from "../../hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { searchMovies, fetchMovieDetails } from "../../services/apiTmdb";
import { useAddMovieToWatchTogether } from "../../hooks/useWatchTogetherMovies";

const POSTER_BASE = "https://image.tmdb.org/t/p/w342";

export default function AddMovieDialog({ roomId, onClose, alreadyAdded = [] }) {
  const modalRef = useRef(null);
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  useDebounce(() => setDebounced(query.trim()), 350, [query]);

  const { data, isFetching } = useQuery({
    queryKey: ["tmdb-search", debounced],
    queryFn: ({ signal }) => searchMovies(debounced, 1, signal),
    enabled: debounced.length > 0,
  });

  const addMovie = useAddMovieToWatchTogether(roomId);

  const candidates = (data?.results || [])
    .filter((m) => m.poster_path && m.vote_average != null)
    .sort(
      (a, b) => b.vote_average - a.vote_average || b.popularity - a.popularity
    );

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => inputRef.current?.focus(), []);

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={onClose} // ← zatvori kad klikneš na tamni backdrop
    >
      <div className="absolute inset-0 bg-black/70" />
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()} // ← spriječi da klik unutar moda prođe na backdrop
        className="relative z-10 bg-siva-800 rounded-lg p-6 text-white w-11/12 max-w-4xl"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-siva-300 hover:text-white"
        >
          <Icon icon="gridicons:cross-circle" width={24} height={24} />
        </button>
        <h2 className="text-2xl font-semibold mb-4">Search & add a movie</h2>
        <div className="relative mb-6">
          <Icon
            icon="jam:search"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-siva-100/60"
            width={20}
            height={20}
          />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a title…"
            className="w-full pl-12 pr-4 py-2 bg-gray-700 rounded-lg text-white focus:ring-2 focus:ring-bordo-400"
          />
          {isFetching && (
            <Icon
              icon="mingcute:loading-fill"
              className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-siva-100/60"
              width={18}
              height={18}
            />
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 overflow-y-auto max-h-[60vh] py-4 px-2">
          {debounced && candidates.length === 0 && !isFetching && (
            <p className="col-span-full text-center text-siva-300">
              No results.
            </p>
          )}
          {candidates.map((m) => {
            const taken = alreadyAdded.includes(m.id);
            return (
              <div
                key={m.id}
                className={`relative h-60 rounded-lg bg-gray-800 transition-transform duration-200 ${
                  taken
                    ? "opacity-40 cursor-not-allowed"
                    : "cursor-pointer hover:scale-105 hover:shadow-lg"
                }`}
                onClick={async () => {
                  if (taken) return;
                  const full = await fetchMovieDetails(m.id);
                  addMovie.mutate(
                    { movie_id: m.id, tmdbMovie: full },
                    { onSuccess: onClose }
                  );
                }}
              >
                <img
                  src={POSTER_BASE + m.poster_path}
                  alt={m.title}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-xs text-white text-center py-1 px-2 rounded-b-lg">
                  <div className="font-medium line-clamp-1">{m.title}</div>
                  <div className="text-siva-200">
                    ⭐ {(m.vote_average / 2).toFixed(1)}/5
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>,
    document.body
  );
}

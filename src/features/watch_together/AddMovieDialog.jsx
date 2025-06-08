import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@iconify-icon/react";
import { useQuery } from "@tanstack/react-query";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

import useDebounce from "../../hooks/useDebounce";
import { searchMovies, fetchMovieDetails } from "../../services/apiTmdb";
import { useAddMovieToWatchRoom } from "../../hooks/useWatchTogetherMovies";

const POSTER_BASE = "https://image.tmdb.org/t/p/w342";

/* ------------------------------------------------------------------ */

export default function AddMovieDialog({ roomId, onClose, alreadyAdded = [] }) {
  /* refs & local state ------------------------------------------------ */
  const modalRef = useRef(null);
  const inputRef = useRef(null);

  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  useDebounce(() => setDebounced(query.trim()), 350, [query]);

  /* TMDB search ------------------------------------------------------- */
  const { data, isFetching } = useQuery({
    queryKey: ["tmdb-search", debounced],
    queryFn: ({ signal }) => searchMovies(debounced, 1, signal),
    enabled: debounced.length > 0,
  });

  const candidates = (data?.results || [])
    .filter((m) => m.poster_path && m.vote_average != null)
    .sort(
      (a, b) => b.vote_average - a.vote_average || b.popularity - a.popularity
    );

  /* mutation: add movie to this room ---------------------------------- */
  const addMovie = useAddMovieToWatchRoom(roomId);

  /* keyboard & focus helpers ----------------------------------------- */
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => inputRef.current?.focus(), []);

  /* add-button handler ------------------------------------------------ */
  const handleAdd = async (tmdbMovie) => {
    try {
      await addMovie.mutateAsync(tmdbMovie);
      onClose(); // close modal on success
    } catch (err) {
      console.error(err);
    }
  };

  /* ------------------------------------------------------------------ */
  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-40 bg-black/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        className="fixed left-1/2 top-1/2 z-50 w-full max-w-4xl -translate-x-1/2 -translate-y-1/2
                       rounded-lg  bg-siva-800/60 p-8 backdrop-blur-xl shadow-2xl "
        onClick={onClose}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <div
          ref={modalRef}
          onClick={(e) => e.stopPropagation()}
          className="relative z-10 "
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-siva-300 hover:text-white transition-all duration-300 cursor-pointer"
          >
            <Icon icon="gridicons:cross-circle" width={24} height={24} />
          </button>

          <h2 className="text-2xl font-semibold mb-4">
            Search &amp; add a movie
          </h2>

          {/* search input */}
          <div className="relative mb-6 ">
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
              className="w-full pl-12 pr-4 py-2 bg-gray-700 rounded-lg text-white focus:ring-2 focus:ring-bordo-500 transition-all duration-300"
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

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 overflow-y-auto h-[60vh] py-4 px-2">
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
                    handleAdd(full);
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
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}

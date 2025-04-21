import { createPortal } from "react-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify-icon/react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { poster, fetchMovieDetails } from "../services/apiTmdb";
import { useEffect } from "react";

export default function MoviePopup({ movie, onClose }) {
  const navigate = useNavigate();

  const { data: details, isLoading } = useQuery({
    queryKey: ["movie", movie?.id],
    queryFn: ({ signal }) => fetchMovieDetails(movie.id, signal),
    enabled: !!movie,
    staleTime: 1_800_000,
  });

  // ESC key closes
  useEffect(() => {
    if (!movie) return;
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [movie, onClose]);

  if (!movie) return null;
  const data = details || movie;

  return createPortal(
    <AnimatePresence>
      {/* BACKDROP */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black backdrop-blur-sm z-40"
      />

      {/* FLEX WRAPPER (no click handler – let backdrop handle) */}
      <motion.div
        key="modal"
        onClick={onClose}
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="fixed inset-0 flex items-center justify-center z-50 p-4"
      >
        {/* CARD – stop propagation only here */}
        <div
          className="flex flex-col sm:flex-row max-w-4xl w-full bg-siva-800 text-white rounded-lg overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={poster(data.poster_path, 342)}
            alt={data.title}
            onClick={() => navigate(`/movie/${movie.id}`)}
            className="w-full sm:w-60 object-cover cursor-pointer"
          />

          <div className="flex-1 p-6 space-y-4 overflow-y-auto max-h-[80vh] ">
            <h2
              className="text-4xl font-medium cursor-pointer"
              onClick={() => navigate(`/movie/${movie.id}`)}
            >
              {data.title}
            </h2>
            <div className="flex items-center gap-0 text-sm">
              <span className="text-siva-300 font-light pr-3">
                {data.release_date?.slice(0, 4)}
              </span>
              {Array.from({ length: 5 }).map((_, i) => (
                <Icon
                  key={i}
                  icon={
                    data.vote_average / 2 >= i + 1
                      ? "mdi:star"
                      : data.vote_average / 2 >= i + 0.5
                      ? "mdi:star-half-full"
                      : "mdi:star-outline"
                  }
                  width="18"
                  height="18"
                  className="text-yellow-400 pb-0.5"
                />
              ))}
              <span className="ml-2 text-xs text-siva-200 font-light">
                {(data.vote_average / 2).toFixed(1)}/5
              </span>
            </div>

            <p className="text-siva-200 font-light">
              {isLoading ? "Loading…" : data.overview}
            </p>
            <p>
              <span className="font-light text-siva-200">Starring:</span>
              {data.credits
                ? " " +
                  data.credits.cast
                    .slice(0, 3)
                    .map((c) => c.name)
                    .join(", ")
                : " —"}
            </p>
            <p>
              <span className="font-light text-siva-200">Director:</span>
              {data.credits
                ? " " +
                  (data.credits.crew.find((p) => p.job === "Director")?.name ||
                    "—")
                : " —"}
            </p>

            <div className="flex items-end justify-between pt-2">
              <span className="text-xs px-2 py-1 bg-neutral-700 rounded">
                18+
              </span>
              <button
                onClick={() => navigate(`/movie/${movie.id}`)}
                className="px-4  text-sm rounded cursor-pointer"
              >
                <div className="flex flex-col items-center pt-10 text-siva-200 font-light">
                  <p className=""> SHOW MORE</p>
                  <Icon
                    icon="weui:arrow-filled"
                    width="26"
                    height="26"
                    className="rotate-90"
                  />
                </div>
              </button>
              <div className="flex items-center gap-3">
                <Icon
                  icon="mdi:eye-outline"
                  width="24"
                  height="24"
                  className="cursor-pointer hover:text-bordo-400"
                />
                <Icon
                  icon="mdi:bookmark-outline"
                  width="24"
                  height="24"
                  className="cursor-pointer hover:text-bordo-400"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}

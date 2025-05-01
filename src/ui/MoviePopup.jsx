import { createPortal } from "react-dom";
import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify-icon/react";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { poster, fetchMovieDetails } from "../services/apiTmdb";
import PosterPlaceholder from "../utils/posterPlaceholder";
import RatingOverlay from "./RatingOverlay";
import { useIsWatched, useToggleWatched } from "../hooks/useWatched";
import { useIsInWatchLater, useToggleWatchLater } from "../hooks/useWatchLater";

export default function MoviePopup({ movie, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();

  const userId = 1; // TODO: real session id

  const watched = useIsWatched(movie?.id, userId);
  const toggleWat = useToggleWatched(userId);

  const savedWL = useIsInWatchLater(movie?.id, userId);
  const toggleWL = useToggleWatchLater(userId);

  const [showRating, setShowRating] = useState(false);
  const handleEye = () => {
    if (!watched) setShowRating(true);
    else toggleWat(movie, true);
  };
  const saveRating = (stars) => {
    toggleWat(movie, false, stars);
    setShowRating(false);
  };

  const { data: details } = useQuery({
    queryKey: ["movie", movie?.id],
    queryFn: ({ signal }) => fetchMovieDetails(movie.id, signal),
    enabled: !!movie,
    staleTime: 30 * 60 * 1000,
  });
  const data = details || movie;

  if (!movie) return null;

  function goToFullPage() {
    const target = `/movie/${movie.id}`;
    onClose();
    if (location.pathname !== target) navigate(target);
  }

  const releaseYear = data.release_date?.slice(0, 4) || "—";
  const voteFive = (data.vote_average || 0) / 2;

  return createPortal(
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {showRating && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <RatingOverlay
            onRate={(s) => saveRating(s)}
            onRateLater={() => saveRating(null)}
            onClose={() => setShowRating(false)}
          />
        </div>
      )}

      <motion.div
        key="modal"
        onClick={onClose}
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="fixed inset-0 flex items-center justify-center z-50 p-4"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex flex-col sm:flex-row max-w-4xl w-full
                     bg-siva-800 rounded-lg overflow-hidden shadow-2xl"
        >
          {data.poster_path ? (
            <img
              src={poster(data.poster_path)}
              alt={data.title}
              onClick={goToFullPage}
              className="w-full sm:w-60 object-cover cursor-pointer"
            />
          ) : (
            <PosterPlaceholder
              title={data.title}
              onClick={goToFullPage}
              className="sm:w-60 object-cover cursor-pointer bg-black/20!"
            />
          )}

          <div className="flex-1 p-6 space-y-4 overflow-y-auto max-h-[80vh]">
            <h2
              className="text-4xl font-medium cursor-pointer"
              onClick={goToFullPage}
            >
              {data.title}
            </h2>

            <div className="flex items-center gap-0 text-sm">
              <span className="text-siva-300 font-light pr-3">
                {releaseYear}
              </span>
              {Array.from({ length: 5 }).map((_, i) => (
                <Icon
                  key={i}
                  icon={
                    voteFive >= i + 1
                      ? "mdi:star"
                      : voteFive >= i + 0.5
                      ? "mdi:star-half-full"
                      : "mdi:star-outline"
                  }
                  width="18"
                  height="18"
                  className="text-yellow-400 pb-0.5"
                />
              ))}
              <span className="ml-2 text-xs text-siva-200 font-light">
                {voteFive.toFixed(1)}/5
              </span>
            </div>

            <p className="text-siva-200 font-light">
              {details ? data.overview : "Loading…"}
            </p>

            {data.credits && (
              <>
                <p>
                  <span className="font-light text-siva-200">Starring:</span>{" "}
                  {data.credits.cast
                    .slice(0, 3)
                    .map((c) => c.name)
                    .join(", ")}
                </p>
                <p>
                  <span className="font-light text-siva-200">Director:</span>{" "}
                  {data.credits.crew.find((p) => p.job === "Director")?.name ||
                    "—"}
                </p>
              </>
            )}

            <div className="flex items-end justify-between pt-2">
              <span className="text-xs px-2 py-1 text-white bg-neutral-700 rounded">
                18+
              </span>

              <button
                onClick={goToFullPage}
                className="px-4 text-sm rounded cursor-pointer"
              >
                <div className="flex flex-col items-center pt-10 text-siva-200 font-light">
                  <p>SHOW MORE</p>
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
                  icon={watched ? "mdi:eye-check" : "mdi:eye-plus-outline"}
                  width="24"
                  height="24"
                  className="cursor-pointer hover:text-bordo-400"
                  title={watched ? "Remove from Watched" : "Mark watched"}
                  onClick={handleEye}
                />
                <Icon
                  icon={
                    savedWL
                      ? "material-symbols:bookmark"
                      : "mdi:bookmark-outline"
                  }
                  width="24"
                  height="24"
                  className="cursor-pointer hover:text-bordo-400"
                  title={
                    savedWL ? "Remove from Watch-Later" : "Add to Watch-Later"
                  }
                  onClick={() => toggleWL(movie, savedWL)}
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

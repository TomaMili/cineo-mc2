/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Icon } from "@iconify-icon/react";
import { useQueryClient } from "@tanstack/react-query";
import { useMoviePopup } from "../context/MoviePopupContext";
import { poster, fetchMovieDetails } from "../services/apiTmdb";
import {
  useIsInWatchLater,
  useToggleWatchLater,
} from "../features/watchlater/useWatchLater";
import { useIsWatched, useToggleWatched } from "../features/watched/useWatched";
import RatingOverlay from "./RatingOverlay";
import { useCurrentUser } from "../hooks/useAuth";
import { AnimatePresence, motion } from "framer-motion";

export default function MovieCard({ movie, hideActions = false, onClick }) {
  const qc = useQueryClient();
  const prefetch = () =>
    qc.prefetchQuery({
      queryKey: ["movie", movie.id],
      queryFn: ({ signal }) => fetchMovieDetails(movie.id, signal),
      staleTime: 10 * 60 * 1000,
    });

  const { open } = useMoviePopup();
  const handlePosterClick = onClick ?? (() => open(movie));

  const { profile } = useCurrentUser();
  const userId = profile?.id;

  const savedWL = useIsInWatchLater(movie.id, userId);
  const toggleWL = useToggleWatchLater(userId);

  const watched = useIsWatched(movie.id, userId);
  const toggleWat = useToggleWatched(userId);

  const [showRating, setShowRating] = useState(false);

  useEffect(() => {
    if (watched && showRating) setShowRating(false);
  }, [watched, showRating]);

  const handleEye = () => {
    if (!userId) return;
    if (!watched) setShowRating(!showRating);
    else open(movie);
  };

  const rateAndSave = (stars) => {
    toggleWat(movie, false, stars);
    setShowRating(false);
  };

  return (
    // <div className="group relative  sm:w-44 lg:w-48 xl:w-52 aspect-[2/3]">
    <div className="group relative w-full aspect-[2/3] lg:max-w-[200px]">
      {movie.poster_path ? (
        <img
          src={poster(movie.poster_path, 342)}
          srcSet={`
            ${poster(movie.poster_path, 92)}  92w,
            ${poster(movie.poster_path, 342)} 342w,
            ${poster(movie.poster_path, 500)} 500w
          `}
          sizes="(max-width: 640px) 50vw, 20vw"
          alt={movie.title}
          onMouseEnter={prefetch}
          onClick={handlePosterClick}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover rounded-lg cursor-pointer transition-all duration-300  ease-out hover:scale-103"
        />
      ) : (
        <div
          onClick={handlePosterClick}
          className="w-full h-full bg-gray-700 flex items-center justify-center text-sm cursor-pointer "
        >
          {movie.title}
        </div>
      )}

      <AnimatePresence>
        {showRating && !watched && (
          <motion.div
            className="absolute inset-0 mb-8 flex items-center justify-center z-20"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <RatingOverlay
              onRate={(stars) => rateAndSave(stars)}
              onRateLater={() => rateAndSave(null)}
              onClose={() => setShowRating(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-2 flex items-start justify-between">
        <p
          onClick={handlePosterClick}
          className="lg:text-sm text-lg font-medium line-clamp-1 mr-1 hover:text-bordo-400 cursor-pointer"
        >
          <span className="hidden sm:inline text-sm">{movie.title}</span>
        </p>

        {!hideActions && (
          <div className="sm:flex hidden gap-2 flex-shrink-0">
            <button
              title={watched ? "Remove from Watched" : "Mark watched"}
              onClick={handleEye}
              className="hover:text-bordo-400 cursor-pointer"
            >
              <Icon
                icon={watched ? "mdi:eye-check" : "mdi:eye-plus-outline"}
                width="18"
                height="18"
              />
            </button>

            <button
              title={savedWL ? "Remove from Watch-Later" : "Add to Watch-Later"}
              onClick={() => toggleWL(movie, savedWL)}
              className=" hover:text-bordo-400 cursor-pointer"
            >
              <Icon
                icon={
                  savedWL ? "material-symbols:bookmark" : "mdi:bookmark-outline"
                }
                width="18"
                height="18"
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

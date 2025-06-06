/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Icon } from "@iconify-icon/react";
import RatingOverlay from "../../ui/RatingOverlay";
import { useMoviePopup } from "../../context/MoviePopupContext";
import { useToggleWatched } from "./useWatched";
import { useCurrentUser } from "../../hooks/useAuth";
import { AnimatePresence, motion } from "framer-motion";
import { useShareMovie } from "../../hooks/useShareMovie";
import MovieCard from "../../ui/MovieCard";

export default function WatchedItem({ movie }) {
  const { open } = useMoviePopup();

  const { profile } = useCurrentUser();
  const userId = profile?.id;

  const toggleWatched = useToggleWatched(userId);

  const [showRating, setShowRating] = useState(false);
  const [localRating, setLocalRating] = useState(movie.userRating ?? null);

  const shareMovie = useShareMovie();

  const posterSrc = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder.jpg";

  function saveRating(stars) {
    toggleWatched(movie, false, stars);
    setLocalRating(stars);
    setShowRating(false);
  }

  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 1050px)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1050px)");
    const handler = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <div>
      <div className="relative group">
        <MovieCard
          movie={movie}
          isSaved
          isWatched={false}
          onWatchLater={() => setShowRating(true)}
          onClick={() => open(movie)}
        />

        <AnimatePresence>
          {showRating && (
            <motion.div
              className="absolute mb-2 sm:mb-8.5 inset-0 flex items-center justify-center z-20"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <RatingOverlay
                onRate={(stars) => saveRating(stars)}
                onRateLater={() => saveRating(null)}
                onClose={() => setShowRating(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div>
        <div className="mt-2 flex items-center justify-between text-sm text-siva-100">
          <div className="flex items-center  text-yellow-400  ">
            {localRating ? (
              Array.from({ length: localRating }).map((_, i) => (
                <Icon
                  key={i}
                  icon="material-symbols:star-rounded"
                  width={isMobile ? "18" : "22"}
                  height={isMobile ? "18" : "22"}
                  className="pb-2"
                />
              ))
            ) : (
              <button
                onClick={() => setShowRating(true)}
                className="text-siva-100 hover:text-bordo-400 flex items-center justify-center cursor-pointer"
                aria-label="Rate movie"
              >
                <Icon
                  icon="material-symbols:star-outline-rounded"
                  width="22"
                  height="22"
                  className="pb-2"
                />
              </button>
            )}
          </div>

          <button
            onClick={() => shareMovie(movie, movie.userRating)}
            className="text-siva-100 hover:text-bordo-400 p-1 rounded-full transition-all cursor-pointer"
            aria-label="Share movie"
          >
            <Icon icon="gridicons:share" width="18" height="18" />
          </button>
        </div>
      </div>
    </div>
  );
}

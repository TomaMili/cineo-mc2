import { useState } from "react";
import { Icon } from "@iconify-icon/react";
import RatingOverlay from "../../ui/RatingOverlay";
import { useMoviePopup } from "../../context/MoviePopupContext";
import { handleShare } from "../../utils/share";
import { useToggleWatched } from "./useWatched";
import { useCurrentUser } from "../../hooks/useAuth";

export default function WatchedItem({ movie }) {
  const { open } = useMoviePopup();

  const { profile } = useCurrentUser();
  const userId = profile?.id;

  const toggleWatched = useToggleWatched(userId);

  const [showRating, setShowRating] = useState(false);
  const [localRating, setLocalRating] = useState(movie.userRating ?? null);

  const posterSrc = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder.jpg";

  function saveRating(stars) {
    toggleWatched(movie, false, stars);
    setLocalRating(stars);
    setShowRating(false);
  }

  return (
    <div className="group relative w-40 sm:w-44 lg:w-48 xl:w-52 aspect-[2/3]">
      <img
        src={posterSrc}
        alt={movie.title}
        className="w-full h-full object-cover rounded-lg cursor-pointer transition-all duration-300 ease-out hover:scale-103"
        onClick={() => open(movie)}
      />

      {showRating && (
        <div className="absolute mb-17 inset-0 flex items-center justify-center z-20">
          <RatingOverlay
            onRate={(stars) => saveRating(stars)}
            onRateLater={() => saveRating(null)}
            onClose={() => setShowRating(false)}
          />
        </div>
      )}

      <button
        onClick={() => open(movie)}
        className="mt-2 text-sm font-medium text-siva-100 line-clamp-1 text-left hover:text-bordo-400 transition-all w-full cursor-pointer"
        title={movie.title}
      >
        {movie.title}
      </button>

      <div className="mt-2 flex items-center justify-between text-sm text-siva-100">
        <div className="flex items-center  text-yellow-400  ">
          {localRating ? (
            Array.from({ length: localRating }).map((_, i) => (
              <Icon
                key={i}
                icon="material-symbols:star-rounded"
                width="22"
                height="22"
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
              />
            </button>
          )}
        </div>

        <button
          onClick={() =>
            handleShare(
              `${window.location.origin}/movie/${movie.id}`,
              "Link copied!"
            )
          }
          className="text-siva-100 hover:text-bordo-400 p-1 rounded-full transition-all cursor-pointer"
          aria-label="Share movie"
        >
          <Icon icon="gridicons:share" width="18" height="18" />
        </button>
      </div>
    </div>
  );
}

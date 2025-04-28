// src/features/watchlater/WatchLaterItem.jsx
import { useState } from "react";
import MovieCard from "../../ui/MovieCard";
import ConfirmRemoveModal from "../../ui/ConfirmRemoveModal";
import RatingOverlay from "../../ui/RatingOverlay";
import { Icon } from "@iconify-icon/react";

/**
 * @param {Object}   movie
 * @param {Function} onSelect       – (movie)         open popup
 * @param {Function} onRemove       – (movieId)       delete from watch-later
 * @param {Function} onMarkWatched  – (movie, stars)  move to “watched” (optional)
 * @param {Function} onToggleWL     – (movie)         add/remove WL when bookmark clicked (optional)
 */
export default function WatchLaterItem({
  movie,
  onSelect,
  onRemove,
  onMarkWatched = () => {}, // harmless no-ops if parent doesn’t pass them
  onToggleWL,
}) {
  const [showRemove, setShowRemove] = useState(false);
  const [showRating, setShowRating] = useState(false);

  /* ───────────────── helpers ───────────────── */
  const handleRemove = () => {
    onRemove(movie.id);
    setShowRemove(false);
  };
  const handleRate = (stars) => {
    onMarkWatched(movie, stars);
    setShowRating(false);
  };
  const handleRateLater = () => handleRate(null);

  return (
    <div className="relative group">
      {/* ---------- confirm-delete modal ---------- */}
      {showRemove && (
        <ConfirmRemoveModal
          movie={movie}
          listName="watch later"
          onConfirm={handleRemove}
          onCancel={() => setShowRemove(false)}
        />
      )}

      {/* “X” button – fades in on hover */}
      <button
        type="button"
        onClick={() => setShowRemove(true)}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all
                   bg-black/50 p-1 rounded-full hover:bg-bordo-500 z-10 flex items-center justify-center"
      >
        <Icon
          icon="gridicons:cross-circle"
          width="24"
          height="24"
          className="text-white"
        />
      </button>

      {/* ---------- poster / card ---------- */}
      <MovieCard
        movie={movie}
        isSaved // shows filled bookmark
        isWatched={false} // we’re in the watch-later list
        onWatchLater={() => setShowRating(true)} // ↳ open rating overlay
        onBookmark={() =>
          onToggleWL
            ? onToggleWL(movie) // ↳ allow toggle if handler exists
            : setShowRemove(true)
        }
        onClick={() => onSelect(movie)}
      />

      {/* ---------- rating overlay ---------- */}
      {showRating && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <RatingOverlay onRate={handleRate} onRateLater={handleRateLater} />
        </div>
      )}
    </div>
  );
}

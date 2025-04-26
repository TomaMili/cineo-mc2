//WatchLaterItem.jsx
import { useState } from "react";
import MovieCard from "../../ui/MovieCard";
import ConfirmRemoveModal from "./ConfirmRemoveModal";
import RatingOverlay from "./RatingOverlay";
import { Icon } from "@iconify-icon/react";

export default function WatchLaterItem({
  movie,
  onSelect,
  onRemove,
  onMarkWatched,
  onToggleWL,
}) {
  const [showRemove, setShowRemove] = useState(false);
  const [showRating, setShowRating] = useState(false);

  return (
    <div className="relative group">
      {showRemove && (
        <ConfirmRemoveModal
          movie={movie}
          listName="watch later"
          onConfirm={() => {
            onRemove(movie);
            setShowRemove(false);
          }}
          onCancel={() => setShowRemove(false)}
        />
      )}

      {/* "×" button */}
      <button
        onClick={() => setShowRemove(true)}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all bg-black/50 p-1 rounded-full hover:bg-bordo-500 z-10 flex items-center justify-center"
      >
        <Icon
          icon="gridicons:cross-circle"
          width="24"
          height="24"
          className="text-white"
        />
      </button>

      <MovieCard
        movie={movie}
        onClick={() => onSelect(movie)}
        onWatchLater={() => setShowRating(true)}
        onBookmark={() => setShowRemove(true)}
      />
      <style jsx>{`
        .group:hover img {
          filter: blur(4px);
        }
      `}</style>

      {/* Rating overlay */}
      {showRating && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <RatingOverlay
            onRate={(stars) => {
              onMarkWatched(movie, stars);
              setShowRating(false);
            }}
            onRateLater={() => {
              onMarkWatched(movie, null);
              setShowRating(false);
            }}
          />
        </div>
      )}
    </div>
  );
}

import { useState } from "react";
import MovieCard from "../../ui/MovieCard";
import RatingOverlay from "../../ui/RatingOverlay";

function WatchLaterItem({ movie, onSelect, onMarkWatched = () => {} }) {
  const [showRating, setShowRating] = useState(false);

  const handleRate = (stars) => {
    onMarkWatched(movie, stars);
  };
  const handleRateLater = () => handleRate(null);

  return (
    <div className="relative group">
      <MovieCard
        movie={movie}
        isSaved
        isWatched={false}
        onWatchLater={() => setShowRating(true)}
        onClick={() => onSelect(movie)}
      />

      {showRating && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <RatingOverlay
            onRate={handleRate}
            onRateLater={handleRateLater}
            onClose={() => setShowRating(false)}
          />
        </div>
      )}
    </div>
  );
}

export default WatchLaterItem;

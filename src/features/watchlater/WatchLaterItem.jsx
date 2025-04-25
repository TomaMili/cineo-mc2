import React, { useState } from "react";
import { Icon } from "@iconify-icon/react";
import { poster } from "../../services/apiTmdb";
import ConfirmRemoveModal from "./ConfirmRemoveModal";
import RatingOverlay from "./RatingOverlay";

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

      {/* ✕ button */}
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

      {/* Poster */}
      <div className="overflow-hidden rounded-lg">
        <img
          src={poster(movie.poster_path, 342)}
          alt={movie.title}
          onClick={() => onSelect(movie)}
          className={`w-full transition-all duration-300 ease-out hover:scale-105 ${
            showRating ? "blur-sm" : "group-hover:blur-sm"
          }`}
        />

        {showRating && (
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
        )}
      </div>

      {/* Actions & Title */}
      <div className="mt-2 flex justify-between items-center">
        <p className="text-sm font-medium text-white line-clamp-1">
          {movie.title}
        </p>
        <div className="flex gap-3">
          {/* Mark watched */}
          <button
            onClick={() => setShowRating(true)}
            title="Mark watched"
            className="text-white hover:text-bordo-400 flex items-center"
          >
            <Icon icon="mdi:eye-plus-outline" width="20" height="20" />
          </button>
          {/* Toggle watch-later */}
          <button
            onClick={() => onToggleWL(movie)}
            title="Toggle watch later"
            className="text-white hover:text-bordo-400 flex items-center"
          >
            <Icon icon="mdi:bookmark" width="20" height="20" />
          </button>
        </div>
      </div>
    </div>
  );
}

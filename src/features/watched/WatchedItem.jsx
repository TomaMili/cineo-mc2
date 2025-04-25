// src/features/watched/WatchedItem.jsx
import React, { useState } from "react";
import { Icon } from "@iconify-icon/react";
import { poster } from "../../services/apiTmdb";
import RatingOverlay from "./RatingOverlay";
import ConfirmRemoveModal from "../watchlater/ConfirmRemoveModal";

export default function WatchedItem({ movie, onRemove }) {
  const [showRemove, setShowRemove] = useState(false);
  const [ratingMode, setRatingMode] = useState(false);

  return (
    <div className="relative group">
      {/* Remove confirmation */}
      {showRemove && (
        <ConfirmRemoveModal
          movie={movie}
          listName="watched"
          onConfirm={() => {
            onRemove(movie);
            setShowRemove(false);
          }}
          onCancel={() => setShowRemove(false)}
        />
      )}

      {/* ❌ remove-on-hover */}
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
          className={
            "w-full transition-transform duration-300 ease-out group-hover:blur-sm " +
            (ratingMode ? "blur-sm" : "")
          }
          onClick={() => setRatingMode(true)}
        />
        {ratingMode && (
          <RatingOverlay
            onRate={(stars) => {
              movie.userRating = stars;
              setRatingMode(false);
            }}
            onRateLater={() => setRatingMode(false)}
          />
        )}
      </div>

      {/* Title & Share row */}
      <div className="mt-2 flex justify-between items-center text-sm text-white">
        <p className="font-medium line-clamp-1">{movie.title}</p>
        <button
          onClick={() => {
            navigator.clipboard.writeText(
              window.location.href + `/movie/${movie.id}`
            );
            const t = document.createElement("div");
            t.innerText = "Link copied!";
            t.className =
              "fixed bottom-4 right-4 bg-bordo-500 text-white px-4 py-2 rounded shadow-lg";
            document.body.appendChild(t);
            setTimeout(() => document.body.removeChild(t), 1500);
          }}
          className="text-gray-300 hover:text-white"
        >
          <Icon
            icon="gridicons:share"
            width="18"
            height="18"
            className=" top-2 right-2  p-1 rounded-full hover:bg-bordo-500 z-10 flex items-center justify-center "
          />
        </button>
      </div>

      {/* Rating row */}
      {movie.userRating && (
        <div className="flex mt-1 space-x-1 text-yellow-400">
          {Array.from({ length: movie.userRating }).map((_, i) => (
            <Icon key={i} icon="mdi:star" width="16" height="16" />
          ))}
        </div>
      )}
      {!movie.userRating && (
        <div className="flex mt-1">
          <button
            onClick={() => setRatingMode(true)}
            className="text-white hover:text-bordo-400"
          >
            <Icon icon="mdi:star-outline" width="20" height="20" />
          </button>
        </div>
      )}
    </div>
  );
}

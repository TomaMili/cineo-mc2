import React, { useState } from "react";
import MovieCard from "../../ui/MovieCard";
import ConfirmRemoveModal from "../../ui/ConfirmRemoveModal";
import RatingOverlay from "../../ui/RatingOverlay";
import { Icon } from "@iconify-icon/react";
import { useMoviePopup } from "../../context/MoviePopupContext";

export default function WatchedItem({ movie, onRemove }) {
  const [showRemove, setShowRemove] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const { open } = useMoviePopup();

  return (
    <div className="relative group w-40 sm:w-44 lg:w-48 xl:w-52">
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

      {/* ✕ remove button on hover */}
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

      {/* Poster with hover & rating */}
      <div className="overflow-hidden rounded-lg relative aspect-[2/3]">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "/placeholder.jpg"
          }
          alt={movie.title}
          className="w-full h-full object-cover transition-all duration-300 ease-out group-hover:blur-[3px] group-hover:scale-105"
          onClick={() => setShowRating(true)}
          style={{ cursor: "pointer" }}
        />
        {showRating && (
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <RatingOverlay
              onRate={(stars) => {
                movie.userRating = stars;
                setShowRating(false);
              }}
              onRateLater={() => setShowRating(false)}
            />
          </div>
        )}
      </div>

      <button
        onClick={() => open(movie)}
        className="mt-2 text-sm font-medium text-white line-clamp-1 text-left hover:text-bordo-500  cursor-pointer transition-all"
        style={{ width: "100%" }}
        title={movie.title}
      >
        {movie.title}
      </button>

      <div className="mt-2 flex items-center justify-between text-sm text-white">
        <div className="flex items-center space-x-1 text-yellow-400">
          {movie.userRating ? (
            Array.from({ length: movie.userRating }).map((_, i) => (
              <Icon key={i} icon="mdi:star" width="16" height="16" />
            ))
          ) : (
            <button
              onClick={() => setShowRating(true)}
              className="text-white hover:text-bordo-400 flex items-center justify-center"
              aria-label="Rate movie"
            >
              <Icon icon="mdi:star-outline" width="20" height="20" />
            </button>
          )}
        </div>
        <button
          onClick={() => {
            navigator.clipboard.writeText(
              window.location.origin + `/movie/${movie.id}`
            );
            const t = document.createElement("div");
            t.innerText = "Link copied!";
            t.className =
              "fixed bottom-15 right-15 bg-bordo-500 text-white px-4 py-2 rounded shadow-lg";
            document.body.appendChild(t);
            setTimeout(() => document.body.removeChild(t), 1500);
          }}
          className="text-gray-300 hover:text-white p-1 hover:bg-bordo-500  flex items-center justify-center  rounded-full transition-all duration-300"
          aria-label="Share movie"
        >
          <Icon icon="gridicons:share" width="18" height="18" />
        </button>
      </div>
    </div>
  );
}

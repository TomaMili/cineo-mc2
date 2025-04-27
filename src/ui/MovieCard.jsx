// src/ui/MovieCard.jsx
import { Icon } from "@iconify-icon/react";
import { fetchMovieDetails, poster } from "../services/apiTmdb";
import PosterPlaceholder from "../utils/posterPlaceholder";
import { useQueryClient } from "@tanstack/react-query";
import { useMoviePopup } from "../context/MoviePopupContext";

export default function MovieCard({
  movie,
  isSaved = false,
  isWatched = false,
  onWatchLater = () => {},
  onBookmark = () => {},
  onClick,
  hideActions = false,
}) {
  const queryClient = useQueryClient();
  const { open } = useMoviePopup();

  function prefetch() {
    queryClient.prefetchQuery({
      queryKey: ["movie", movie.id],
      queryFn: ({ signal }) => fetchMovieDetails(movie.id, signal),
      staleTime: 600_000,
    });
  }

  return (
    <div className="w-40 sm:w-44 lg:w-48 xl:w-52 cursor-pointer">
      {movie.poster_path ? (
        <div className="overflow-hidden rounded-lg aspect-[2/3]">
          <img
            src={poster(movie.poster_path)}
            alt={movie.title}
            onMouseEnter={prefetch}
            onClick={onClick ?? (() => open(movie))}
            className="w-full h-full transition-transform duration-300 ease-out hover:scale-105"
          />
        </div>
      ) : (
        <PosterPlaceholder title={movie.title} onClick={onClick} />
      )}

      <div className="mt-2 flex items-start justify-between">
        <p className="text-sm font-medium text-white line-clamp-1 mr-1">
          {movie.title}
        </p>

        {!hideActions && (
          <div className="flex gap-2 flex-shrink-0">
            <button
              title={isWatched ? "Remove from Watched" : "Mark watched"}
              onClick={() => onWatchLater(movie)}
              className="text-white hover:text-bordo-400 cursor-pointer"
            >
              <Icon
                icon={isWatched ? "mdi:eye-check" : "mdi:eye-plus-outline"}
                width="18"
                height="18"
              />
            </button>

            <button
              title={isSaved ? "Remove from Watch-Later" : "Add to Watch-Later"}
              onClick={() => onBookmark(movie)}
              className="text-white hover:text-bordo-400 cursor-pointer"
            >
              <Icon
                icon={
                  isSaved ? "material-symbols:bookmark" : "mdi:bookmark-outline"
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

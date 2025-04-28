import { Icon } from "@iconify-icon/react";
import { useQueryClient } from "@tanstack/react-query";
// import { useSession } from "@supabase/auth-helpers-react";

import { fetchMovieDetails, poster } from "../services/apiTmdb";
import PosterPlaceholder from "../utils/posterPlaceholder";
import { useMoviePopup } from "../context/MoviePopupContext";
import { useIsInWatchLater, useToggleWatchLater } from "../hooks/useWatchLater";

export default function MovieCard({
  movie,
  isSaved, // optional override (e.g. Watch-Later page)
  isWatched = false,
  onWatchLater = () => {}, // e.g. open “rate & mark watched” overlay
  onBookmark, // optional override for bookmark click
  onClick,
  hideActions = false,
}) {
  /* ─── data router pre-fetch ────────────────────────────────── */
  const queryClient = useQueryClient();
  function prefetch() {
    queryClient.prefetchQuery({
      queryKey: ["movie", movie.id],
      queryFn: ({ signal }) => fetchMovieDetails(movie.id, signal),
      staleTime: 10 * 60 * 1000, // 10 min
    });
  }

  /* ─── watch-later state & toggler ──────────────────────────── */
  // const { data: { session } = {} } = useSession();
  // const userId = session?.user?.id;
  const userId = 1;
  const savedWL = useIsInWatchLater(movie.id, userId); // automatic status
  const toggleWL = useToggleWatchLater(userId); // (movie, saved?) => …

  // prop beats context → lets Watch-Later page force its own state
  const saved = isSaved ?? savedWL;

  /* ─── handlers ─────────────────────────────────────────────── */
  function handleBookmark() {
    // page supplies its own logic? use it.
    if (onBookmark) return onBookmark(movie);

    // not logged in → silently ignore (or show toast if you prefer)
    if (!userId) return;

    toggleWL(movie, saved); // generic toggle
  }

  const { open } = useMoviePopup();
  const handlePosterClick = onClick ?? (() => open(movie));

  /* ─── render ───────────────────────────────────────────────── */
  return (
    <div className="w-40 sm:w-44 lg:w-48 xl:w-52 cursor-pointer">
      {/* Poster */}
      {movie.poster_path ? (
        <div className="overflow-hidden rounded-lg aspect-[2/3]">
          <img
            src={poster(movie.poster_path)}
            alt={movie.title}
            onMouseEnter={prefetch}
            onClick={handlePosterClick}
            className="w-full h-full transition-transform duration-300 ease-out hover:scale-105"
          />
        </div>
      ) : (
        <PosterPlaceholder title={movie.title} onClick={handlePosterClick} />
      )}

      {/* Title + actions */}
      <div className="mt-2 flex items-start justify-between">
        <p
          className="text-sm font-medium text-white line-clamp-1 mr-1 hover:text-bordo-400 transition-all"
          onClick={handlePosterClick}
        >
          {movie.title}
        </p>

        {!hideActions && (
          <div className="flex gap-2 flex-shrink-0">
            {/* eye icon – parent supplies handler */}
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

            {/* bookmark icon – now universal */}
            <button
              title={saved ? "Remove from Watch-Later" : "Add to Watch-Later"}
              onClick={handleBookmark}
              className="text-white hover:text-bordo-400 cursor-pointer"
            >
              <Icon
                icon={
                  saved ? "material-symbols:bookmark" : "mdi:bookmark-outline"
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

import { Icon } from "@iconify-icon/react";
import { poster } from "../services/apiTmdb";

export default function MovieCard({
  movie,
  onWatchLater = () => {},
  onBookmark = () => {},
  onClick = () => {},
  hideActions = false,
}) {
  return (
    <div className="w-40 sm:w-44 lg:w-48 xl:w-52 cursor-pointer">
      <div className="overflow-hidden rounded-lg">
        <img
          src={poster(movie.poster_path, 342)}
          alt={movie.title}
          onClick={onClick}
          className="w-full transition-transform duration-300 ease-out hover:scale-105"
        />
      </div>

      <div className="mt-2 flex items-start justify-between">
        <p className="text-sm font-medium text-white line-clamp-1 mr-1">
          {movie.title}
        </p>

        {!hideActions && (
          <div className="flex gap-2 flex-shrink-0">
            <button
              title="Watch later"
              onClick={() => onWatchLater(movie)}
              className="text-white hover:text-bordo-400 cursor-pointer"
            >
              <Icon icon="mdi:eye-plus-outline" width="18" height="18" />
            </button>
            <button
              title="Bookmark"
              onClick={() => onBookmark(movie)}
              className="text-white hover:text-bordo-400 cursor-pointer"
            >
              <Icon icon="mdi:bookmark-outline" width="18" height="18" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

import { useMemo, useState } from "react";
import { Icon } from "@iconify-icon/react";
import {
  useWatchLater,
  useToggleWatchLater,
} from "../../features/watchlater/useWatchLater";

import WatchLaterList from "../../features/watchlater/WatchLaterList";
import MoviePopup from "../../ui/MoviePopup";
import ErrorNotice from "../../ui/ErrorNotice";
import TabNav from "../../ui/TabNav";
import Spinner from "../../ui/Spinner";
import { useCurrentUser } from "../../hooks/useAuth";

export default function WatchLater() {
  const { profile } = useCurrentUser();
  const userId = profile?.id;

  const { data: movies = [], isLoading, isError } = useWatchLater(userId);
  const toggleWatchLater = useToggleWatchLater(userId);

  const [sort, setSort] = useState("genre");
  const [selected, setSelected] = useState(null);

  const sorted = useMemo(() => {
    const byTitle = (a, b) => a.title.localeCompare(b.title);
    const byDate = (a, b) => new Date(b.addedAt) - new Date(a.addedAt);
    if (sort === "title") return [...movies].sort(byTitle);
    if (sort === "date") return [...movies].sort(byDate);
    return movies;
  }, [movies, sort]);

  if (!userId)
    return (
      <div className="flex items-center justify-center h-screen bg-siva-800">
        <ErrorNotice title="Couldn't load Watch-Later" message="No user" />
      </div>
    );
  if (isError)
    return (
      <div className="flex items-center justify-center h-screen bg-siva-800">
        <ErrorNotice
          title="Couldn't load Watch-Later"
          message={isError.message}
        />
      </div>
    );

  if (isLoading)
    return (
      <>
        <div className="w-full mx-auto px-3 sm:px-6 sm:pt-6 text-sm sm:text-md font-light mb-6">
          <TabNav
            tabs={[
              ["", "Watch later"],
              ["../watched", "Watched"],
              ["../collections", "Collections"],
            ]}
          />
        </div>
        <div className="h-screen -m-24 flex justify-center items-center">
          <Spinner size={46} />
        </div>
      </>
    );

  return (
    <div className="min-h-screen bg-siva-800 text-white pb-12">
      <div className="w-full mx-auto px-3 sm:px-6 sm:pt-6 text-sm sm:text-md font-light mb-6">
        <TabNav
          tabs={[
            ["", "Watch later"],
            ["../watched", "Watched"],
            ["../collections", "Collections"],
          ]}
        />
      </div>

      <div className="w-full mx-auto flex justify-between sm:justify-end items-center gap-4 mt-2 sm:mt-4 px-3 sm:px-6">
        <button
          // onClick={() => shareMovie(movies, movies.userRating)}
          className="bg-bordo-500 hover:bg-bordo-400 px-3 sm:px-4 py-1 sm:py-2 rounded flex items-center gap-2 cursor-pointer transition-colors duration-300 text-sm sm:text-md"
        >
          <Icon icon="gridicons:share" width="18" height="18" />
          <span className="mt-0.5">Share</span>
        </button>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="bg-bordo-500 hover:bg-bordo-400 px-3 sm:px-4 py-2 sm:py-3 rounded flex items-center gap-2 cursor-pointer transition-all duration-300 text-sm sm:text-md"
        >
          <option value="date" className="text-sm sm:text-md">
            Date added
          </option>
          <option value="title" className="text-sm sm:text-md">
            Title (A–Z)
          </option>
          <option value="title-desc" className="text-sm sm:text-md">
            Title (Z–A)
          </option>
          <option value="genre" className="text-sm sm:text-md">
            Genre (A–Z)
          </option>
          <option value="genre-desc" className="text-sm sm:text-md">
            Genre (Z–A)
          </option>
        </select>
      </div>

      <div className="w-full mx-auto mt-8 space-y-8 px-4 sm:px-6">
        <WatchLaterList
          movies={sorted}
          sortMode={sort}
          onSelect={setSelected}
          onToggleWL={toggleWatchLater}
        />
      </div>

      <MoviePopup movie={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

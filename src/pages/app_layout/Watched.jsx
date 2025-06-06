import { useState } from "react";
import { Icon } from "@iconify-icon/react";
import { useWatched } from "../../features/watched/useWatched";
import WatchedList from "../../features/watched/WatchedList";
import TabNav from "../../ui/TabNav";
import Spinner from "../../ui/Spinner";
import ErrorNotice from "../../ui/ErrorNotice";
import { useCurrentUser } from "../../hooks/useAuth";

export default function Watched() {
  const { profile } = useCurrentUser();
  const userId = profile?.id;

  const { data: movies = [], isLoading, isError } = useWatched(userId);

  const [sort, setSort] = useState("date");

  if (!userId)
    return (
      <div className="flex items-center justify-center h-screen bg-siva-800">
        <ErrorNotice title="Couldn't load Watched" message="No user" />
      </div>
    );
  if (isError)
    return (
      <div className="flex items-center justify-center h-screen bg-siva-800">
        <ErrorNotice title="Couldn't load Watched" message={isError.message} />
      </div>
    );

  if (isLoading)
    return (
      <>
        <div className="w-full mx-auto px-3 sm:px-6 sm:pt-6 text-sm sm:text-md font-light">
          <TabNav
            tabs={[
              ["../watchlater", "Watch later"],
              ["", "Watched"],
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
    <div className="min-h-screen bg-siva-800  pb-12">
      <div className="w-full mx-auto px-3 sm:px-6 sm:pt-6 text-sm sm:text-md font-light">
        <TabNav
          tabs={[
            ["../watchlater", "Watch later"],
            ["", "Watched"],
            ["../collections", "Collections"],
          ]}
        />
      </div>

      <div className="w-full mx-auto flex justify-between sm:justify-end  text-white items-center gap-4 mt-2 sm:mt-4 px-3 sm:px-6">
        <button
          // onClick={shareLink}
          className="bg-bordo-500 hover:bg-bordo-400 px-3 sm:px-4 py-1 sm:py-2 rounded flex items-center gap-2 transition-colors duration-300 cursor-pointer text-sm sm:text-md"
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
            Date watched
          </option>
          <option value="title" className="text-sm sm:text-md">
            Title (A–Z)
          </option>
          <option value="genre" className="text-sm sm:text-md">
            Genre (A–Z)
          </option>
          <option value="rating" className="text-sm sm:text-md">
            Rating (high–low)
          </option>
        </select>
      </div>

      <div className="w-full mx-auto mt-8 space-y-8 px-4 sm:px-6">
        <WatchedList movies={movies} sortMode={sort} />
      </div>
    </div>
  );
}

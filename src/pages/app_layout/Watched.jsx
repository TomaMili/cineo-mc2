import { useState } from "react";
import { Icon } from "@iconify-icon/react";
import { useWatched } from "../../features/watched/useWatched";
import WatchedList from "../../features/watched/WatchedList";
import { handleShare } from "../../utils/share";
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
        <div className="w-full mx-auto px-6 pt-6">
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

  const shareLink = () =>
    handleShare(
      window.location.href,
      "WATCHED list link copied to the clipboard!"
    );

  return (
    <div className="min-h-screen bg-siva-800  pb-12">
      <div className="w-full mx-auto px-6 pt-6">
        <TabNav
          tabs={[
            ["../watchlater", "Watch later"],
            ["", "Watched"],
            ["../collections", "Collections"],
          ]}
        />
      </div>

      <div className="w-full mx-auto flex justify-end  text-white items-center gap-4 mt-4 px-6">
        <button
          onClick={shareLink}
          className="bg-bordo-500 hover:bg-bordo-400 px-4 py-2 rounded flex items-center gap-2 transition-colors duration-200 cursor-pointer"
        >
          <Icon icon="gridicons:share" width="18" height="18" />
          <span>Share</span>
        </button>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="bg-bordo-500 hover:bg-bordo-400 px-4 py-3 rounded transition-colors duration-200 cursor-pointer"
        >
          <option value="date">Date watched</option>
          <option value="title">Title (A–Z)</option>
          <option value="genre">Genre (A–Z)</option>
          <option value="rating">Rating (high–low)</option>
        </select>
      </div>

      <div className="w-full mx-auto mt-8 space-y-8 px-6">
        <WatchedList movies={movies} sortMode={sort} />
      </div>
    </div>
  );
}

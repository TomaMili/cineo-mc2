import { useEffect, useState } from "react";
import { backdrop } from "../../services/apiTmdb";
import { Icon } from "@iconify-icon/react";

import {
  useIsInWatchLater,
  useToggleWatchLater,
} from "../watchlater/useWatchLater";
import { useIsWatched, useToggleWatched } from "../watched/useWatched";

import RatingOverlay from "../../ui/RatingOverlay";
import { useCurrentUser } from "../../hooks/useAuth";

export default function MovieHero({ details, director, providers }) {
  const {
    title,
    backdrop_path,
    release_date,
    runtime,
    genres = [],
    vote_average,
    overview,
    id,
  } = details;

  const year = release_date ? release_date.slice(0, 4) : "—";
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  const rating = (vote_average || 0).toFixed(1);
  const genreChips = genres.slice(0, 3);

  const flat = providers?.flatrate ?? [];
  const rent = providers?.rent ?? [];
  const buy = providers?.buy ?? [];
  const free = providers?.free ?? [];
  const providersList = [...flat, ...rent, ...buy, ...free]
    .filter(Boolean)
    .filter(
      (p, idx, arr) =>
        arr.findIndex((q) => q.provider_id === p.provider_id) === idx
    );

  const { profile } = useCurrentUser();
  const userId = profile?.id;

  const savedWL = useIsInWatchLater(id, userId);
  const toggleWL = useToggleWatchLater(userId);

  const watched = useIsWatched(id, userId);
  const toggleWat = useToggleWatched(userId);

  const [showRating, setShowRating] = useState(false);
  const handleEye = () => {
    if (!watched) setShowRating(true);
    else toggleWat(details, true);
  };
  const saveRating = (stars) => {
    toggleWat(details, false, stars);
    setShowRating(false);
  };

  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 1050px)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1050px)");
    const handler = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <header
      className="relative isolate min-h-[105dvh] -mt-24 text-white flex bg-black"
      style={{
        backgroundImage: `url(${backdrop(backdrop_path)})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/62 to-black/80" />

      {showRating && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <RatingOverlay
            onRate={(stars) => saveRating(stars)}
            onRateLater={() => saveRating(null)}
            onClose={() => setShowRating(false)}
          />
        </div>
      )}

      <div className="z-10 w-full md:mx-[calc(2rem+3vw)] pb-12 lg:pb-30 px-6 mt-28 sm:mt-30 flex flex-col justify-between">
        <div>
          <ul className="flex mt-5 mb-4 flex-wrap">
            {genreChips.map((g) => (
              <li
                key={g.id}
                className="pr-3 py-1 rounded-lg font-normal text-sm lg:text-md"
              >
                {g.name}
              </li>
            ))}
          </ul>

          <span className="font-medium text-4xl sm:text-8xl drop-shadow-lg gap-2 flex items-start">
            <h1>{title}</h1>
            <Icon
              icon="gridicons:share"
              width="32"
              height="32"
              className="text-white"
            />
          </span>

          <div className="flex items-center flex-wrap gap-4 text-sm sm:text-base mt-4 lg:mt-8">
            <span>{year}</span>
            <span className="flex items-center gap-1">
              <Icon
                icon="ic:round-star"
                width="22"
                height="22"
                className="text-yellow-400 mb-0.5"
              />
              <span className="font-semibold">{rating}</span>
              <span className="text-siva-300">/ 10</span>
            </span>
          </div>

          <div className="mt-2 flex gap-4">
            {runtime > 0 && (
              <span className="flex items-center gap-2 text-sm lg:text-md">
                <Icon
                  icon="akar-icons:clock"
                  width="22"
                  height="22"
                  className="mb-0.5"
                />
                {hours}h&nbsp;{minutes}m
              </span>
            )}
            <span className="flex items-center gap-2 text-sm lg:text-md">
              <Icon
                icon="material-symbols-light:movie-edit-outline"
                width="28"
                height="28"
                className="mb-0.5"
              />
              {director && <p>{director.name}</p>}
            </span>
          </div>

          {overview && (
            <p className="italic text-md lg:text-2xl font-light text-white mt-6 w-full lg:max-w-2/3">{`"${overview}"`}</p>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <ul className="flex flex-wrap mt-20 lg:mt-5 mb-4">
            <li className="pr-3 py-1 rounded-lg text-md text-white font-light">
              {providersList.length > 0
                ? "Platforms:"
                : "Not available in your country"}
            </li>
            {providersList.map((p) => (
              <li
                key={p.provider_id}
                className="pr-3 py-1 rounded-lg lg:text-md font-normal "
              >
                {p.provider_name}
              </li>
            ))}
          </ul>

          <div className="flex justify-between gap-10 items-end mb-1">
            <button
              title="Notify me"
              className="text-white gap-1 backdrop-blur-xl hover:text-bordo-400 transition-all cursor-pointer flex h-12 sm:h-14 leading-0 rounded-lg sm:w-40 px-2.5 items-center bg-white/3"
            >
              <Icon
                icon="mdi:bell-outline"
                width={isMobile ? "28" : "38"}
                height={isMobile ? "28" : "38"}
              />
              <span className="text-lg sm:text-2xl mt-1">Notify me</span>
            </button>

            <div className="flex gap-2">
              <button
                title={watched ? "Remove from Watched" : "Mark watched"}
                onClick={handleEye}
                className="text-white hover:text-bordo-400 cursor-pointer h-12 sm:h-14 leading-0 rounded-lg w-12 lg:w-14 backdrop-blur-xl transition-all bg-white/3"
              >
                <Icon
                  icon={watched ? "mdi:eye-check" : "mdi:eye-plus-outline"}
                  width={isMobile ? "28" : "38"}
                  height={isMobile ? "28" : "38"}
                />
              </button>

              <button
                title={
                  savedWL ? "Remove from Watch-Later" : "Add to Watch-Later"
                }
                onClick={() => toggleWL(details, savedWL)}
                className="text-white hover:text-bordo-400 cursor-pointer h-12 sm:h-14 leading-0 backdrop-blur-xl transition-all bg-white/3 w-12 lg:w-14 rounded-lg"
              >
                <Icon
                  icon={
                    savedWL
                      ? "material-symbols:bookmark"
                      : "mdi:bookmark-outline"
                  }
                  width={isMobile ? "28" : "38"}
                  height={isMobile ? "28" : "38"}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

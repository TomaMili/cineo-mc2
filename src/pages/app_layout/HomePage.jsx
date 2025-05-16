import React, { lazy, Suspense } from "react";
import { useCurrentUser } from "../../hooks/useAuth";
import { useWatched } from "../../features/watched/useWatched";
import Spinner from "../../ui/Spinner";
import ErrorNotice from "../../ui/ErrorNotice";
import { useSuperSuggest } from "../../context/SuperSuggestContext";

const HeroSection = lazy(() => import("../../features/homepage/HeroSection"));
const LazySection = lazy(() => import("../../features/homepage/LazySection"));

import useInfiniteClassics from "../../features/homepage/useInfiniteClassics";
import useTrendingInfinite from "../../features/homepage/useTrendingInfinite";
import useInfiniteTopRated from "../../features/homepage/useInfiniteTopRated";
import useNowPlayingInfinite from "../../features/homepage/useNowPlayingInfinite";
import useUpcomingInfinite from "../../features/homepage/useUpcomingInfinite";
import useActionMoviesInfinite from "../../features/homepage/useActionMoviesInfinite";
import useComedyMoviesInfinite from "../../features/homepage/useComedyMoviesInfinite";
import useSciFiMoviesInfinite from "../../features/homepage/useSciFiMoviesInfinite";
import useRecommendationsForUser from "../../features/homepage/useRecommendationsForUser";

export default function HomePage() {
  const { profile, isLoading: uLoad, isError: uErr } = useCurrentUser();
  const { data: watched = [] } = useWatched(profile?.id);

  const recsHook = useRecommendationsForUser(profile?.id);
  const classicsHook = useInfiniteClassics();
  const trendingHook = useTrendingInfinite();
  const topRatedHook = useInfiniteTopRated();
  const nowPlayingHook = useNowPlayingInfinite();
  const upcomingHook = useUpcomingInfinite();
  const actionHook = useActionMoviesInfinite();
  const comedyHook = useComedyMoviesInfinite();
  const sciFiHook = useSciFiMoviesInfinite();

  const { show } = useSuperSuggest();

  const isPageLoading =
    uLoad ||
    classicsHook.isLoading ||
    trendingHook.isLoading ||
    topRatedHook.isLoading ||
    nowPlayingHook.isLoading ||
    upcomingHook.isLoading ||
    actionHook.isLoading ||
    comedyHook.isLoading ||
    sciFiHook.isLoading;

  const isPageError =
    uErr ||
    classicsHook.isError ||
    trendingHook.isError ||
    topRatedHook.isError ||
    nowPlayingHook.isError ||
    upcomingHook.isError ||
    actionHook.isError ||
    comedyHook.isError ||
    sciFiHook.isError;

  if (isPageLoading) {
    return (
      <>
        <Suspense fallback={<Spinner size={48} className="mx-auto py-20" />}>
          <HeroSection />
        </Suspense>
        <div className="flex justify-center py-20">
          <Spinner size={48} />
        </div>
      </>
    );
  }

  if (isPageError) {
    return (
      <>
        <Suspense fallback={<Spinner size={48} className="mx-auto py-20" />}>
          <HeroSection />
        </Suspense>
        <ErrorNotice title="Failed to load homepage" />
      </>
    );
  }

  const staticSections = [
    { key: "classics", title: "Classics & Oldies", hook: classicsHook },
    { key: "trending", title: "Trending This Week", hook: trendingHook },
    { key: "nowPlaying", title: "Now Playing", hook: nowPlayingHook },
    { key: "upcoming", title: "Upcoming Releases", hook: upcomingHook },
    { key: "action", title: "Action Thrills", hook: actionHook },
    { key: "comedy", title: "Comedy Gems", hook: comedyHook },
    { key: "sciFi", title: "Sci-Fi Spotlight", hook: sciFiHook },
    { key: "topRated", title: "Top Rated", hook: topRatedHook },
  ];

  return (
    <>
      <Suspense
        fallback={
          <div className="flex justify-center py-20">
            <Spinner size={48} />
          </div>
        }
      >
        <HeroSection />
      </Suspense>
      <main className="space-y-8 px-12 pt-12 pb-40">
        {recsHook.isLoading ? (
          <div className="pt-12 pb-36">
            <h2 className="text-3xl">Recommended For You</h2>
            <div className="pt-10 flex justify-center">
              <Spinner size={32} />
            </div>
          </div>
        ) : recsHook.isError ? (
          <ErrorNotice title="Couldn’t load recommendations" />
        ) : (
          <Suspense
            fallback={
              <div className="pt-12 pb-36">
                <Spinner size={32} />
              </div>
            }
          >
            <LazySection
              title="Recommended For You"
              fetchHook={() => recsHook}
              emptyMessage={
                watched.length === 0
                  ? "Watch and rate some movies to get personalized suggestions!"
                  : undefined
              }
            />
          </Suspense>
        )}

        {staticSections.map(({ key, title, hook }) => (
          <Suspense
            key={key}
            fallback={
              <div className="pt-12 pb-36">
                <Spinner size={32} />
              </div>
            }
          >
            <LazySection title={title} fetchHook={() => hook} />
          </Suspense>
        ))}
      </main>
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-6 mt-10 mb-20">
        <p className="text-4xl font-light">
          Still can’t find anything to watch?
        </p>
        <button
          onClick={show}
          className="bg-bordo-500 px-6 pt-4 pb-3 rounded-3xl font-semibold hover:bg-bordo-400 transition cursor-pointer"
        >
          SUPERSUGGESTION
        </button>
      </div>

      <footer className="bg-cover bg-[url('/bg-image.jpg')] bg-center text-siva-200 py-8 text-center text-sm font-light">
        <p>© 2025 Cineo. All rights reserved.</p>
        <p>Made with ❤️ by the Cineo Team</p>
      </footer>
    </>
  );
}

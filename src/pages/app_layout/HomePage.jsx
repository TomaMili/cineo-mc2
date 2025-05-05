import HeroSection from "../../features/homepage/HeroSection";
import Section from "../../features/homepage/Section";
import { useCurrentUser } from "../../hooks/useAuth";
import Spinner from "../../ui/Spinner";
import ErrorNotice from "../../ui/ErrorNotice";
import { useWatched } from "../../features/watched/useWatched";

import useInfiniteClassics from "../../features/homepage/useInfiniteClassics";
import useTrendingInfinite from "../../features/homepage/useTrendingInfinite";
import useInfiniteTopRated from "../../features/homepage/useInfiniteTopRated";
import useNowPlayingInfinite from "../../features/homepage/useNowPlayingInfinite";
import useUpcomingInfinite from "../../features/homepage/useUpcomingInfinite";
import useActionMoviesInfinite from "../../features/homepage/useActionMoviesInfinite";
import useComedyMoviesInfinite from "../../features/homepage/useComedyMoviesInfinite";
import useSciFiMoviesInfinite from "../../features/homepage/useSciFiMoviesInfinite";

import useRecommendationsForUser from "../../features/homepage/useRecommendationsForUser";
import { useSuperSuggest } from "../../context/SuperSuggestContext";

export default function HomePage() {
  const { profile, isLoading: uLoad, isError: uErr } = useCurrentUser();
  const { data: watched = [] } = useWatched(profile?.id);

  // grab the recommendations query object
  const recsQuery = useRecommendationsForUser(profile?.id);
  const {
    data: recs = [],
    isLoading: isLoadingRec,
    isError: isErrorRec,
  } = recsQuery;

  // the other infinite‐scroll lists
  const classics = useInfiniteClassics();
  const trending = useTrendingInfinite();
  const topRated = useInfiniteTopRated();
  const nowPlaying = useNowPlayingInfinite();
  const upcoming = useUpcomingInfinite();
  const actionMovies = useActionMoviesInfinite();
  const comedyMovies = useComedyMoviesInfinite();
  const sciFiMovies = useSciFiMoviesInfinite();

  const { show } = useSuperSuggest();

  // page‐level loading / errors *exclude* the recs query
  const isPageLoading =
    uLoad ||
    classics.isLoading ||
    trending.isLoading ||
    topRated.isLoading ||
    nowPlaying.isLoading ||
    upcoming.isLoading ||
    actionMovies.isLoading ||
    comedyMovies.isLoading ||
    sciFiMovies.isLoading;

  const isPageError =
    uErr ||
    classics.isError ||
    trending.isError ||
    topRated.isError ||
    nowPlaying.isError ||
    upcoming.isError ||
    actionMovies.isError ||
    comedyMovies.isError ||
    sciFiMovies.isError;

  if (isPageLoading) {
    return (
      <>
        <HeroSection />
        <div className="flex justify-center py-20">
          <Spinner size={48} />
        </div>
      </>
    );
  }

  if (isPageError) {
    return (
      <>
        <HeroSection />
        <ErrorNotice title="Failed to load homepage" />
      </>
    );
  }

  return (
    <>
      <HeroSection />

      <div className="space-y-8 px-12 pt-12 pb-40">
        {isLoadingRec ? (
          <div className="pt-12 pb-36.5">
            <h2 className="text-3xl mt-18 first:mt-0">Recommended For You</h2>

            <div className="pt-40 flex justify-center">
              <Spinner size={32} />
            </div>
          </div>
        ) : isErrorRec ? (
          <ErrorNotice title="Couldn’t load recommendations" />
        ) : (
          <Section
            title="Recommended For You"
            movies={recs}
            emptyMessage={
              watched.length === 0
                ? "Watch and rate some movies to get personalized suggestions!"
                : undefined
            }
          />
        )}

        <Section title="Classics & Oldies" movies={classics} />
        <Section title="Trending This Week" movies={trending} />
        <Section title="Now Playing" movies={nowPlaying} />
        <Section title="Upcoming Releases" movies={upcoming} />
        <Section title="Action Thrills" movies={actionMovies} />
        <Section title="Comedy Gems" movies={comedyMovies} />
        <Section title="Sci-Fi Spotlight" movies={sciFiMovies} />
        <Section title="Top Rated" movies={topRated} />
      </div>

      <div className="max-w-2xl mx-auto flex flex-col items-center gap-6 mt-10 mb-20">
        <p className="text-4xl font-light">
          Still can’t find anything to watch?
        </p>
        <button
          onClick={show}
          className="bg-bordo-500 px-6 pt-4 pb-3 rounded-3xl font-semibold hover:bg-bordo-400 transition"
        >
          SUPERSUGGESTION
        </button>
      </div>

      <footer className="bg-[url('/bg-image.jpg')] bg-cover bg-center text-siva-200 py-8 text-center text-sm font-light">
        <p>© 2025 Cineo. All rights reserved.</p>
        <p>Made with ❤️ by the Cineo Team</p>
      </footer>
    </>
  );
}

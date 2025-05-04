import HeroSection from "../../features/homepage/HeroSection";
import Section from "../../features/homepage/Section";
import { useCurrentUser } from "../../hooks/useAuth";
import Spinner from "../../ui/Spinner";
import ErrorNotice from "../../ui/ErrorNotice";

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

  const recs = useRecommendationsForUser(profile?.id);

  const classics = useInfiniteClassics();
  const trending = useTrendingInfinite();
  const topRated = useInfiniteTopRated();
  const nowPlaying = useNowPlayingInfinite();
  const upcoming = useUpcomingInfinite();
  const actionMovies = useActionMoviesInfinite();
  const comedyMovies = useComedyMoviesInfinite();
  const sciFiMovies = useSciFiMoviesInfinite();

  const { show } = useSuperSuggest();

  const isLoading =
    uLoad ||
    recs.isLoading ||
    classics.isLoading ||
    trending.isLoading ||
    topRated.isLoading ||
    nowPlaying.isLoading ||
    upcoming.isLoading ||
    actionMovies.isLoading ||
    comedyMovies.isLoading ||
    sciFiMovies.isLoading;

  const isError =
    uErr ||
    recs.isError ||
    classics.isError ||
    trending.isError ||
    topRated.isError ||
    nowPlaying.isError ||
    upcoming.isError ||
    actionMovies.isError ||
    comedyMovies.isError ||
    sciFiMovies.isError;

  if (isLoading) {
    return (
      <>
        <HeroSection />
        <div className="flex justify-center py-20">
          <Spinner size={48} />
        </div>
      </>
    );
  }

  if (isError) {
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
      <div className="space-y-3 px-18 pt-12 pb-20">
        <Section
          title="Recommended For You"
          movies={recs.data}
          emptyMessage="Watch and rate some movies to get personalized suggestions!"
        />

        <Section title="Classics & Oldies" movies={classics} />
        <Section title="Trending This Week" movies={trending} />
        <Section title="Now Playing" movies={nowPlaying} />
        <Section title="Upcoming Releases" movies={upcoming} />
        <Section title="Action Thrills" movies={actionMovies} />
        <Section title="Comedy Gems" movies={comedyMovies} />
        <Section title="Sci-Fi Spotlight" movies={sciFiMovies} />
        <Section title="Top Rated" movies={topRated} />
      </div>
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-6 mt-10 mb-30">
        <p className="text-4xl font-light">
          Still can't find anything to watch?
        </p>
        <button
          onClick={show}
          className="bg-bordo-500 z-0 px-6 pt-4 pb-3 rounded-4xl font-semibold cursor-pointer hover:bg-bordo-400 transition-colors duration-300 ease-out"
        >
          SUPERSUGGESTION
        </button>
      </div>
      <footer className="bg-[url('/bg-image.jpg')] bg-cover bg-center text-siva-200 py-8  text-center text-sm font-light  z-10">
        <p>© 2025 Cineo. All rights reserved.</p>
        <p>Made with ❤️ by Cineo Team</p>
      </footer>
    </>
  );
}

import HeroSection from "../../features/homepage/HeroSection";
import Spinner from "../../ui/Spinner";
import ErrorNotice from "../../ui/ErrorNotice";
import Section from "../../features/homepage/Section";

import usePopularMovies from "../../hooks/usePopularMovies";
import SkeletonPoster from "../../ui/SkeletonPoster";

export default function HomePage() {
  const pop1 = usePopularMovies(1);
  const pop2 = usePopularMovies(2);
  const pop3 = usePopularMovies(3);

  const isLoading = pop1.isLoading || pop2.isLoading || pop3.isLoading;
  const isError = pop1.isError || pop2.isError || pop3.isError;

  if (isLoading)
    return (
      <>
        <HeroSection />
        <div className="px-20 pt-32 bg-black text-white">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(192px,1fr))] gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonPoster key={i} />
            ))}
          </div>
        </div>
      </>
    );

  if (isError)
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <ErrorNotice title="Couldn’t load popular movies" />
      </div>
    );

  return (
    <>
      <HeroSection />

      <div className="w-full h-full px-20 pt-20 pb-40">
        <Section title="OUR TOP PICKS" movies={pop1.data?.results} />
        <Section title="BLAST FROM THE PAST" movies={pop2.data?.results} />
        <Section title="ROMANTIC GEMS" movies={pop3.data?.results} />
      </div>
    </>
  );
}

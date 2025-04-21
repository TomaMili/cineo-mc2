import HeroSection from "../../features/homepage/HeroSection";
import usePopularMovies from "../../hooks/usePopularMovies";
import MovieCarousel from "../../ui/MovieCarousel";

const OPTIONS = { align: "start" };

function HomePage() {
  const { data, isLoading, isError } = usePopularMovies(1);

  if (isLoading) return <div>Loading…</div>;
  if (isError) return <div>Greška pri dohvaćanju filmova</div>;

  return (
    <>
      <HeroSection />
      <div className="w-full h-full px-20 pt-20">
        <div className="pb-30">
          <div className="text-3xl font-medium">OUR TOP PICKS</div>
          {/* <MovieCarousel slides={data.results} options={OPTIONS} /> */}
          <MovieCarousel
            slides={data.results}
            options={OPTIONS}
            // onWatchLater={(m) => addToWatchLater(m)}
            // onBookmark={(m) => toggleBookmark(m)}
          />
          <div className="text-3xl font-medium mt-20">BLAST FROM THE PAST</div>
          {/* <MovieCarousel slides={data.results} options={OPTIONS} /> */}
          <MovieCarousel
            slides={data.results}
            options={OPTIONS}
            // onWatchLater={(m) => addToWatchLater(m)}
            // onBookmark={(m) => toggleBookmark(m)}
          />
          <div className="text-3xl font-medium mt-20">ROMANTIC GEMS</div>
          {/* <MovieCarousel slides={data.results} options={OPTIONS} /> */}
          <MovieCarousel
            slides={data.results}
            options={OPTIONS}
            // onWatchLater={(m) => addToWatchLater(m)}
            // onBookmark={(m) => toggleBookmark(m)}
          />
        </div>
      </div>
    </>
  );
}

export default HomePage;

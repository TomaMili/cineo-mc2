import { usePopularMovies } from "../../hooks/usePopularMovies";
import MovieCarousel from "../../ui/MovieCarousel";

const OPTIONS = { align: "start" };
// const SLIDE_COUNT = 20;
// const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
// const SLIDES = data;

function WatchLater() {
  const { data, isLoading, isError } = usePopularMovies(1);

  if (isLoading) return <div>Loading…</div>;
  if (isError) return <div>Greška pri dohvaćanju filmova</div>;
  console.log(data);
  return (
    <div>
      <div className="grid grid-cols-5  px-30 gap-10">
        {/* {data.results.map((movie) => (
          <div key={movie.id} className="">
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
            />
            <h2>{movie.title}</h2>
          </div>
        ))} */}
        <MovieCarousel slides={data.results} options={OPTIONS} />
      </div>
    </div>
  );
}

export default WatchLater;

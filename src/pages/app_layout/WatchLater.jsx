import usePopularMovies from "../../hooks/usePopularMovies";
import MovieCarousel from "../../ui/MovieCarousel";

const OPTIONS = { align: "start" };

function WatchLater() {
  const {
    data: data1,
    isLoading: isLoading1,
    isError: isError1,
  } = usePopularMovies(1);
  const {
    data: data2,
    isLoading: isLoading2,
    isError: isError2,
  } = usePopularMovies(2);
  const {
    data: data3,
    isLoading: isLoading3,
    isError: isError3,
  } = usePopularMovies(3);

  if (isLoading1) return <div>Loading…</div>;
  if (isError1) return <div>Greška pri dohvaćanju filmova</div>;
  if (isLoading2) return <div>Loading…</div>;
  if (isError2) return <div>Greška pri dohvaćanju filmova</div>;
  if (isLoading3) return <div>Loading…</div>;
  if (isError3) return <div>Greška pri dohvaćanju filmova</div>;
  console.log(data1);
  return (
    <div>
      <div className="grid grid-cols-5  px-30 gap-10">
        <MovieCarousel slides={data1.results} options={OPTIONS} />
      </div>
      <div className="grid grid-cols-5  px-30 gap-10">
        <MovieCarousel slides={data2.results} options={OPTIONS} />
      </div>
      <div className="grid grid-cols-5  px-30 gap-10">
        <MovieCarousel slides={data3.results} options={OPTIONS} />
      </div>
    </div>
  );
}

export default WatchLater;

import { useQuery } from "@tanstack/react-query";
import { fetchMovieRecommendations } from "../../services/apiTmdb";

import MovieCarousel from "../../ui/MovieCarousel";
import Spinner from "../../ui/Spinner";
import ErrorNotice from "../../ui/ErrorNotice";

export default function SimilarMoviesSection({
  movieId,
  title = "Similar Movies",
  maxSlides = 20,
  carouselOptions = { dragFree: true },
  onWatchLater,
  onBookmark,
}) {
  const { data, isPending, error } = useQuery({
    queryKey: ["movieRecommendations", movieId],
    enabled: !!movieId,
    queryFn: ({ signal }) => fetchMovieRecommendations(movieId, 1, signal),
    staleTime: 10 * 60 * 1000, // 10 min
  });

  const slides = (data?.results ?? []).slice(0, maxSlides);

  if (error)
    return (
      <div className="flex items-center justify-center h-60 bg-siva-800">
        <ErrorNotice title="Couldn't load Movies" message={error.message} />
      </div>
    );

  if (isPending)
    return (
      <div className="h-60 -m-24 flex justify-center items-center">
        <Spinner size={46} />
      </div>
    );

  return (
    <section className="mt-16 mx-[calc(2rem+2vw)] md:mx-[calc(2rem+3vw)] pb-14 px-6">
      <h2 className="text-3xl font-normal tracking-wide mb-3 text-siva-100 px-4 uppercase">
        {title}
      </h2>

      <MovieCarousel
        slides={slides}
        options={carouselOptions}
        onWatchLater={onWatchLater}
        onBookmark={onBookmark}
      />
    </section>
  );
}

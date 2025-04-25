import { useQuery } from "@tanstack/react-query";
import { fetchMovieRecommendations } from "../../services/apiTmdb";

import MovieCarousel from "../../ui/MovieCarousel";

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

  if (isPending) return null; // or a spinner skeleton
  if (error) return null; // silently ignore API errors
  if (slides.length === 0) return null;

  return (
    <section className="mt-16 mx-[calc(2rem+2vw)] md:mx-[calc(2rem+3vw)] pb-14 px-6">
      <h2 className="text-3xl font-normal tracking-wide mb-3 text-white px-4 uppercase">
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

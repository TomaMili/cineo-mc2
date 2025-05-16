import { useCallback, useEffect } from "react";
import MovieCarousel from "../../ui/MovieCarousel";
import Spinner from "../../ui/Spinner";
import ErrorNotice from "../../ui/ErrorNotice";

export default function Section({ title, movies, emptyMessage }) {
  const isInfinite =
    movies != null && typeof movies.fetchNextPage === "function";

  const {
    data,
    isLoading: infLoading = false,
    isError: infError = false,
    fetchNextPage = () => Promise.resolve(),
    hasNextPage = false,
    isFetchingNextPage = false,
  } = isInfinite ? movies : {};

  const slides = isInfinite
    ? Array.from(
        new Map(
          (data?.pages ?? []).flatMap((p) => p.results).map((m) => [m.id, m])
        ).values()
      )
    : Array.isArray(movies)
    ? movies
    : [];

  useEffect(() => {
    if (isInfinite && hasNextPage && (data?.pages?.length ?? 0) === 1) {
      fetchNextPage();
    }
  }, [isInfinite, hasNextPage, data?.pages?.length, fetchNextPage]);

  // Show skeleton placeholders when fetching more
  const SKELETON_COUNT = 5;
  const displaySlides =
    isInfinite && isFetchingNextPage
      ? [...slides, ...Array(SKELETON_COUNT).fill(null)]
      : slides;

  // Fetch when within this many slides of the end
  const PRELOAD_OFFSET = 10;

  const handleSelect = useCallback(
    (index) => {
      if (
        isInfinite &&
        hasNextPage &&
        !isFetchingNextPage &&
        index >= slides.length - PRELOAD_OFFSET
      ) {
        fetchNextPage().then(() => {
          // Pre‐cache the new posters
          const lastPage = data?.pages[data.pages.length - 1]?.results ?? [];
          lastPage.forEach((m) => {
            if (m.poster_path) {
              new Image().src = `https://image.tmdb.org/t/p/w342${m.poster_path}`;
            }
          });
        });
      }
    },
    [
      isInfinite,
      hasNextPage,
      isFetchingNextPage,
      slides.length,
      fetchNextPage,
      data,
    ]
  );

  if (infLoading) {
    return (
      <div className="py-8 flex justify-center">
        <Spinner size={32} />
      </div>
    );
  }
  if (infError) {
    return <ErrorNotice title={`Failed to load ${title}`} />;
  }

  if (slides.length === 0) {
    if (!isInfinite && emptyMessage) {
      return (
        <div className="h-[270px]">
          <h2 className="text-3xl font-medium mt-20 first:mt-0">{title}</h2>
          <p className="mt-4 text-center text-siva-200">{emptyMessage}</p>
        </div>
      );
    }
    return null;
  }

  return (
    <>
      <h2 className="text-3xl mt-18 first:mt-0">{title}</h2>
      <MovieCarousel
        slides={displaySlides}
        options={{ align: "start", containScroll: "trimSnaps" }}
        onSelect={isInfinite ? handleSelect : undefined}
      />
    </>
  );
}

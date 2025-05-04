import { useCallback } from "react";
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
    fetchNextPage = () => {},
    hasNextPage = false,
    isFetchingNextPage = false,
  } = isInfinite ? movies : {};

  const slides = isInfinite
    ? (data?.pages ?? []).flatMap((page) => page.results)
    : Array.isArray(movies)
    ? movies
    : [];

  const handleSelect = useCallback(
    (index) => {
      if (
        isInfinite &&
        hasNextPage &&
        !isFetchingNextPage &&
        index >= slides.length - 2
      ) {
        fetchNextPage();
      }
    },
    [isInfinite, hasNextPage, isFetchingNextPage, slides.length, fetchNextPage]
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
        <>
          <h2 className="text-3xl font-medium mt-20 first:mt-0">{title}</h2>
          <p className="mt-4 text-center text-siva-200">{emptyMessage}</p>
        </>
      );
    }
    return null;
  }

  return (
    <>
      <h2 className="text-3xl mt-18 first:mt-0">{title}</h2>
      <MovieCarousel
        slides={slides}
        options={{ align: "start" }}
        onSelect={handleSelect}
      />
    </>
  );
}

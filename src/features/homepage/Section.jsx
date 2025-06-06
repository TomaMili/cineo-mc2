import { useEffect, useState, useCallback } from "react";
import MovieCarousel from "../../ui/MovieCarousel";
import Spinner from "../../ui/Spinner";
import ErrorNotice from "../../ui/ErrorNotice";

export default function Section({ title, movies, emptyMessage }) {
  const isInfinite = movies && typeof movies.fetchNextPage === "function";

  const {
    data,
    isLoading: infLoading = false,
    isError: infError = false,
    fetchNextPage = () => Promise.resolve(),
    hasNextPage = false,
    isFetchingNextPage = false,
  } = isInfinite
    ? movies
    : {
        data: null,
        isLoading: false,
        isError: false,
        fetchNextPage: () => Promise.resolve(),
        hasNextPage: false,
        isFetchingNextPage: false,
      };

  const [embla, setEmbla] = useState(null);

  const slides = isInfinite
    ? Array.from(
        new Map(
          (data?.pages ?? []).flatMap((p) => p.results).map((m) => [m.id, m])
        ).values()
      )
    : Array.isArray(movies)
    ? movies
    : [];

  const realSlideCount = slides.filter(Boolean).length;
  useEffect(() => {
    if (embla) embla.reInit();
  }, [embla, realSlideCount]);

  const SKELETON_COUNT = 0;
  const displaySlides =
    isInfinite && isFetchingNextPage
      ? [...slides, ...Array(SKELETON_COUNT).fill(null)]
      : slides;

  const PRELOAD_OFFSET = 15;
  const handleSelect = useCallback(
    (index) => {
      if (
        isInfinite &&
        hasNextPage &&
        !isFetchingNextPage &&
        index >= slides.length - PRELOAD_OFFSET
      ) {
        fetchNextPage();
      }
    },
    [isInfinite, hasNextPage, isFetchingNextPage, slides.length, fetchNextPage]
  );

  const handleReachEnd = useCallback(() => {
    if (isInfinite && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isInfinite, hasNextPage, isFetchingNextPage, fetchNextPage]);

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
  if (realSlideCount === 0) {
    if (!isInfinite && emptyMessage) {
      return (
        <div className="h-[270px]">
          <h2 className="text-2xl lg:text-3xl font-medium mt-20 first:mt-0">
            {title}
          </h2>
          <p className="mt-4 text-center text-siva-200">{emptyMessage}</p>
        </div>
      );
    }
    return null;
  }

  return (
    <div className="mb-10 lg:mb-20">
      <h2 className="text-2xl lg:text-3xl">{title}</h2>
      <MovieCarousel
        slides={displaySlides}
        options={{ align: "start", containScroll: "trimSnaps" }}
        onInit={setEmbla}
        onSelect={isInfinite ? handleSelect : undefined}
        onReachEnd={isInfinite ? handleReachEnd : undefined}
      />
    </div>
  );
}

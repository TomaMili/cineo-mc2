import { useSearchParams } from "react-router-dom";
import { useCallback } from "react";
import { InView } from "react-intersection-observer";

import MovieCard from "../../ui/MovieCard";
import Spinner from "../../ui/Spinner";
import ErrorNotice from "../../ui/ErrorNotice";
import useSearchMovies from "../../hooks/useSearchMovies";

const rank = (m) => [m.poster_path ? 0 : 1, -m.popularity || 0];

export default function BrowsePage() {
  const [params] = useSearchParams();
  const query = params.get("query")?.trim() || "";

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useSearchMovies(query);

  const movies =
    data?.pages.flatMap((p) =>
      [...p.results].sort(
        (a, b) => rank(a)[0] - rank(b)[0] || rank(a)[1] - rank(b)[1]
      )
    ) ?? [];

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (status === "pending")
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <Spinner size={48} />
      </div>
    );

  if (status === "error")
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <ErrorNotice title="Search failed" />
      </div>
    );

  return (
    <section className="min-h-screen -mt-24 bg-black px-6 xl:px-12 pb-32 text-white">
      <h1 className="text-4xl font-semibold pt-24 pb-10">
        Results for “{query || "…"}”
      </h1>

      {movies.length === 0 && (
        <p className="text-center text-siva-300 mt-32">
          No titles match “{query}”.
        </p>
      )}

      <div
        className="
          grid gap-6
          grid-cols-2 sm:grid-cols-3 md:grid-cols-4
          lg:grid-cols-6 xl:grid-cols-8
        "
      >
        {movies.map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </div>

      {hasNextPage && (
        <InView
          as="div"
          rootMargin="1000px 0px"
          onChange={(inView) => inView && loadMore()}
        >
          <div className="flex justify-center h-32 items-center">
            {isFetchingNextPage && <Spinner size={28} />}
          </div>
        </InView>
      )}
    </section>
  );
}

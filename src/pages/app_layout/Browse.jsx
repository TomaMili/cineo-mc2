// src/pages/BrowsePage.jsx
import { useSearchParams } from "react-router-dom";
import { useCallback } from "react";
import { InView } from "react-intersection-observer";
import MovieCard from "../../ui/MovieCard";
import Spinner from "../../ui/Spinner";
import ErrorNotice from "../../ui/ErrorNotice";
import useSearchMovies from "../../hooks/useSearchMovies";
import useDiscoverMovies from "../../hooks/useDiscoverMovies";
import { searchPeople, fetchGenres } from "../../services/apiTmdb";
import { useQuery } from "@tanstack/react-query";

const rank = (m) => [m.poster_path ? 0 : 1, -(m.popularity || 0)];

export default function BrowsePage() {
  const [params] = useSearchParams();
  const query = params.get("query")?.trim() || "";
  const actorNames = params.get("actors")
    ? params.get("actors").split(",")
    : [];
  const directorNames = params.get("directors")
    ? params.get("directors").split(",")
    : [];
  const genreNames = params.get("genres")
    ? params.get("genres").split(",")
    : [];

  // resolve names → IDs
  const actorQs = actorNames.map((n) =>
    useQuery({
      queryKey: ["person-search", "actor", n],
      queryFn: ({ signal }) => searchPeople(n, 1, signal),
      enabled: !!n,
    })
  );
  const dirQs = directorNames.map((n) =>
    useQuery({
      queryKey: ["person-search", "director", n],
      queryFn: ({ signal }) => searchPeople(n, 1, signal),
      enabled: !!n,
    })
  );
  const { data: allGenres = [] } = useQuery({
    queryKey: ["tmdb-genres"],
    queryFn: ({ signal }) => fetchGenres(signal),
  });

  const castIDs = actorQs.map((r) => r.data?.results?.[0]?.id).filter(Boolean);
  const crewIDs = dirQs.map((r) => r.data?.results?.[0]?.id).filter(Boolean);
  const genreIDs = genreNames
    .map(
      (n) => allGenres.find((g) => g.name.toLowerCase() === n.toLowerCase())?.id
    )
    .filter(Boolean);

  const isDiscover = castIDs.length || crewIDs.length || genreIDs.length;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    isDiscover
      ? useDiscoverMovies({
          cast: castIDs.join(","),
          crew: crewIDs.join(","),
          genres: genreIDs.join(","),
        })
      : useSearchMovies(query);

  // flatten, dedupe, sort
  const movies = (data?.pages ?? [])
    .flatMap((p) => p.results)
    .reduce((map, m) => map.set(m.id, m), new Map())
    .values();
  const sorted = Array.from(movies).sort(
    (a, b) => rank(a)[0] - rank(b)[0] || rank(a)[1] - rank(b)[1]
  );

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
        <ErrorNotice title="Search/Discover failed" />
      </div>
    );

  return (
    <section className="min-h-screen -mt-24 bg-black px-6 xl:px-12 pb-32 text-siva-100">
      <h1 className="text-4xl font-semibold pt-24 pb-10 text-center">
        {isDiscover
          ? `Found ${sorted.length} titles`
          : `Results for “${query || "…"}”`}
      </h1>

      {sorted.length === 0 && (
        <p className="text-center text-siva-300 mt-32">
          No titles match your filters.
        </p>
      )}

      <div
        className="
          grid gap-6
          grid-cols-2
          min-[570px]:grid-cols-3
          min-[770px]:grid-cols-4
          min-[1100px]:grid-cols-5
          min-[1400px]:grid-cols-6
          min-[1670px]:grid-cols-7
          min-[1860px]:grid-cols-8
        "
      >
        {sorted.map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </div>

      {hasNextPage && (
        <InView
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

import { useSearchParams } from "react-router-dom";
import { useCallback, useMemo } from "react";
import { InView } from "react-intersection-observer";
import { useQuery, useQueries } from "@tanstack/react-query";

import MovieCard from "../../ui/MovieCard";
import Spinner from "../../ui/Spinner";
import ErrorNotice from "../../ui/ErrorNotice";
import useSearchMovies from "../../hooks/useSearchMovies";
import useDiscoverMovies from "../../hooks/useDiscoverMovies";
import { searchPeople, fetchGenres } from "../../services/apiTmdb";

export default function Browse() {
  const [params] = useSearchParams();
  const query = params.get("query")?.trim() || "";
  const actorNames = params.get("actors")?.split(",") || [];
  const directorNames = params.get("directors")?.split(",") || [];

  const actorQueries = useQueries({
    queries: actorNames.map((name) => ({
      queryKey: ["person-search", "actor", name],
      queryFn: ({ signal }) => searchPeople(name, 1, signal),
      enabled: Boolean(name),
    })),
  });
  const directorQueries = useQueries({
    queries: directorNames.map((name) => ({
      queryKey: ["person-search", "director", name],
      queryFn: ({ signal }) => searchPeople(name, 1, signal),
      enabled: Boolean(name),
    })),
  });

  const { data: allGenres = [] } = useQuery({
    queryKey: ["tmdb-genres"],
    queryFn: ({ signal }) => fetchGenres(signal),
  });

  const castIDs = useMemo(
    () =>
      actorQueries
        .map((r) => r.data?.results?.[0]?.id)
        .filter(Boolean)
        .join(","),
    [actorQueries]
  );
  const crewIDs = useMemo(
    () =>
      directorQueries
        .map((r) => r.data?.results?.[0]?.id)
        .filter(Boolean)
        .join(","),
    [directorQueries]
  );
  const genreIDs = useMemo(() => {
    const names = (params.get("genres") || "").split(",").filter(Boolean);
    return names
      .map((n) =>
        allGenres.find((g) => g.name.toLowerCase() === n.toLowerCase())
      )
      .filter(Boolean)
      .map((g) => g.id)
      .join(",");
  }, [params, allGenres]);

  const isDiscover = Boolean(castIDs || crewIDs || genreIDs);

  const searchResult = useSearchMovies(query);
  const discoverResult = useDiscoverMovies({
    cast: castIDs,
    crew: crewIDs,
    genres: genreIDs,
  });
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    isDiscover ? discoverResult : searchResult;

  const movies = useMemo(() => {
    if (!data?.pages) return [];
    const seen = new Set();
    const list = [];
    data.pages.forEach((page) => {
      const sorted = [...page.results].sort(
        (a, b) =>
          (a.poster_path ? 0 : 1) - (b.poster_path ? 0 : 1) ||
          -(a.popularity || 0) + (b.popularity || 0)
      );
      sorted.forEach((m) => {
        if (!seen.has(m.id)) {
          seen.add(m.id);
          list.push(m);
        }
      });
    });
    return list;
  }, [data]);

  const visibleMovies = useMemo(
    () => movies.filter((m) => m.poster_path && m.vote_average > 0),
    [movies]
  );

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (status === "pending")
    return (
      <div className="flex items-center justify-center h-screen bg-siva-800">
        <Spinner size={48} />
      </div>
    );
  if (status === "error")
    return (
      <div className="flex items-center justify-center h-screen bg-siva-800">
        <ErrorNotice title="Search/Discover failed" />
      </div>
    );

  return (
    <section className="min-h-screen -mt-24 bg-siva-800 px-6 xl:px-12 pb-32 text-siva-100">
      <h1 className="text-4xl font-semibold pt-24 pb-10 text-center">
        {isDiscover
          ? `Found ${visibleMovies.length} titles`
          : `Results for “${query || "…"}”`}
      </h1>

      {visibleMovies.length === 0 && (
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
        {visibleMovies.map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </div>

      {hasNextPage && (
        <InView
          as="div"
          rootMargin="600px 0px"
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

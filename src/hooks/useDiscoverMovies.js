import { useInfiniteQuery } from "@tanstack/react-query";
import { discoverMovies } from "../services/apiTmdb";

export default function useDiscoverMovies({ cast, crew, genres }) {
  return useInfiniteQuery({
    queryKey: ["discover", cast, crew, genres],
    queryFn: ({ pageParam = 1, signal }) =>
      discoverMovies({ cast, crew, genres, page: pageParam }, signal),
    getNextPageParam: (last) =>
      last.page < last.total_pages ? last.page + 1 : undefined,
    staleTime: 10 * 60 * 1000,
  });
}

import { useInfiniteQuery } from "@tanstack/react-query";
import { searchMovies } from "../services/apiTmdb";

function useSearchMovies(searchTerm) {
  return useInfiniteQuery({
    queryKey: ["search", searchTerm],
    enabled: !!searchTerm,
    queryFn: ({ pageParam = 1, signal }) =>
      searchMovies(searchTerm, pageParam, signal),
    getNextPageParam: (last) =>
      last.page < last.total_pages ? last.page + 1 : undefined,
    staleTime: 10 * 60 * 1000,
  });
}

export default useSearchMovies;

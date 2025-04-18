import { useQuery } from "@tanstack/react-query";
import { fetchPopularMovies } from "../services/apiMovies";

export function usePopularMovies(page = 1) {
  return useQuery({
    queryKey: ["popularMovies", page],
    queryFn: () => fetchPopularMovies(page),
    keepPreviousData: true, // opcionalno, za paginaciju
    staleTime: 1000 * 60 * 5, // 5 minuta, za cache
  });
}

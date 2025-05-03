import { useQuery } from "@tanstack/react-query";
import { fetchPopularMovies } from "../../services/apiTmdb";

export default function usePopularMovies(page = 1) {
  return useQuery({
    queryKey: ["popular", page],
    queryFn: ({ signal }) => fetchPopularMovies(page, signal),
    staleTime: 1000 * 60 * 10,
  });
}

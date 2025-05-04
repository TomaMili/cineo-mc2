import { useQuery } from "@tanstack/react-query";
import { fetchTrendingMovies } from "../../services/apiTmdb";

export default function useTrending() {
  return useQuery({
    queryKey: ["trending"],
    queryFn: ({ signal }) => fetchTrendingMovies("week", signal),
    staleTime: 1000 * 60 * 5, // 5m cache
  });
}

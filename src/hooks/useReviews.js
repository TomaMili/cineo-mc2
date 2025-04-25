import { useQuery } from "@tanstack/react-query";
import { fetchMovieReviews } from "../services/apiTmdb";

export function useReviews(movieId, page = 1) {
  return useQuery({
    queryKey: ["movieReviews", movieId, page],
    enabled: !!movieId,
    queryFn: ({ signal }) => fetchMovieReviews(movieId, page, signal),
    staleTime: 10 * 60 * 1000, // 10 min
  });
}

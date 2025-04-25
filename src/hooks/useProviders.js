import { useQuery } from "@tanstack/react-query";
import { fetchMovieProviders } from "../services/apiTmdb";

export function useProviders(movieId, region) {
  return useQuery({
    queryKey: ["movieProviders", movieId, region ?? "HR"],
    enabled: !!movieId && !!region,
    queryFn: ({ signal }) => fetchMovieProviders(movieId, region, signal),
  });
}

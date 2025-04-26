import { useQuery } from "@tanstack/react-query";
import { fetchMovieDetails } from "../services/apiTmdb";

function useMovie(id) {
  return useQuery({
    queryKey: ["movie", id],
    queryFn: ({ signal }) => fetchMovieDetails(id, signal),
    staleTime: 1000 * 60 * 5,
  });
}

export default useMovie;

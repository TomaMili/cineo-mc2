import { useQuery } from "@tanstack/react-query";
import { fetchPopularMovies } from "../services/apiTmdb";

export default function useCollections() {
  return useQuery({
    queryKey: ["collections"],
    queryFn: async ({ signal }) => {
      const popular = await fetchPopularMovies(1, signal);
      const movies = popular.results;
      // build two dummy collections
      return [
        { id: "1", name: "Sci-Fi Favorites", movies: movies.slice(0, 6) },
        { id: "2", name: "Drama Picks", movies: movies.slice(6, 12) },
      ];
    },
    staleTime: 1000 * 60 * 5,
  });
}

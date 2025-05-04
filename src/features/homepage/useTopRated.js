import { useQuery } from "@tanstack/react-query";
import { fetchTopRatedMovies } from "../../services/apiTmdb";

export default function useTopRated(page = 1) {
  return useQuery({
    queryKey: ["top-rated", page],
    queryFn: ({ signal }) => fetchTopRatedMovies(page, signal),
    keepPreviousData: true,
  });
}

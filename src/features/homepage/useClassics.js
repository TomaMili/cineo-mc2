import { useQuery } from "@tanstack/react-query";
import { fetchClassicMovies } from "../../services/apiTmdb";

export default function useClassics(page = 1) {
  return useQuery({
    queryKey: ["classics", page],
    queryFn: ({ signal }) => fetchClassicMovies(page, signal),
    keepPreviousData: true,
  });
}

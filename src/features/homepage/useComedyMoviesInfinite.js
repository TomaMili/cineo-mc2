import { discoverByGenre } from "../../services/apiTmdb";
import useInfiniteCategory from "./useInfiniteCategory";

export default function useComedyMoviesInfinite() {
  return useInfiniteCategory("genre-35", (page, signal) =>
    discoverByGenre(35, page, signal)
  );
}

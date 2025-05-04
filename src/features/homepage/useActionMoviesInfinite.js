import { discoverByGenre } from "../../services/apiTmdb";
import useInfiniteCategory from "./useInfiniteCategory";

export default function useActionMoviesInfinite() {
  return useInfiniteCategory("genre-28", (page, signal) =>
    discoverByGenre(28, page, signal)
  );
}

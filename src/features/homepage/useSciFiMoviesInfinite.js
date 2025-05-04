import { discoverByGenre } from "../../services/apiTmdb";
import useInfiniteCategory from "./useInfiniteCategory";

export default function useSciFiMoviesInfinite() {
  return useInfiniteCategory("genre-878", (page, signal) =>
    discoverByGenre(878, page, signal)
  );
}

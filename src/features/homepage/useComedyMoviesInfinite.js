import { discoverByGenre } from "../../services/apiTmdb";
import useInfiniteCategory from "./useInfiniteCategory";

const COMEDY_ID = 35;
export default function useComedyMoviesInfinite() {
  return useInfiniteCategory(["genre", COMEDY_ID], (page, signal) =>
    discoverByGenre(COMEDY_ID, page, signal)
  );
}

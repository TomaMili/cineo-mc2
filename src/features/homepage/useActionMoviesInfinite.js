import { discoverByGenre } from "../../services/apiTmdb";
import useInfiniteCategory from "./useInfiniteCategory";

const ACTION_ID = 28;
export default function useActionMoviesInfinite() {
  return useInfiniteCategory(["genre", ACTION_ID], (page, signal) =>
    discoverByGenre(ACTION_ID, page, signal)
  );
}

import { discoverByGenre } from "../../services/apiTmdb";
import useInfiniteCategory from "./useInfiniteCategory";

const SCIFI_ID = 878;
export default function useSciFiMoviesInfinite() {
  return useInfiniteCategory(["genre", SCIFI_ID], (page, signal) =>
    discoverByGenre(SCIFI_ID, page, signal)
  );
}

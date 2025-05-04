// src/hooks/useAllProviders.js
import { useQuery } from "@tanstack/react-query";
import { fetchAllMovieProviders } from "../services/apiTmdb";

const TMDB_IMG_BASE = "https://image.tmdb.org/t/p/original";

export function useAllProviders(region = "HR") {
  return useQuery({
    queryKey: ["allMovieProviders", region],
    queryFn: ({ signal }) =>
      fetchAllMovieProviders(region, signal).then((list) =>
        list.map(({ provider_id, provider_name, logo_path }) => ({
          id: provider_id.toString(),
          label: provider_name,
          logo: logo_path ? `${TMDB_IMG_BASE}${logo_path}` : null,
        }))
      ),
    enabled: !!region,
    staleTime: 24 * 60 * 60 * 1000, // 1 day
  });
}

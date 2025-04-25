import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchTrailerOnYouTube } from "../services/apiYoutube";

export function useTrailerKey(details) {
  const tmdbTrailer = useMemo(() => {
    const vids = details?.videos?.results ?? [];
    return (
      vids.find((v) => v.type === "Trailer" && v.site === "YouTube") ||
      vids[0] ||
      null
    );
  }, [details]);

  const { data: ytKey } = useQuery({
    queryKey: ["ytTrailer", details?.id],
    enabled: !tmdbTrailer && !!details,
    queryFn: ({ signal }) =>
      searchTrailerOnYouTube(
        details.title,
        details.release_date.slice(0, 4),
        signal
      ),
    staleTime: 3_600_000, // 1 h
  });

  return tmdbTrailer?.key ?? ytKey ?? null;
}

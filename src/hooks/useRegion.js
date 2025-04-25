import { useQuery } from "@tanstack/react-query";
import { getRegionViaGeolocation } from "../utils/region";

export function useRegion() {
  return useQuery({
    queryKey: ["userRegionGeo"],
    queryFn: getRegionViaGeolocation,
    staleTime: 86_400_000, // 24 h
  });
}

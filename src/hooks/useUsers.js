import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../services/apiUsers";

export function useUserProfile(id, enabled = true) {
  return useQuery({
    queryKey: ["user-profile", id],
    queryFn: () => getUserProfile(id),
    enabled: !!id && enabled,
    staleTime: 5 * 60 * 1000,
  });
}

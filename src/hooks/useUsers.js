import { useQuery } from "@tanstack/react-query";
import { getUsers, getUserByID, getUserProfile } from "../services/apiUsers";

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
}

export function useUser(id, enabled = true) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserByID(id),
    enabled: !!id && enabled,
  });
}

export function useUserProfile(id, enabled = true) {
  return useQuery({
    queryKey: ["user-profile", id],
    queryFn: () => getUserProfile(id),
    enabled: !!id && enabled,
    staleTime: 5 * 60 * 1000,
  });
}

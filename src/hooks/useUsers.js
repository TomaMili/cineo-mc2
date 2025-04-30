import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getUsers,
  getUserByID,
  getUserProfile,
  updateUser,
} from "../services/apiUsers";

/* list */
export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
}

/* single row (basic) */
export function useUser(id, enabled = true) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserByID(id),
    enabled: !!id && enabled,
  });
}

/* full profile bundle */
export function useUserProfile(id, enabled = true) {
  return useQuery({
    queryKey: ["user-profile", id],
    queryFn: () => getUserProfile(id),
    enabled: !!id && enabled,
    staleTime: 5 * 60 * 1000, // 5 min cache
  });
}

/* update mutation (username, avatar, prefs …) */
export function useUpdateUser(id) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (patch) => updateUser(id, patch),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["user-profile", id] }),
  });
}

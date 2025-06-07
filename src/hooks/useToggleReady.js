import { useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "../services/supabase";
import { useCurrentUser } from "./useAuth";

export function useToggleReady(roomId) {
  const qc = useQueryClient();
  const { profile } = useCurrentUser();

  return useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("watch_room_members")
        .update({ is_ready: supabase.sql`NOT is_ready` })
        .eq("room_id", roomId)
        .eq("user_id", profile.id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries(["members", roomId]);
      qc.invalidateQueries(["room", roomId]);
    },
  });
}

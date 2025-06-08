import { useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "../services/supabase";
import { useCurrentUser } from "../hooks/useAuth";

export function useToggleReady(roomId) {
  const qc = useQueryClient();
  const { profile } = useCurrentUser();
  const userId = profile?.id;

  return useMutation({
    mutationFn: async ({ value }) => {
      const { error } = await supabase
        .from("watch_room_members")
        .update({ is_ready: value })
        .eq("room_id", roomId)
        .eq("user_id", userId);

      if (error) throw error;
    },

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["members", roomId] });
      qc.invalidateQueries({ queryKey: ["room", roomId] });
    },
  });
}

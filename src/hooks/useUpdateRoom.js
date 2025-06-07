// src/features/watch_together/hooks/useUpdateRoom.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "../services/supabase";

export function useUpdateRoom(roomId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      console.log("Updating room", roomId, payload);
      const { data, error } = await supabase
        .from("watch_rooms")
        .update(payload)
        .eq("id", Number(roomId))
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["room", roomId]);
    },
  });
}

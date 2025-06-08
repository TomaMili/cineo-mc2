// src/features/watch_together/hooks/useUpdateRoom.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "../services/supabase"; // ← ispravno

export function useUpdateRoom(roomId) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const { data, error } = await supabase
        .from("watch_rooms")
        .update(payload)
        .eq("id", Number(roomId))
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["room", roomId] });
    },
  });
}

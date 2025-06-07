// src/hooks/useMembers.js
import { useQuery } from "@tanstack/react-query";
import supabase from "../services/supabase";

export function useMembers(roomId) {
  return useQuery({
    queryKey: ["members", roomId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("watch_room_members")
        .select(
          `
          id:user_id,
          is_ready,
          users (
            username
          )
        `
        )
        .eq("room_id", roomId);
      if (error) throw error;
      return data.map((m) => ({
        id: m.id,
        username: m.users.username,
        is_ready: m.is_ready,
      }));
    },
    enabled: !!roomId,
    refetchInterval: 5000,
  });
}

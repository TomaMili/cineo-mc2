import { useQuery } from "@tanstack/react-query";
import supabase from "../services/supabase";

export function useRoom(roomId) {
  return useQuery({
    queryKey: ["room", roomId],
    enabled: !!roomId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("watch_rooms")
        .select("*")
        .eq("id", Number(roomId))
        .single();
      if (error) throw error;
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

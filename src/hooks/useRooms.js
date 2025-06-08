// src/hooks/useRooms.js
import { useQuery } from "@tanstack/react-query";
import supabase from "../services/supabase";

export function useRooms() {
  return useQuery({
    queryKey: ["rooms"],
    queryFn: async () => {
      const { data, error } = await supabase.from("watch_rooms").select(
        `
            id,
            name,
            room_type,
            movie_limit,
            expires_at,
            status,
            owner_id,
            watch_room_members ( is_ready )
          `
      ); // 👈  NEMA { count: 'exact' } – nepotreban je

      if (error) throw error;

      return data.map((room) => {
        const members = room.watch_room_members ?? [];
        const memberCount = members.length;
        const readyCount = members.filter((m) => m.is_ready).length;

        return {
          ...room,
          member_count: memberCount,
          ready_count: readyCount,
        };
      });
    },

    staleTime: 10_000, // 10 s
    refetchInterval: 15_000, // refetch svake 15 s
  });
}

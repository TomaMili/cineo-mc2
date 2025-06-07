import { useQuery } from "@tanstack/react-query";
import supabase from "../services/supabase";

export function useRooms() {
  return useQuery({
    queryKey: ["rooms"],
    queryFn: async () => {
      // fetch all rooms (RLS will automatically hide ones you don't own / belong to)
      const { data, error } = await supabase.from("watch_rooms").select(
        `
          id,
          name,
          room_type,
          movie_limit,
          expires_at,
          status,
          owner_id,
          watch_room_members(count)
        `,
        { count: "exact" }
      );
      if (error) throw error;

      // attach a member_count field
      return data.map((room) => ({
        ...room,
        member_count: room.watch_room_members.count ?? 0,
      }));
    },
    staleTime: 10_000,
    refetchInterval: 15_000,
  });
}

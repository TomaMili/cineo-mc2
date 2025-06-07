// src/hooks/useRoom.js
import { useQuery } from "@tanstack/react-query";
import supabase from "../services/supabase";

/**
 * Dohvaća osnovne podatke o sobi + broj članova.
 * • Vrati { …room, member_count }  ili baci grešku → React-Query to hvata.
 *
 * ⚠️  groupId stiže iz URL-a kao string → pretvaramo ga u Number
 *     jer je `id` kolona BIGINT.
 */
export function useRoom(groupId) {
  return useQuery({
    queryKey: ["room", groupId],
    // ne pokreći query dok nemamo ID
    enabled: !!groupId,
    queryFn: async () => {
      // ────────────────────────────────────────────────────────────────
      const { data, error } = await supabase
        .from("watch_rooms")
        /*
         * 1)  `watch_room_members(count)` ⇒ vraća samo COUNT(*)
         *     (Supabase ga stavi pod alias `watch_room_members`)
         *
         * 2)  `left` osigurava da se red vrati čak i ako soba trenutačno
         *     nema niti jednog člana (npr. odmah nakon kreiranja).
         */
        .select(
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
          { head: false, count: "exact" } // ← count nam treba za RLS; head:false = vrati row
        )
        .eq("id", Number(groupId)) // ← obavezno Number()
        .single();

      // ────────────────────────────────────────────────────────────────
      if (error) throw error;

      // Supabase vraća { …fields, watch_room_members: { count: n } }
      return {
        ...data,
        member_count: data.watch_room_members.count ?? 0,
      };
    },
    staleTime: 10_000, // 10 s ne refreša
    refetchInterval: 15_000, // svakih 15 s poll
  });
}

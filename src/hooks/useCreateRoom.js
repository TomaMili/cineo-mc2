// src/hooks/useCreateRoom.js
import { useMutation } from "@tanstack/react-query";
import supabase from "../services/supabase";
import { useCurrentUser } from "./useAuth";

export function useCreateRoom() {
  const { profile } = useCurrentUser(); // profile.id = users.id

  return useMutation({
    mutationFn: async ({ name, room_type, movie_limit, expires_at }) => {
      // ➊ — napravi sobu
      const { data: room, error } = await supabase
        .from("watch_rooms")
        .insert([
          {
            name,
            room_type,
            movie_limit,
            expires_at,
            owner_id: profile.id,
            status: "active",
          },
        ])
        .select("id")
        .single();

      if (error) throw error;

      // ➋ — upiši vlasnika u members
      await supabase.from("watch_room_members").insert({
        room_id: room.id,
        user_id: profile.id,
      });

      return { id: room.id };
    },
  });
}

import { useQuery } from "@tanstack/react-query";
import {
  ACHIEVEMENT_DEFINITIONS,
  getUserAchievements,
  syncAchievements,
} from "../services/apiAchievements";

export function useUserAchievements(userId) {
  useQuery({
    queryKey: ["syncAchievements", userId],
    queryFn: () => syncAchievements(userId),
    enabled: !!userId,
  });

  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["achievements", userId],
    queryFn: () => getUserAchievements(userId),
    enabled: !!userId,
  });

  const completed = new Set(data.map((r) => r.achivement_name));
  const items = ACHIEVEMENT_DEFINITIONS.map((def) => ({
    ...def,
    completed: completed.has(def.key),
    date:
      data.find((r) => r.achivement_name === def.key)?.date_achieved || null,
  }));

  return { items, isLoading, error };
}

import { useQuery } from "@tanstack/react-query";

import { getUserByID } from "../services/apiUsers";

export function useUser(id) {
  const {
    isLoading,
    data: user,
    error,
  } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserByID(id),
    enabled: !!id,
  });

  return { isLoading, error, user };
}

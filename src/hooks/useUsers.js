import { useQuery } from "@tanstack/react-query";

import { getUsers } from "../services/apiUsers";

export function useUsers() {
  const {
    isLoading,
    data: { data: users, count } = {},
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });

  return { isLoading, error, users, count };
}

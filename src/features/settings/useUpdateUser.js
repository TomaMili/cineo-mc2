import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";
import { useCurrentUser } from "../../hooks/useAuth";

export function useUpdateUser() {
  const { refreshProfile } = useCurrentUser();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ profile }) => {
      queryClient.setQueryData(["current-user"], profile);

      refreshProfile();
    },
    onError: (err) => {
      console.error("Update failed:", err);
      toast.error(err.message);
    },
  });

  return {
    updateUser: mutation.mutate,
    isUpdating: mutation.isLoading,
  };
}

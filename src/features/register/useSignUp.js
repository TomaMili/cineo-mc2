import { useMutation } from "@tanstack/react-query";
import { signUpWithProfile } from "../../services/apiAuth";

export function useSignUp() {
  return useMutation({
    mutationFn: signUpWithProfile,
  });
}

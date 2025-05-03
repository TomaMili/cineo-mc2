import { useMutation } from "@tanstack/react-query";
import { signUpWithProfile } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { useRegistration } from "./RegistrationContext";

export default function RegisterFinish() {
  const nav = useNavigate();
  const { data } = useRegistration();
  const { email, password, username, genres, platforms, actors, plan } = data;

  const mutation = useMutation({
    mutationFn: signUpWithProfile,
    onSuccess: () => {
      nav("/homepage");
    },
    onError: (err) => {
      alert(err.message);
    },
  });

  const handleFinish = () => {
    mutation.mutate({
      email,
      password,
      username,
      genres,
      platforms,
      actors,
      plan,
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-6 bg-black rounded text-white">
      <h2 className="text-2xl font-semibold text-center">You’re all set!</h2>
      <p className="text-center text-siva-200">
        Click below to create your account and get started.
      </p>
      <button
        onClick={handleFinish}
        disabled={mutation.isLoading}
        className="block w-full py-3 bg-bordo-500 rounded hover:bg-bordo-400 disabled:opacity-50 text-lg"
      >
        {mutation.isLoading ? "Creating account…" : "Finish Registration"}
      </button>
      {mutation.isError && (
        <p className="text-red-500 text-center">{mutation.error.message}</p>
      )}
    </div>
  );
}

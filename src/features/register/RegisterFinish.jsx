/* eslint-disable no-unused-vars */
import { useMutation } from "@tanstack/react-query";
import { signUpWithProfile } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { useRegistration } from "./RegistrationContext";
import { motion } from "framer-motion";

export default function RegisterFinish() {
  const nav = useNavigate();
  const { data } = useRegistration();
  const { email, password, username, genres, platforms, actors, plan } = data;

  const mutation = useMutation({
    mutationFn: signUpWithProfile,
    onSuccess: () => nav("/homepage"),
    onError: (err) => alert(err.message),
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
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center min-h-[60vh] px-4"
    >
      <h2 className="text-4xl -mt-8 mb-10 text-white">You are all set!</h2>
      <p className="text-center text-xl lg:text-2xl font-light text-siva-200 max-w-xl mb-14">
        Rate movies you watched and add movies to your watch later list to
        further personalize your profile
      </p>
      <button
        onClick={handleFinish}
        disabled={mutation.isLoading}
        className="px-12 py-3 bg-bordo-500 cursor-pointer hover:bg-bordo-400 rounded-full text-white font-semibold uppercase transition disabled:opacity-50"
      >
        {mutation.isLoading ? "Creating account…" : "Finish"}
      </button>
      {mutation.isError && (
        <p className="mt-4 text-red-500">{mutation.error.message}</p>
      )}
    </motion.div>
  );
}

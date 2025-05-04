/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useUpdateUser } from "./useUpdateUser";
import { useCurrentUser } from "../../hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";

export default function UpdateUsernameForm() {
  const { profile } = useCurrentUser();
  const defaultUsername = profile?.username || "";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: { username: defaultUsername },
  });

  // Keep the input synced if profile.username ever changes
  useEffect(() => {
    reset({ username: defaultUsername });
  }, [defaultUsername, reset]);

  const { updateUser } = useUpdateUser();

  const onSubmit = ({ username }) => {
    updateUser(
      { username },
      {
        onSuccess: () => {
          toast.success("Username updated!");

          reset({ username });
        },
      }
    );
    console.log(username);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-xl font-semibold">Update Username</h2>
      <AnimatePresence mode="wait" key="update-username-form">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <label htmlFor="username" className="block font-medium">
            Username
          </label>
          <input
            id="username"
            type="text"
            disabled={isSubmitting}
            {...register("username", {
              required: "Username is required",
              minLength: { value: 3, message: "At least 3 characters" },
            })}
            className="w-full px-4 py-3
            bg-siva-800/10 
            border border-white/30 rounded-lg
            placeholder-white/50 text-white
            focus:outline-none focus:ring-2 focus:ring-bordo-400
            transition"
          />
          {errors.username && (
            <p className="mt-1 text-sm text-red-500">
              {errors.username.message}
            </p>
          )}
        </motion.div>
      </AnimatePresence>
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => reset()}
          disabled={isSubmitting}
          className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 cursor-pointer transition-all duration-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-bordo-500 rounded hover:bg-bordo-400 text-white cursor-pointer transition-all duration-300"
        >
          {isSubmitting ? "Saving…" : "Save Username"}
        </button>
      </div>
    </form>
  );
}

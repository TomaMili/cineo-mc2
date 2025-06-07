/* eslint-disable no-unused-vars */
import React from "react";
import { useForm } from "react-hook-form";
import { useUpdateUser } from "./useUpdateUser";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

export default function UpdatePasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm();

  const { updateUser } = useUpdateUser();

  const onSubmit = ({ password }) => {
    updateUser(
      { password },
      {
        onSuccess: () => {
          toast.success("Password changed!");

          reset();
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="sm:text-xl font-medium">Change Password</h2>

      <AnimatePresence mode="wait" key="update-password-form">
        <motion.div
          key="password"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <label htmlFor="password" className="block text-sm sm:text-md">
            New password (min 8 chars)
          </label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            disabled={isSubmitting}
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Password needs at least 8 characters",
              },
            })}
            className="w-full px-4 py-3
            bg-siva-800/10 
            border border-white/30 rounded-lg
            placeholder-white/50 text-white
            focus:outline-none focus:ring-2 focus:ring-bordo-400
            transition"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </motion.div>

        <motion.div
          key="passwordConfirm"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <label htmlFor="passwordConfirm" className="block text-sm sm:text-md">
            Confirm password
          </label>
          <input
            id="passwordConfirm"
            type="password"
            autoComplete="new-password"
            disabled={isSubmitting}
            {...register("passwordConfirm", {
              required: "This field is required",
              validate: (value) =>
                getValues().password === value || "Passwords need to match",
            })}
            className="w-full px-4 py-3
            bg-siva-800/10 
            border border-white/30 rounded-lg
            placeholder-white/50 text-white
            focus:outline-none focus:ring-2 focus:ring-bordo-400
            transition"
          />
          {errors.passwordConfirm && (
            <p className="mt-1 text-sm text-red-500">
              {errors.passwordConfirm.message}
            </p>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => reset()}
          disabled={isSubmitting}
          className="bg-gray-700 hover:bg-gray-700 px-3 sm:px-4 py-1 sm:py-2 rounded flex items-center gap-2 transition-colors duration-300 cursor-pointer text-sm sm:text-md"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-bordo-500 hover:bg-bordo-400 px-3 sm:px-4 py-1 sm:py-2 rounded flex items-center gap-2 transition-colors duration-300 cursor-pointer text-sm sm:text-md"
        >
          {isSubmitting ? "Updating…" : "Update Password"}
        </button>
      </div>
    </form>
  );
}

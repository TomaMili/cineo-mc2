import { useForm } from "react-hook-form";
import { useUpdateUser } from "./useUpdateUser";

export default function UpdatePasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();
  const { updateUser, isUpdating } = useUpdateUser();

  const onSubmit = ({ password }) => {
    updateUser({ password }, { onSuccess: reset });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* New Password */}
      <div>
        <label htmlFor="password" className="block font-medium">
          New password (min 8 chars)
        </label>
        <input
          id="password"
          type="password"
          autoComplete="new-password"
          disabled={isUpdating}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
          className="mt-1 w-full px-3 py-2 bg-gray-900 rounded"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label htmlFor="passwordConfirm" className="block font-medium">
          Confirm password
        </label>
        <input
          id="passwordConfirm"
          type="password"
          autoComplete="new-password"
          disabled={isUpdating}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              getValues().password === value || "Passwords need to match",
          })}
          className="mt-1 w-full px-3 py-2 bg-gray-900 rounded"
        />
        {errors.passwordConfirm && (
          <p className="mt-1 text-sm text-red-500">
            {errors.passwordConfirm.message}
          </p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => reset()}
          disabled={isUpdating}
          className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isUpdating}
          onClick={isUpdating}
          className="px-4 py-2 bg-bordo-500 rounded hover:bg-bordo-400 cursor-pointer"
        >
          {isUpdating ? "Updating…" : "Update password"}
        </button>
      </div>
    </form>
  );
}

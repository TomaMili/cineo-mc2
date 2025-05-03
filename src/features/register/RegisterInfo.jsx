// src/features/register/RegisterInfo.jsx
import { useEffect } from "react";
import { useRegistrationContext } from "./RegistrationContext";

export default function RegisterInfo() {
  const { data, update } = useRegistrationContext();
  const { email, username, password, confirm } = data;

  // simple client-side validation
  const valid =
    email.trim() &&
    username.trim() &&
    password.length >= 8 &&
    password === confirm;

  // notify the parent layout that this step is valid
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("step-valid", { detail: valid }));
  }, [valid]);

  return (
    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
      <label className="block">
        Email *
        <input
          type="email"
          value={email}
          onChange={(e) => update({ email: e.target.value })}
          className="mt-1 w-full rounded bg-gray-900 px-3 py-2"
          required
        />
      </label>

      <label className="block">
        Username *
        <input
          type="text"
          value={username}
          onChange={(e) => update({ username: e.target.value })}
          className="mt-1 w-full rounded bg-gray-900 px-3 py-2"
          required
        />
      </label>

      <label className="block">
        Password * (min 8 chars)
        <input
          type="password"
          value={password}
          onChange={(e) => update({ password: e.target.value })}
          className="mt-1 w-full rounded bg-gray-900 px-3 py-2"
          minLength={8}
          required
        />
      </label>

      <label className="block">
        Repeat password *
        <input
          type="password"
          value={confirm}
          onChange={(e) => update({ confirm: e.target.value })}
          className="mt-1 w-full rounded bg-gray-900 px-3 py-2"
          required
        />
      </label>
    </form>
  );
}

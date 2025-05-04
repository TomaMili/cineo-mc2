import { useEffect } from "react";
import { useRegistrationContext } from "./RegistrationContext";

export default function RegisterInfo() {
  const { data, update } = useRegistrationContext();
  const { email, username, password, confirm } = data;

  const valid =
    email.trim().length > 0 &&
    username.trim().length > 0 &&
    password.length >= 8 &&
    password === confirm;

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("step-valid", { detail: valid }));
  }, [valid]);

  const pwTooShort = password.length > 0 && password.length < 8;
  const pwMismatch = confirm.length > 0 && password !== confirm;

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
      <div>
        <label className="block mb-1 text-white/80">Email *</label>
        <input
          type="email"
          value={email}
          onChange={(e) => update({ email: e.target.value })}
          className="
            w-full px-4 py-3
            bg-siva-800/10 
            border border-white/30 rounded-lg
            placeholder-white/50 text-white
            focus:outline-none focus:ring-2 focus:ring-bordo-400
            transition
          "
          required
        />
      </div>

      <div>
        <label className="block mb-1 text-white/80">Username *</label>
        <input
          type="text"
          value={username}
          onChange={(e) => update({ username: e.target.value })}
          className="
            w-full px-4 py-3
            bg-siva-800/10 bg-opacity-40
            border border-white/30 rounded-lg
            placeholder-white/50 text-white
            focus:outline-none focus:ring-2 focus:ring-bordo-400
            transition
          "
          required
        />
      </div>

      <div>
        <label className="block mb-1 text-white/80">
          Password * <span className="text-xs">(min 8 chars)</span>
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => update({ password: e.target.value })}
          className="
            w-full px-4 py-3
            bg-siva-800/10 bg-opacity-40
            border border-white/30 rounded-lg
            placeholder-white/50 text-white
            focus:outline-none focus:ring-2 focus:ring-bordo-400
            transition
          "
          required
          minLength={8}
        />
        {pwTooShort && (
          <p className="absolute mt-1 text-xs text-red-400">
            Must be at least 8 characters.
          </p>
        )}
      </div>

      <div>
        <label className="block mb-1 text-white/80">Repeat password *</label>
        <input
          type="password"
          value={confirm}
          onChange={(e) => update({ confirm: e.target.value })}
          className="
            w-full px-4 py-3
            bg-siva-800/10 bg-opacity-40
            border border-white/30 rounded-lg
            placeholder-white/50 text-white
            focus:outline-none focus:ring-2 focus:ring-bordo-400
            transition
          "
          required
        />
        {pwMismatch && (
          <p className="absolute mt-1 text-xs text-red-400">
            Passwords must match.
          </p>
        )}
      </div>
    </form>
  );
}

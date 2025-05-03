import { useState } from "react";
import { useLogin } from "../../hooks/useAuth";
import Spinner from "../../ui/Spinner";

export default function LoginForm() {
  const [email, setEmail] = useState("toma@gmail.com");
  const [password, setPassword] = useState("12345678");
  const { login, isLoading, error } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500 text-sm">{error.message}</p>}

      <div>
        <label htmlFor="email" className="block font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          className="mt-1 w-full px-3 py-2 bg-gray-900 rounded"
        />
      </div>

      <div>
        <label htmlFor="password" className="block font-medium">
          Password
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          className="mt-1 w-full px-3 py-2 bg-gray-900 rounded"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-2 bg-bordo-500 rounded text-white cursor-pointer"
      >
        {isLoading ? <Spinner /> : "Log in"}
      </button>
    </form>
  );
}

import { useState } from "react";
import { useLogin } from "./useLogin";
import Spinner from "../../ui/Spinner";

export default function LoginForm() {
  const [email, setEmail] = useState("cineo@email.com");
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
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="text-red-400 text-sm text-center">
          {error.message || "Login failed"}
        </div>
      )}
      <div>
        <label htmlFor="email" className="block text-gray-200 mb-1">
          Email *
        </label>
        <input
          id="email"
          type="text"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          className="w-full px-4 py-3 rounded-lg bg-black bg-opacity-50 border border-gray-400 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="Enter your email"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-gray-200 mb-1">
          Password *
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          className="w-full px-4 py-3 rounded-lg bg-black bg-opacity-50 border border-gray-400 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="••••••••"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full cursor-pointer flex items-center justify-center py-3 bg-red-800 hover:bg-red-700 text-white rounded-lg font-medium transition"
      >
        {isLoading ? <Spinner size={24} /> : "Login"}
      </button>
    </form>
  );
}

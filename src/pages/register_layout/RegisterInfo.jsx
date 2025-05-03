import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignUp } from "../../features/register/useSignUp";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  // now returns { mutate, isLoading, error, ... }
  const { mutate, isLoading, error } = useSignUp();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password || !username) return;
    mutate(
      { email, password, username },
      {
        onSuccess: () => {
          navigate("/homepage", { replace: true });
        },
      }
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="text-red-500">{error.message}</div>}

      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        disabled={isLoading}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLoading}
      />

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Signing up…" : "Register"}
      </button>
    </form>
  );
}

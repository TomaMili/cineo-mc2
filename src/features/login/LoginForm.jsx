/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useLogin } from "../../hooks/useAuth";
import Spinner from "../../ui/Spinner";
import { motion, AnimatePresence } from "framer-motion";

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
    <AnimatePresence mode="wait">
      <motion.form
        key="login-form"
        onSubmit={handleSubmit}
        className="relative space-y-6 max-w-md mx-auto p-2 rounded-lg  text-white overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="relative h-6">
          <AnimatePresence>
            {error && (
              <motion.p
                className="absolute top-12 right-1 text-red-500 text-sm"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                {error.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
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
            className="w-full px-4 py-3
            bg-siva-800/10 
            border border-white/30 rounded-lg
            placeholder-white/50 text-white
            focus:outline-none focus:ring-2 focus:ring-bordo-400
            transition"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
        >
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
            className="w-full px-4 py-3
            bg-siva-800/10 
            border border-white/30 rounded-lg
            placeholder-white/50 text-white
            focus:outline-none focus:ring-2 focus:ring-bordo-400
            transition"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 cursor-pointer transition-all duration-300 bg-bordo-500 rounded text-white hover:bg-bordo-400 disabled:opacity-50 flex justify-center"
          >
            {isLoading ? <Spinner /> : "Log in"}
          </button>
        </motion.div>
      </motion.form>
    </AnimatePresence>
  );
}

import { Link } from "react-router-dom";
import LoginForm from "../features/login/LoginForm";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[url(/bg-image.jpg)]">
      <div className="bg-siva-800/80 bg-opacity-60 rounded-2xl p-10 max-w-md w-full shadow-xl">
        <h1 className="text-4xl text-white font-light text-center mb-8">
          Login
        </h1>
        <LoginForm />
        <p className="mt-6 text-center text-gray-300">
          Don’t have an account?{" "}
          <Link to="/register" className="text-red-400 hover:text-red-300">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

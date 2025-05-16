import { Navigate, Outlet } from "react-router-dom";
import Spinner from "../ui/Spinner";
import { useCurrentUser } from "../hooks/useAuth";

export default function ProtectedRoute() {
  const { authUser, loading } = useCurrentUser();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!authUser) {
    return <Navigate to="/landing-page" replace />;
  }

  return <Outlet />;
}

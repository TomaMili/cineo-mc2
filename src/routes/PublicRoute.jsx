import { Navigate, Outlet } from "react-router-dom";
import Spinner from "../ui/Spinner";
import { useCurrentUser } from "../hooks/useAuth";

export default function PublicRoute() {
  const { authUser, loading } = useCurrentUser();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (authUser) {
    return <Navigate to="/homepage" replace />;
  }

  return <Outlet />;
}

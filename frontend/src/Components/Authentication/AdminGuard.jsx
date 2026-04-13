import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function AdminGuard({ children }) {
  const { user, loading } = useAuth();

  if (loading)
    return <div className="text-center py-10">Checking access...</div>;

  const allowedRoles = ["ADMIN"];
  if (!user) return <Navigate to="/unauthorized" replace />;
  return user && allowedRoles.includes(user.role) ? (
    children
  ) : (
    <Navigate to="/unauthorized" replace />
  );
}

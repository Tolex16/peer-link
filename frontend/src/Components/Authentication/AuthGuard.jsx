import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider"; // Make sure this provides isAuthenticated

export default function AuthGuard({ children }) {
  const { isAuthenticated } = useAuth(); // or however your auth context is set up
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login and preserve the intended path
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

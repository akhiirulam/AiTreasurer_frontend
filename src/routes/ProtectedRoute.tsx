import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const auth = useContext(AuthContext);
  const location = useLocation();

  // =====================================================
  // LOADING
  // =====================================================

  if (auth?.isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5ffc2]">
        <p className="font-mono text-lg">Loading...</p>
      </div>
    );
  }

  // =====================================================
  // NOT AUTHENTICATED
  // =====================================================

  if (!auth?.isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // =====================================================
  // ROLE AUTHORIZATION
  // =====================================================

  if (allowedRoles && (!auth?.user || !allowedRoles.includes(auth.user.role))) {
    // Redirect user based on their role

    if (auth?.user?.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }

    return <Navigate to="/owner/dashboard" replace />;
  }

  // =====================================================
  // AUTHORIZED
  // =====================================================

  return <Outlet />;
};

export default ProtectedRoute;

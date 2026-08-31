import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = () => {
  const auth = useContext(AuthContext);
  const location = useLocation();

  // Wait until AuthContext finishes checking
  // the refresh-token session.
  if (auth?.isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5ffc2]">
        <p className="font-mono text-lg">Loading...</p>
      </div>
    );
  }

  // User is not authenticated
  if (!auth?.isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // User is authenticated
  return <Outlet />;
};

export default ProtectedRoute;

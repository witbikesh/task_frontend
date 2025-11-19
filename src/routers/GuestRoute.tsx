import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/auth/AuthContext";

interface GuestRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

const GuestRoute: React.FC<GuestRouteProps> = ({
  children,
  redirectTo = "/",
}) => {
  const { isAuthenticated } = useAuthContext();

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};

export default GuestRoute;

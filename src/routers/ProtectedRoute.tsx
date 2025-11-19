import type { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return children;
}

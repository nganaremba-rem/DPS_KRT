import { Suspense } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const IsNotLogin = () => {
  const { user } = useAuth();
  const location = useLocation();
  return user ? (
    <Navigate to="/dashboard" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};

export default IsNotLogin;

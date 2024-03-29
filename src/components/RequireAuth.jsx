import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
  const { user } = useAuth();
  const location = useLocation();

  return user ? (
    <Outlet />
  ) : (
    <Navigate
      to="/"
      state={{
        from: location,
      }}
      replace
    />
  );
};

export default RequireAuth;

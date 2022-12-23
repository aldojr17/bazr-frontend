import { parseCookies } from "nookies";
import { Navigate, Outlet } from "react-router-dom";

const UnprotectedRoutes = () => {
  const isLoggedIn = parseCookies()?.auth;

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default UnprotectedRoutes;

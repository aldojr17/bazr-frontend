import { parseCookies } from "nookies";
import { Navigate, Outlet } from "react-router-dom";

const AuthRoutes = () => {
  const isLogged = parseCookies().auth;

  if (isLogged && isLogged !== null) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default AuthRoutes;

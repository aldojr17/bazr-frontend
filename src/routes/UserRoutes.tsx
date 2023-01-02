import { parseCookies } from "nookies";
import { Navigate, Outlet } from "react-router-dom";

const UserRoutes = () => {
  const isLogged = parseCookies().auth;

  if (!isLogged) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default UserRoutes;

import { parseCookies } from "nookies";
import { Navigate, Outlet } from "react-router-dom";
import routes from "../routes/Routes";

const UserRoutes = () => {
  const isLogged = parseCookies().auth;

  if (!isLogged) {
    return <Navigate to={routes.LOGIN} />;
  }

  return <Outlet />;
};

export default UserRoutes;

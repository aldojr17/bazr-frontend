import { Outlet } from "react-router-dom";
import AuthTemplate from "../components/Auth/AuthTemplate";

const AuthRoutes = () => {
  return (
    <AuthTemplate>
      <Outlet />
    </AuthTemplate>
  );
};

export default AuthRoutes;

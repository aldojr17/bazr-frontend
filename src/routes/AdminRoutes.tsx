import { parseCookies } from "nookies";
import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import AdminLayout from "../layout/AdminLayout";
import { userRole } from "../util/constant";
import routes from "./Routes";

const AdminRoutes = () => {
  const navigate = useNavigate();
  const { userLoading, fetchProfile } = useUser();
  const isLogged = parseCookies().auth;

  useEffect(() => {
    fetchProfile().then((data) => {
      if (data?.role_id !== userRole.ADMIN) {
        navigate(routes.HOME);
      }
    });
  }, []);

  if (!isLogged) {
    return <Navigate to={routes.HOME} />;
  }

  return (
    <AdminLayout>{userLoading ? <>Loading...</> : <Outlet />}</AdminLayout>
  );
};

export default AdminRoutes;

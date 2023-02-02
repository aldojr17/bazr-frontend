import { parseCookies } from "nookies";
import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import SellerLayout from "../layout/SellerLayout";
import { userRole } from "../util/constant";
import routes from "./Routes";

function SellerRoutes() {
  const navigate = useNavigate();
  const { userLoading, fetchProfile } = useUser();
  const isLogged = parseCookies().auth;

  useEffect(() => {
    fetchProfile().then((data) => {
      if (data?.role_id === userRole.ADMIN) {
        navigate(routes.ADMIN_DASHBOARD);
      } else if (!data?.is_seller || data?.shop_id === 0) {
        navigate(routes.REGISTER_MERCHANT);
      }
    });
  }, []);

  if (!isLogged) {
    return <Navigate to={routes.HOME} />;
  }

  return (
    <SellerLayout>{userLoading ? <>Loading...</> : <Outlet />}</SellerLayout>
  );
}

export default SellerRoutes;

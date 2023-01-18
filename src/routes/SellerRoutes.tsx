import { parseCookies } from "nookies";
import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import SellerLayout from "../layout/SellerLayout";

function SellerRoutes() {
  const navigate = useNavigate();
  const { userLoading, fetchProfile } = useUser();
  const isLogged = parseCookies().auth;

  useEffect(() => {
    fetchProfile().then((data) => {
      if (!data?.is_seller || data?.shop_id === 0) {
        navigate("/register-merchant");
      }
    });
  }, []);

  if (!isLogged) {
    return <Navigate to="/login" />;
  }

  return (
    <SellerLayout>{userLoading ? <>Loading...</> : <Outlet />}</SellerLayout>
  );
}

export default SellerRoutes;

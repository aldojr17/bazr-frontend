import { parseCookies } from "nookies";
import { Navigate, Outlet } from "react-router-dom";
import SellerLayout from "../layout/SellerLayout";

function SellerRoutes() {
  const isLogged = parseCookies().auth;

  if (!isLogged) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <SellerLayout>
        <Outlet />
      </SellerLayout>
    </>
  );
}

export default SellerRoutes;

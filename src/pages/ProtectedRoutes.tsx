import { parseCookies } from "nookies";
import { Navigate, Outlet } from "react-router-dom";
import Layout from "../layout/Layout";

const ProtectedRoutes = () => {
  const isLoggedIn = parseCookies()?.auth;

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default ProtectedRoutes;

import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import Layout from "../layout/Layout";
import { userRole } from "../util/constant";
import routes from "./Routes";

const LayoutRoutes = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    if (user?.role_id === userRole.ADMIN) {
      navigate(routes.ADMIN);
    }
  }, [user]);

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default LayoutRoutes;

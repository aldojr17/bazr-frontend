import { Outlet } from "react-router-dom";
import Layout from "../layout/Layout";

const LayoutRoutes = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default LayoutRoutes;

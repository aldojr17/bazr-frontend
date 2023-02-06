import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import LayoutPlain from "../layout/LayoutPlain";
import { userRole } from "../util/constant";
import routes from "./Routes";

const LayoutPlainRoutes = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    if (user?.role_id === userRole.ADMIN) {
      navigate(routes.ADMIN);
    }
  }, [user]);

  return (
    <LayoutPlain>
      <Outlet />
    </LayoutPlain>
  );
};

export default LayoutPlainRoutes;

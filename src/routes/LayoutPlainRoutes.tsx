import { Outlet } from "react-router-dom";
import LayoutPlain from "../layout/LayoutPlain";

const LayoutPlainRoutes = () => {
  return (
    <LayoutPlain>
      <Outlet />
    </LayoutPlain>
  );
};

export default LayoutPlainRoutes;

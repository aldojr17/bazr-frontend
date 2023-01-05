import React from "react";
import { Route, Routes } from "react-router-dom";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import AuthRoutes from "./AuthRoutes";
import LayoutRoutes from "./LayoutRoutes";
import UserRoutes from "./UserRoutes";

const Home = React.lazy(() => import("../pages/Home/Home"));
const Login = React.lazy(() => import("../pages/Auth/Login"));
const Register = React.lazy(() => import("../pages/Auth/Register"));
const NotFound = React.lazy(() => import("../pages/NotFound/NotFound"));
const Search = React.lazy(() => import("../pages/Search/Search"));
const Cart = React.lazy(() => import("../pages/Cart/Cart"));
const Checkout = React.lazy(() => import("../pages/Checkout/Checkout"));
const CategoryPrimary = React.lazy(
  () => import("../pages/Category/CategoryPrimary")
);
const CategorySecondary = React.lazy(
  () => import("../pages/Category/CategorySecondary")
);
const CategoryTertiary = React.lazy(
  () => import("../pages/Category/CategoryTertiary")
);

const RouteList = () => {
  let routes = (
    <Routes>
      <Route element={<LayoutRoutes />}>
        <Route path="/" element={<Home />} errorElement={<NotFound />} />
        <Route path="/search" element={<Search />} />
        <Route
          path="/pdp/:id/:title"
          element={<ProductDetail />}
          errorElement={<NotFound />}
        />
        <Route path="/p/:cPrimary" element={<CategoryPrimary />} />
        <Route
          path="/p/:cPrimary/:cSecondary"
          element={<CategorySecondary />}
        />
        <Route
          path="/p/:cPrimary/:cSecondary/:cTertiary"
          element={<CategoryTertiary />}
        />
        <Route element={<UserRoutes />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/cart/shipment" element={<Checkout />} />
        </Route>
      </Route>

      <Route element={<AuthRoutes />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );

  return routes;
};

export default RouteList;

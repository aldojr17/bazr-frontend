import React from "react";
import { Route, Routes } from "react-router-dom";
import { LayoutRoutes, ProtectedRoutes } from "../pages";
import UnprotectedRoutes from "../pages/UnprotectedRoutes";

const Home = React.lazy(() => import("../pages/Home/Home"));
const Login = React.lazy(() => import("../pages/Auth/Login"));
const Register = React.lazy(() => import("../pages/Auth/Register"));
const NotFound = React.lazy(() => import("../pages/NotFound/NotFound"));
const Search = React.lazy(() => import("../pages/Search/Search"));

const RouteList = () => {
  let routes = (
    <Routes>
      <Route element={<UnprotectedRoutes />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<LayoutRoutes />}>
          <Route path="/" element={<Home />} errorElement={<NotFound />} />
          <Route path="/search" element={<Search />} />
        </Route>
      </Route>
      <Route element={<ProtectedRoutes />}></Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );

  return routes;
};

export default RouteList;

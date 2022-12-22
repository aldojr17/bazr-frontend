import React from "react";
import { Route, Routes } from "react-router-dom";
import { IRouteListProps } from "../interfaces/Routes";
import { ProtectedRoutes } from "../pages";

const Home = React.lazy(() => import("../pages/Home/Home"));
const Login = React.lazy(() => import("../pages/Auth/Login"));
const NotFound = React.lazy(() => import("../pages/NotFound/NotFound"));
const Search = React.lazy(() => import("../pages/Search/Search"));

const RouteList = ({ authenticated }: IRouteListProps) => {
  let routes = (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );

  if (authenticated) {
    routes = (
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />} errorElement={<NotFound />} />
          <Route
            path="/search"
            element={<Search />}
            errorElement={<NotFound />}
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }

  return routes;
};

export default RouteList;

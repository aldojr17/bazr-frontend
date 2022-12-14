import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Layout from "../layout/Layout";

const ProtectedRoutes = () => {
  const isLogged = localStorage.getItem("sessionId");

  if (isLogged !== null) {
    return <Navigate to="/adsada" />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default ProtectedRoutes;

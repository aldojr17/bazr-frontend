import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { ILayoutProps } from "../interfaces/Layout";
import Footer from "./Footer/Footer";

const Layout = ({ children }: ILayoutProps) => {
  return (
    <>
      <Navbar />
      <div className="container">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;

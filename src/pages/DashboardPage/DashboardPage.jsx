import React from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
import css from "./DashboardPage.module.css";
import DocumentTitle from "../../components/DocumentTitle.jsx";
import { Outlet } from "react-router-dom";

const DashboardPage = () => {
  return (
    <div className={css.container}>
      <DocumentTitle>Home Track - Dashboard Page</DocumentTitle>
      <Dashboard />
      <Outlet />
    </div>
  );
};

export default DashboardPage;

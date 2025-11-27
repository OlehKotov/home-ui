import React from "react";
import DocumentTitle from "../../components/DocumentTitle";
import css from "./AdminPage.module.css";
import AdminPanel from "../../components/AdminPanel/AdminPanel";

const AdminPage = () => {
  return (
    <div className={css.container}>
      <DocumentTitle>Home Track - Admin Page</DocumentTitle>
      <AdminPanel />
    </div>
  );
};

export default AdminPage;

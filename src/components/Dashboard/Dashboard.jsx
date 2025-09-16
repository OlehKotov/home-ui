import React from "react";
import LogoutBtn from "../LogoutBtn/LogoutBtn";
import { useSelector } from "react-redux";
import { selectUserName } from "../../redux/selectors";

const Dashboard = () => {
  const userName = useSelector(selectUserName);
  return (
    <div>
      <h2>Welcome, {userName}!</h2>
      <LogoutBtn />
    </div>
  );
};

export default Dashboard;

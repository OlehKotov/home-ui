import React from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/auth/operations";
import { useNavigate } from "react-router-dom";

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleConfirmLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return <button onClick={handleConfirmLogout}>Log Out</button>;
};

export default LogoutBtn;

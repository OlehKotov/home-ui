import React from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/auth/operations";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleConfirmLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      toast.success("Logout successful!");
      navigate("/");
    } catch (error) {
      toast.error(error);
    }
  };

  return <button onClick={handleConfirmLogout}>Log Out</button>;
};

export default LogoutBtn;

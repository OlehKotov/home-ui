// src/components/AdminRoute.jsx
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUserRole } from "../redux/selectors";

const AdminRoute = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const role = useSelector(selectUserRole);

  if (!isLoggedIn) return <Navigate to="/signin" replace />;
  if (role !== "admin") return <Navigate to="/dashboard" replace />;

  return children;
};

export default AdminRoute;



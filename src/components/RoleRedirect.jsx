import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUserRole } from "../redux/selectors";

const RoleRedirect = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const role = useSelector(selectUserRole);

  if (!isLoggedIn) return <Navigate to="/signin" replace />;

  if (role === "admin") return <Navigate to="/admin" replace />;
  if (role === "owner") return <Navigate to="/dashboard" replace />;

  return <Navigate to="/" replace />;
};

export default RoleRedirect;

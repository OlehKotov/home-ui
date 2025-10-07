import { useLocation, Navigate } from "react-router-dom";

const ResetPasswordRoute = ({ children, redirectTo = "/" }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  if (!token) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

export default ResetPasswordRoute;

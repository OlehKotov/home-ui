import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const CompleteProfileRoute = ({ children, redirectTo = "/" }) => {
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const canAccess = user.email && user.id && !isLoggedIn;

  return canAccess ? children : <Navigate to={isLoggedIn ? "/profile" : redirectTo} replace />;
};

export default CompleteProfileRoute;

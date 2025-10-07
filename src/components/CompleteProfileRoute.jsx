import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsDraftUser, selectIsLoggedIn } from "../redux/selectors";

const CompleteProfileRoute = ({ children, redirectTo = "/" }) => {
  const isDraftUser = useSelector(selectIsDraftUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (isLoggedIn) return <Navigate to="/dashboard" replace />;
  return isDraftUser ? children : <Navigate to={redirectTo} replace />;
};

export default CompleteProfileRoute;

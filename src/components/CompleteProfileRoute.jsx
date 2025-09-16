import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsDraftUser, selectIsLoggedIn, selectUserEmail, selectUserId } from "../redux/selectors";

const CompleteProfileRoute = ({ children, redirectTo = "/" }) => {
  const userEmail = useSelector(selectUserEmail);
  const userId = useSelector(selectUserId);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isDraftUser = useSelector(selectIsDraftUser);

  const canAccess = isDraftUser && userEmail && userId;

  return canAccess
    ? children
    : <Navigate to={isLoggedIn ? "/dashboard" : redirectTo} replace />;
};

export default CompleteProfileRoute;
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsDraftUser, selectIsLoggedIn } from "../redux/selectors";

const RestrictedRoute = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isDraftUser = useSelector(selectIsDraftUser);
  // return isLoggedIn 
  //   ? <Navigate to="/dashboard" replace />
  //   : isDraftUser 
  //     ? <Navigate to="/complete-profile" replace />
  //     : children;

  if (isLoggedIn) return <Navigate to="/dashboard" replace />;
  if (isDraftUser) return <Navigate to="/complete-profile" replace />;
  return children;
};

export default RestrictedRoute;

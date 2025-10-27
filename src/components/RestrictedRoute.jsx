import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsDraftUser } from "../redux/selectors";

const RestrictedRoute = ({ children }) => {
  const isDraftUser = useSelector(selectIsDraftUser);

  if (isDraftUser) return <Navigate to="/complete-profile" replace />;
  return children;
};

export default RestrictedRoute;

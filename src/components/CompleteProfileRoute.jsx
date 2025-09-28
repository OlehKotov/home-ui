import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectDraftEmail, selectIsDraftUser, selectIsLoggedIn, selectUserEmail, selectUserId } from "../redux/selectors";

// const CompleteProfileRoute = ({ children, redirectTo = "/" }) => {
//   const userEmail = useSelector(selectUserEmail);
//   const userId = useSelector(selectUserId);
//   const isLoggedIn = useSelector(selectIsLoggedIn);
//   const isDraftUser = useSelector(selectIsDraftUser);

//   const canAccess = isDraftUser && userEmail && userId;

//   return canAccess
//     ? children
//     : <Navigate to={isLoggedIn ? "/dashboard" : redirectTo} replace />;
// };

// const CompleteProfileRoute = ({ children, redirectTo = "/" }) => {
//   const isDraftUser = useSelector(selectIsDraftUser);
//   const draftEmail = useSelector(selectDraftEmail);
//   const isLoggedIn = useSelector(selectIsLoggedIn);

//   const canAccess = Boolean(isDraftUser && draftEmail);

//   if (isLoggedIn) return <Navigate to="/dashboard" replace />;
//   return canAccess ? children : <Navigate to={redirectTo} replace />;
// };

const CompleteProfileRoute = ({ children, redirectTo = "/" }) => {
  const isDraftUser = useSelector(selectIsDraftUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);


  if (isLoggedIn) return <Navigate to="/dashboard" replace />;
  return isDraftUser ? children : <Navigate to={redirectTo} replace />;
};

export default CompleteProfileRoute;
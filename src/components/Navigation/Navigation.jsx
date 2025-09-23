import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";

const Navigation = () => {
  const getClass = (isSignup) => ({ isActive }) =>
    isSignup
      ? `${css.navButtonSignup} ${isActive ? css.active : ""}`
      : `${css.navButtonSignin} ${isActive ? css.active : ""}`;

  return (
    <div className={css.navContainer}>
      <nav className={css.navList}>
        <NavLink to="/signup" className={getClass(true)}>
          Try Tracker
        </NavLink>
        <NavLink to="/signin" className={getClass(false)}>
          Sign In
        </NavLink>
      </nav>
    </div>
  );
};

export default Navigation;

import React from "react";
import css from "./HeaderDashboard.module.css";
import { useSelector } from "react-redux";
import { selectUserName } from "../../redux/selectors";
import sprite from "../../assets/icons/sprite.svg";

const HeaderDashboard = ({ onClick }) => {
  const userName = useSelector(selectUserName);
  return (
    <div className={css.header}>
      <h2 className={css.welcomeHeader}>Welcome, {userName}!</h2>
      <button
        type="button"
        aria-expanded="false"
        aria-controls="sidebar-menu"
        onClick={onClick}
      >
        <svg className={css.burgerMenuIcon} width="30px" height="30px">
          <use xlinkHref={`${sprite}#icon-burger-menu`} />
        </svg>
      </button>
    </div>
  );
};

export default HeaderDashboard;

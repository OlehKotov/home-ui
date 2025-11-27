import React from "react";
import css from "./AdminHeader.module.css";
import { useSelector } from "react-redux";
import { selectUserName } from "../../redux/selectors";
import sprite from "../../assets/icons/sprite.svg";
import Menu from "../Menu/Menu";
import LogoutBtn from "../LogoutBtn/LogoutBtn";

const AdminHeader = ({ onClick }) => {
  const userName = useSelector(selectUserName);

  return (
    <header className={css.header}>
      <h2 className={css.welcomeHeader}>Welcome, {userName}!</h2>
      <button
        type="button"
        aria-expanded="false"
        aria-controls="sidebar-menu"
        onClick={onClick}
        className={css.headerBtn}
      >
        <svg className={css.burgerMenuIcon} width="30px" height="30px">
          <use xlinkHref={`${sprite}#icon-burger-menu`} />
        </svg>
      </button>
      <div className={css.logout}>
        <LogoutBtn />
      </div>
    </header>
  );
};

export default AdminHeader;

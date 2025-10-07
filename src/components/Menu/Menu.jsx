import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import css from "./Menu.module.css";
import sprite from "../../assets/icons/sprite.svg";
import LogoutBtn from "../LogoutBtn/LogoutBtn";

const Menu = ({ isOpen, onClose }) => {
  const menuRef = useRef(null);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

 
  const handleLinkClick = () => {
    onClose();
  };

  return (
    <aside
      ref={menuRef}
      className={`${css.sidebar} ${isOpen ? css.open : ""}`}
      id="sidebar-menu"
    >
      <button
        className={css.menuBtn}
        type="button"
        aria-label="Close menu"
        onClick={onClose}
      >
        <svg className={css.burgerMenuIcon} width="30px" height="30px">
          <use xlinkHref={`${sprite}#icon-close`} />
        </svg>
      </button>

      <nav className={css.menu}>
        <ul className={css.menuList}>
          <li className={css.menuItem}>
            <NavLink
              to="/dashboard"
              onClick={handleLinkClick}
              className={({ isActive }) =>
                `${css.menuLink} ${isActive ? css.current : ""}`
              }
            >
              Overview
            </NavLink>
          </li>

          <li className={css.menuItem}>
            <NavLink
              to="/dashboard/readings"
              onClick={handleLinkClick}
              className={({ isActive }) =>
                `${css.menuLink} ${isActive ? css.current : ""}`
              }
            >
              Readings
            </NavLink>
          </li>

          <li className={css.menuItem}>
            <a className={css.menuLink} href="#" onClick={handleLinkClick}>
              Deals
            </a>
          </li>
        </ul>

        <LogoutBtn />
      </nav>
    </aside>
  );
};

export default Menu;



import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import css from "./AdminMenu.module.css";
import sprite from "../../assets/icons/sprite.svg";
import LogoutBtn from "../LogoutBtn/LogoutBtn";
import { useSelector } from "react-redux";

import { selectApartments } from "../../redux/selectors";

const AdminMenu = ({ isOpen, onClose }) => {
  const apartments = useSelector(selectApartments);
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
          {apartments.map((apartment) => (
            <li key={apartment._id} className={css.menuItem}>
              <NavLink
                to={`/admin/flat/${apartment._id}`}
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  `${css.menuLink} ${isActive ? css.current : ""}`
                }
              >
                Apartment {apartment.apartmentNumber}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className={css.logout}>
          <LogoutBtn />
        </div>
      </nav>
    </aside>
  );
};

export default AdminMenu;

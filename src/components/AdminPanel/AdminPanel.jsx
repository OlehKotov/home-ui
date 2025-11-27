import React, { useEffect, useState } from "react";
import css from "./AdminPanel.module.css";
import AdminMenu from "../AdminMenu/AdminMenu";
import AdminHeader from "../AdminHeader/AdminHeader";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchApartment } from "../../redux/apartment/operations";

const AdminPanel = () => {
   const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

   useEffect(() => {
    dispatch(fetchApartment());
  }, [dispatch]);

  return (
    <div className={css.backdrop}>
      <AdminHeader onClick={toggleMenu} />
      {/* <AdminMenu isOpen={isMenuOpen} onClose={closeMenu} /> */}
      <div className={css.layout}>
        <AdminMenu isOpen={isMenuOpen} onClose={closeMenu} />

        <main className={css.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
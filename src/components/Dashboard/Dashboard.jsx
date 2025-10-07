import React, { useState } from "react";
import css from "./Dashboard.module.css";
import Menu from "../Menu/Menu";
import HeaderDashboard from "../HeaderDashbord/HeaderDashboard";

const Dashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className={css.backdrop}>
      <HeaderDashboard onClick={toggleMenu} />
      <Menu isOpen={isMenuOpen} onClose={closeMenu} />
    </div>
  );
};

export default Dashboard;

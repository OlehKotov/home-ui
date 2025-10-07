import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/auth/operations";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import sprite from "../../assets/icons/sprite.svg";
import css from "./LogoutBtn.module.css";
import ModalBackdrop from "../../shared/components/ModalBackdrop/ModalBackdrop";
import ConfirmModal from "../../shared/components/ConfirmModal/ConfirmModal";

const LogoutBtn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCancelClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      toast.success("Logout successful!");
      navigate("/");
    } catch (error) {
      toast.error(error);
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <button onClick={handleCancelClick}>
        <svg className={css.burgerMenuIcon} width="32px" height="32px">
          <use xlinkHref={`${sprite}#icon-log-out`} />
        </svg>
      </button>

      <ModalBackdrop
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        closeTimeoutMS={300}
      >
        <ConfirmModal
          title="Are you sure?"
          text="Do you really want to log out?"
          onConfirm={handleConfirmLogout}
          onCancel={handleCloseModal}
        />
      </ModalBackdrop>
    </>
  );
};

export default LogoutBtn;

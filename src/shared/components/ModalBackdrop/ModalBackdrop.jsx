import React from "react";
import Modal from "react-modal";
import css from "./ModalBackdrop.module.css";

Modal.setAppElement("#root");

const ModalBackdrop = ({ isOpen, onRequestClose, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={css.modalContainer}
      overlayClassName={css.modalOverlay}
      contentLabel="Example Modal"
    >
      {children}
    </Modal>
  );
};

export default ModalBackdrop;

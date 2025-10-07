import React from "react";
import css from "./ConfirmModal.module.css";

const ConfirmModal = ({ title, text, onConfirm, onCancel }) => {
  return (
    <div className={css.wrapper}>
      {title && <h3 className={css.title}>{title}</h3>}
      {text && <p className={css.text}>{text}</p>}
      <div className={css.buttons}>
        <button className={css.confirmBtn} onClick={onConfirm}>
          Yes
        </button>
        <button className={css.cancelBtn} onClick={onCancel}>
          No
        </button>
      </div>
    </div>
  );
};

export default ConfirmModal;

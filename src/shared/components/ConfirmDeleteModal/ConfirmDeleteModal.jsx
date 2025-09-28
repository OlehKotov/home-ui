import React from 'react'
import css from "./ConfirmDeleteModal.module.css";

const ConfirmDeleteModal = ({ onConfirm, onCancel }) => {
  return (
     <div className={css.wrapper}>
      <h3 className={css.title}>Are you sure?</h3>
      <p className={css.text}>Do you really want to cancel your account?</p>
      <div className={css.buttons}>
        <button className={css.confirmBtn} onClick={onConfirm}>
          Yes
        </button>
        <button className={css.cancelBtn} onClick={onCancel}>
          No
        </button>
      </div>
    </div>
  )
}

export default ConfirmDeleteModal
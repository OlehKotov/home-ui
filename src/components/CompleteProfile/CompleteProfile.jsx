import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import css from "./CompleteProfile.module.css";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/auth/operations";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { selectDraftEmail, selectDraftPassword } from "../../redux/selectors";
import ModalBackdrop from "../../shared/components/ModalBackdrop/ModalBackdrop";
import ConfirmDeleteModal from "../../shared/components/ConfirmDeleteModal/ConfirmDeleteModal";
import { clearDraftUser } from "../../redux/auth/slice";

const CompleteProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const email = useSelector(selectDraftEmail);
  const password = useSelector(selectDraftPassword);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(
        /^[A-Za-zА-Яа-яЁё\s'-]+$/,
        "Name can contain only letters, spaces, hyphens or apostrophes"
      )
      .min(2, "Name must be at least 2 characters")
      .max(30, "The name must be no more than 30 characters.")
      .required("Name is required"),

    phone: Yup.string()
      .matches(/^\+380\d{9}$/, "Phone must be in format +380XXXXXXXXX")
      .required("Phone is required"),

    apartmentNumber: Yup.number()
      .transform((value, originalValue) =>
        String(originalValue).trim() === "" ? null : value
      )
      .typeError("Apartment number must be a number")
      .required("Apartment number is required")
      .max(120, "Apartment number must be no more than 3 digits"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  // const onSubmit = async (data) => {
  //   try {
  //     await dispatch(
  //       registerUser({
  //         name: data.name,
  //         phone: data.phone,
  //         apartmentNumber: data.apartmentNumber,
  //       })
  //     ).unwrap();

  //     toast.success("Profile completed!", {
  //       duration: 4000,
  //       position: "top-center",
  //     });
  //     reset();
  //     navigate("/dashboard");
  //   } catch (error) {
  //     toast.error(error.message || "Registration failed", {
  //       duration: 4000,
  //       position: "top-center",
  //     });
  //   }
  // };

  const onSubmit = async (data) => {
    try {
      await dispatch(registerUser({ email, password, ...data })).unwrap();

      toast.success("Profile completed!");
      reset();
      navigate("/dashboard");
    } catch (error) {
      toast.error(error);
    }
  };

  const handleCancelClick = () => {
    setIsModalOpen(true);
  };

  const handleCancelUser = () => {
    dispatch(clearDraftUser());
    setIsModalOpen(false);
    toast.success("Profile completion canceled");
    navigate("/signin");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // const handleCancelUser = async () => {
  //   try {
  //     if (!userId) {
  //       toast.error("User ID not found");
  //       return;
  //     }
  //     await dispatch(deleteUserAndLogout(userId)).unwrap();

  //     toast.success("Your account was canceled and deleted successfully", {
  //       position: "top-center",
  //     });
  //     navigate("/");
  //   } catch (error) {
  //     console.error("Error cancelling account:", error);
  //   }
  // };

  return (
    <div className={css.container}>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <h2 className={css.header}>Complete Profile</h2>

        <div className={css.formGroup}>
          <label className={css.label}>Name:</label>
          <div className={css.inputWrapper}>
            <input
              className={`${css.input} ${errors.name ? css.error : ""}`}
              type="text"
              name="name"
              placeholder="Enter your name"
              {...register("name")}
            />
          </div>
          {errors.name && (
            <p className={css.errorMessage}>{errors.name.message}</p>
          )}
        </div>

        <div className={css.formGroupPassword}>
          <label className={css.label}>Phone:</label>
          <div className={css.inputWrapper}>
            <input
              className={`${css.input} ${errors.phone ? css.error : ""}`}
              type="text"
              name="phone"
              placeholder="Enter your phone"
              {...register("phone")}
            />
          </div>
          {errors.phone && (
            <p className={css.errorMessage}>{errors.phone.message}</p>
          )}
        </div>

        <div className={css.formGroupPassword}>
          <label className={css.label}>Apartment Number:</label>
          <div className={css.inputWrapper}>
            <input
              className={`${css.input} ${
                errors.apartmentNumber ? css.error : ""
              }`}
              type="number"
              name="apartmentNumber"
              placeholder="Enter your apartment number"
              {...register("apartmentNumber")}
            />
          </div>
          {errors.apartmentNumber && (
            <p className={css.errorMessage}>{errors.apartmentNumber.message}</p>
          )}
        </div>
        <div className={css.buttonWrapper}>
          <button className={css.submitButton} type="submit">
            Complete Profile
          </button>
        </div>
      </form>
      <div className={css.textWrapper}>
        Don’t want to complete profile?
        <NavLink className={css.link} onClick={handleCancelClick}>
          Cancel
        </NavLink>
      </div>
      <ModalBackdrop
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        closeTimeoutMS={300}
      >
        <ConfirmDeleteModal
          onConfirm={handleCancelUser}
          onCancel={handleCloseModal}
        />
      </ModalBackdrop>
    </div>
  );
};

export default CompleteProfile;

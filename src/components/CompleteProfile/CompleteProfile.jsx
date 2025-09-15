import React from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import css from "./CompleteProfile.module.css";
import { useDispatch } from "react-redux";
import { completeProfile } from "../../redux/auth/operations";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";

const CompleteProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const validationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[A-Za-zА-Яа-яЁё\s'-]+$/, 'Name can contain only letters, spaces, hyphens or apostrophes')
    .min(3, 'Name must be at least 2 characters')
    .max(30, 'The name must be no more than 30 characters.')
    .required('Name is required'),

  phone: Yup.string()
    .matches(/^\+380\d{9}$/, 'Phone must be in format +380XXXXXXXXX')
    .required('Phone is required'),

  apartmentNumber: Yup.number()
    .required('Apartment number is required'),
});

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    try {
      await dispatch(
        completeProfile({ name: data.name, phone: data.phone, apartmentNumber: data.apartmentNumber })
      ).unwrap();

      toast.success("Profile completed!", {
        duration: 4000,
        position: "top-center",
      });
      reset();
      navigate("/profile");
    } catch (error) {
      toast.error(error.message || "Registration failed", {
        duration: 4000,
        position: "top-center",
      });
    }
  };

  return (
    <div className={css.container}>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <h2 className={css.header}>Complete Profile</h2>

        <div className={css.formGroup}>
          <label className={css.label}>Name:</label>
          <div className={css.inputWrapper}>
            <input
              className={`${css.input} ${errors.email ? css.error : ""}`}
              type="text"
              name="name"
              placeholder="Enter your name"
              {...register("name")}
            />
          </div>
          {errors.email && (
            <p className={css.errorMessage}>{errors.email.message}</p>
          )}
        </div>

        <div className={css.formGroupPassword}>
          <label className={css.label}>Phone:</label>
          <div className={css.inputWrapper}>
            <input
              className={`${css.input} ${errors.password ? css.error : ""}`}
              type="text"
              name="phone"
              placeholder="Enter your phone"
              {...register("phone")}
            />
          </div>
          {errors.password && (
            <p className={css.errorMessage}>{errors.password.message}</p>
          )}
        </div>

        <div className={css.formGroupPassword}>
          <label className={css.label}>Apartment Number:</label>
          <div className={css.inputWrapper}>
            <input
              className={`${css.input} ${errors.password ? css.error : ""}`}
              type="number"
              name="apartmentNumber"
              placeholder="Enter your apartment number"
              {...register("apartmentNumber")}
            />
          </div>
          {errors.password && (
            <p className={css.errorMessage}>{errors.password.message}</p>
          )}
        </div>
        <div className={css.buttonWrapper}>
          <button className={css.submitButton} type="submit">
            Complete Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompleteProfile;

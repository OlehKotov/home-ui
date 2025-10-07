import { useForm } from "react-hook-form";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import css from "./ResetPassword.module.css";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import sprite from "../../assets/icons/sprite.svg";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../redux/auth/operations";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleRepeatPasswordVisibility = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
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
    if (!token) {
      toast.error("Invalid or expired reset link");
      return;
    }

    try {
      await dispatch(
        resetPassword({ token, password: data.password })
      ).unwrap();
      toast.success("Password successfully reset!");
      reset();
      navigate("/signin");
    } catch (error) {
      toast.error(
        typeof error === "string"
          ? error
          : error?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className={css.container}>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <h2 className={css.header}>Change the password</h2>

        <div className={css.formGroupPassword}>
          <label className={css.label}>Password:</label>
          <div className={css.inputWrapper}>
            <input
              className={`${css.input} ${errors.password ? css.error : ""}`}
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              {...register("password")}
            />
            <svg
              className={css.passwordToggleIcon}
              onClick={togglePasswordVisibility}
              width="20px"
              height="20px"
            >
              <use
                xlinkHref={`${sprite}#${showPassword ? "eye" : "eye-off"}`}
              />
            </svg>
          </div>
          {errors.password && (
            <p className={css.errorMessage}>{errors.password.message}</p>
          )}
        </div>

        <div className={css.formGroupPassword}>
          <label className={css.label}>Confirm Password:</label>
          <div className={css.inputWrapper}>
            <input
              className={`${css.input} ${
                errors.confirmPassword ? css.error : ""
              }`}
              type={showRepeatPassword ? "text" : "password"}
              placeholder="Confirm new password"
              {...register("confirmPassword")}
            />
            <svg
              className={css.passwordToggleIcon}
              onClick={toggleRepeatPasswordVisibility}
              width="20px"
              height="20px"
            >
              <use
                xlinkHref={`${sprite}#${
                  showRepeatPassword ? "eye" : "eye-off"
                }`}
              />
            </svg>
          </div>
          {errors.confirmPassword && (
            <p className={css.errorMessage}>{errors.confirmPassword.message}</p>
          )}
        </div>

        <div className={css.buttonWrapper}>
          <button className={css.submitButton} type="submit">
            Reset Password
          </button>
        </div>
      </form>

      <div className={css.actions}>
        <div className={css.linkItem}>
          <span>Back to </span>
          <NavLink className={css.link} to="/signin">
            Sign In
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

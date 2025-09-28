import { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import css from "./SignInForm.module.css";
import sprite from "../../assets/icons/sprite.svg";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/auth/operations";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import GoogleAuth from "../GoogleAuth/GoogleAuth";

const SignInForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .matches(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
        "Invalid email format"
      )
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
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
        loginUser({ email: data.email, password: data.password })
      ).unwrap();

      toast.success("Login successful!");

      reset();
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message || "Login failed", {
        duration: 4000,
        position: "top-center",
      });
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={css.container}>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <h2 className={css.header}>Sign In</h2>

        <div className={css.formGroup}>
          <label className={css.label}>Email:</label>
          <div className={css.inputWrapper}>
            <input
              className={`${css.input} ${errors.email ? css.error : ""}`}
              type="text"
              name="email"
              placeholder="Enter your email"
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p className={css.errorMessage}>{errors.email.message}</p>
          )}
        </div>

        <div className={css.formGroupPassword}>
          <label className={css.label}>Password:</label>
          <div className={css.inputWrapper}>
            <input
              className={`${css.input} ${errors.password ? css.error : ""}`}
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
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

        <div className={css.buttonWrapper}>
          <button className={css.submitButton} type="submit">
            Sign In
          </button>
          <GoogleAuth/>
        </div>
      </form>
      
      <div className={css.textWrapper}>
        Don’t have an account?
        <NavLink className={css.link} to="/signup">
          Sign Up
        </NavLink>
      </div>
    </div>
  );
};

export default SignInForm;

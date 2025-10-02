import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import css from "./RequestResetEmail.module.css";
import { useDispatch } from "react-redux";
import { requestResetEmail } from "../../redux/auth/operations";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";

const RequestResetEmail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
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
    console.log(data);
    
    try {
      dispatch(requestResetEmail({ email: data.email })).unwrap();
      toast.success("Check your email for reset instructions!");
      reset();
      navigate("/");
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
        <h2 className={css.header}>Enter your Email</h2>
        <div className={css.formGroup}>
          <label className={css.label}>Email:</label>
          <div className={css.inputWrapper}>
            <input
              className={`${css.input} ${errors.email ? css.error : ""}`}
              type="text"
              {...register("email")}
              placeholder="Enter your email"
              aria-invalid={errors.email ? "true" : "false"}
              autoFocus
            />
          </div>
          {errors.email && (
            <p className={css.errorMessage}>{errors.email.message}</p>
          )}
        </div>

        <div className={css.buttonWrapper}>
          <button className={css.submitButton} type="submit">
            Send
          </button>
        </div>
      </form>

      <div className={css.linkWrapper}>
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

export default RequestResetEmail;

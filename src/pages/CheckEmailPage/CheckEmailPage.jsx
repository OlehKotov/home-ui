import css from "./CheckEmailPage.module.css";
import Logo from "../../components/Logo/Logo";
import DocumentTitle from "../../components/DocumentTitle";
import PictureSection from "../../components/PictureSection/PictureSection";
import { NavLink } from "react-router-dom";

const CheckEmailPage = () => {
  return (
    <div className={css.container}>
      <DocumentTitle>Home Track - Check Email Page</DocumentTitle>
      <div className={css.backdrop}>
        <Logo />
        <h2 className={css.header}>Check your Email</h2>
        <p className={css.message}>
          We’ve sent you a password reset link. Please check your inbox and
          follow the instructions to reset your password.
        </p>
        <div className={css.actions}>
          <div className={css.linkItem}>
            <span>Back to </span>
            <NavLink className={css.link} to="/signin">
              Sign In
            </NavLink>
          </div>
        </div>
      </div>
      <PictureSection />
    </div>
  );
};

export default CheckEmailPage;

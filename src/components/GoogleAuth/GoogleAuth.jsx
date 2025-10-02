import css from "./GoogleAuth.module.css";
import sprite from "../../assets/icons/sprite.svg";
import { useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUserGoogle } from "../../redux/auth/operations";
import { selectIsLoading, selectIsLoggedIn } from "../../redux/selectors";


const GoogleAuth = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isLoading = useSelector(selectIsLoading);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (!code || isLoggedIn || sessionStorage.getItem("googleAuthDone")) return;

    sessionStorage.setItem("googleAuthDone", "true");
    dispatch(loginUserGoogle(code))
      .unwrap()
      .then(() => {
        window.history.replaceState({}, document.title, "/dashboard");
        toast.success("Login successful!");
        navigate("/dashboard", { replace: true });
      })
      .catch((error) => toast.error(error));
  }, [dispatch, navigate, isLoggedIn]);

  const handleGoogleAuth = async () => {
    try {
      const response = await axios.get(
        "https://home-mongodb-1.onrender.com/auth/get-oauth-url",
        { withCredentials: true }
      );
      const url = response.data?.data?.url;
      if (url) {
        window.location.href = url;
      } else {
        toast.error("OAuth URL not found");
      }
    } catch (error) {
      toast.error(`Google auth failed: ${error.message}`
      )
    }
  };

  if (isLoading || isLoggedIn) {
    return null; 
  }

  return (
    <button type="button" className={css.linkGoogle} onClick={handleGoogleAuth}>
      <svg width="20px" height="20px">
        <use xlinkHref={`${sprite}#icon-icons8-google-48`} />
      </svg>
    </button>
  );
};

export default GoogleAuth;

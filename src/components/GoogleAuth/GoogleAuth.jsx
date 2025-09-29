import css from "./GoogleAuth.module.css";
import sprite from "../../assets/icons/sprite.svg";
import { useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUserGoogle } from "../../redux/auth/operations";
import { selectIsLoggedIn } from "../../redux/selectors";

// const GoogleAuth = ({ linkText }) => {
//   const [googleAuthUrl, setGoogleAuthUrl] = useState("");
//   const isLoggedIn = useSelector(selectIsLoggedIn);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchGoogleAuthUrl = async () => {
//       try {
//         const response = await axios.get(
//           "https://home-mongodb-1.onrender.com/auth/get-oauth-url"
//         );
//         const { data } = response;
//         if (response.status === 200) {
//           setGoogleAuthUrl(data.data.url);
//         } else {
//           toast.error(`Failed to get Google OAuth URL: ${data.message}`, {
//             duration: 4000,
//             position: "top-center",
//             style: {
//               textAlign: "center",
//               boxShadow: "8px 11px 27px -8px rgba(66, 68, 90, 1)",
//             },
//           });
//         }
//       } catch (error) {
//         toast.error(`Error fetching Google OAuth URL: ${error.message}`, {
//           duration: 4000,
//           position: "top-center",
//           style: {
//             textAlign: "center",
//             boxShadow: "8px 11px 27px -8px rgba(66, 68, 90, 1)",
//           },
//         });
//       }
//     };

//     fetchGoogleAuthUrl();
//   }, []);

//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const code = urlParams.get("code");

//     if (!code || isLoggedIn || sessionStorage.getItem("googleAuthDone")) return;

//     sessionStorage.setItem("googleAuthDone", "true");
//     dispatch(loginUserGoogle(code))
//       .unwrap()
//       .then(() => navigate("/dashboard", { replace: true }))
//       .catch((err) => console.error(err));
//   }, [dispatch, navigate, isLoggedIn]);

//   if (isLoggedIn) {
//     return null;
//   }

//   return (
//     <a className={css.linkGoogle} href={googleAuthUrl}>
//       <svg width="20px" height="20px">
//         <use xlinkHref={`${sprite}#icon-icons8-google-48`} />
//       </svg>
//       {linkText}
//     </a>
//   );
// };

const GoogleAuth = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
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

  return (
    <button type="button" className={css.linkGoogle} onClick={handleGoogleAuth}>
      <svg width="20px" height="20px">
        <use xlinkHref={`${sprite}#icon-icons8-google-48`} />
      </svg>
    </button>
  );
};

export default GoogleAuth;

import { HashLoader } from "react-spinners";
import css from "./LoaderOverlay.module.css";

const LoaderOverlay = () => {
  return (
    <div className={css.overlay}>
      <HashLoader color="#c95f03" />
    </div>
  );
};

export default LoaderOverlay;
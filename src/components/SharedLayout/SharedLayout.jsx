import { Suspense } from "react";
import css from "./SharedLayout.module.css";
import LoaderOverlay from "../../shared/components/LoaderOverlay/LoaderOverlay";

const SharedLayout = ({ children }) => {
  return (
    <div className={css.sharedContainer}>
      <Suspense fallback={<LoaderOverlay />}>{children}</Suspense>
    </div>
  );
};

export default SharedLayout;

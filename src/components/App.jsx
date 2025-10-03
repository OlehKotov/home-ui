import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "../pages/Homepage/HomePage";
import { HelmetProvider } from "@dr.pogodin/react-helmet";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import { Toaster } from "react-hot-toast";
import RestrictedRoute from "./RestrictedRoute";
import PrivateRoute from "./PrivateRoute";
import CompleteProfilePage from "../pages/CompleteProfilePage/CompleteProfilePage";
import CompleteProfileRoute from "./CompleteProfileRoute";
import SignInPage from "../pages/SignInPage/SignInPage";
import DashboardPage from "../pages/DashboardPage/DashboardPage";
import { useSelector } from "react-redux";
import { selectIsLoading } from "../redux/selectors";
import SharedLayout from "./SharedLayout/SharedLayout";
import LoaderOverlay from "../shared/components/LoaderOverlay/LoaderOverlay";
import GoogleAuth from "./GoogleAuth/GoogleAuth";
import RequestResetEmailPage from "../pages/RequestResetEmailPage/RequestResetEmailPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";

function App() {
  const isLoading = useSelector(selectIsLoading);

  return (
    <>
      <SharedLayout>
        <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
        <HelmetProvider>
          <Routes>
            <Route
              path="/"
              element={
                <RestrictedRoute>
                  <HomePage />
                </RestrictedRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <RestrictedRoute>
                  <SignUpPage />
                </RestrictedRoute>
              }
            />
            <Route
              path="/complete-profile"
              element={
                <CompleteProfileRoute>
                  <CompleteProfilePage />
                </CompleteProfileRoute>
              }
            />
            <Route
              path="/signin"
              element={
                <RestrictedRoute>
                  <SignInPage />
                </RestrictedRoute>
              }
            />
            <Route path="/confirm-google-auth" element={<GoogleAuth />} />
            <Route
              path="/request-reset-email"
              element={
                <RestrictedRoute>
                  <RequestResetEmailPage />
                </RestrictedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <DashboardPage />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </HelmetProvider>
      </SharedLayout>

      {isLoading && <LoaderOverlay />}
    </>
  );
}

export default App;

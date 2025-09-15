
import { Route, Routes } from 'react-router-dom';
import './App.css'
import HomePage from '../pages/Homepage/HomePage';
import { HelmetProvider } from '@dr.pogodin/react-helmet';
import NotFound from './NotFound/NotFound';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import { Toaster } from 'react-hot-toast';
import RestrictedRoute from './RestrictedRoute';
import PrivateRoute from './PrivateRoute';
import CompleteProfilePage from '../pages/CompleteProfilePage/CompleteProfilePage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import CompleteProfileRoute from './CompleteProfileRoute';

function App() {


  return (
    <div>
      <HelmetProvider>
        <Routes>
        <Route path="/" element={<RestrictedRoute><HomePage /></RestrictedRoute>} />
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
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </HelmetProvider>
      
       <Toaster 
        position="top-center" 
        toastOptions={{ duration: 4000 }} 
      />
    </div>
  );
}

export default App


import { Route, Routes } from 'react-router-dom';
import './App.css'
import HomePage from '../pages/Homepage/HomePage';
import { HelmetProvider } from '@dr.pogodin/react-helmet';
import NotFound from './NotFound/NotFound';
import RestrictedRoute from './RestrictedRoute/RestrictedRoute';
import SignUpPage from '../pages/SignUpPage/SignUpPage';

function App() {


  return (
    <div>
      <HelmetProvider>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/signup"
          element={
            <RestrictedRoute>
              <SignUpPage />
            </RestrictedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </HelmetProvider>
      
    </div>
  );
}

export default App

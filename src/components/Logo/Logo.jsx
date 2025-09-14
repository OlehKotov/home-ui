import { Link } from 'react-router-dom';
import css from './Logo.module.css';

const Logo = () => {
  return (
    <div>
       <Link
        // data-tour="welcome-step"
        className={css.logo}
        to="/"
      >
        HomeTrack
      </Link>
    </div>
  );
};

export default Logo;
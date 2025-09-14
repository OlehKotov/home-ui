
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import css from './WelcomeSection.module.css';

const WelcomeSection = () => {
  return (
    <div className={css.backdrop}>
     <Logo />

      <h1 className={css.welcomeHeader} data-tour="welcome">
        Welcome to home tracker
      </h1>

      <Navigation />
    </div>
  );
};

export default WelcomeSection;
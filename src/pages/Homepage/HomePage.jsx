
import DocumentTitle from '../../components/DocumentTitle.jsx';
import PictureSection from '../../components/PictureSection/PictureSection.jsx';
import WelcomeSection from '../../components/WelcomeSection/WelcomeSection.jsx';
import css from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={css.container}>
      <DocumentTitle>Home Track - Home Page</DocumentTitle>
     <WelcomeSection />
     <PictureSection />
    </div>
  );
};

export default HomePage;
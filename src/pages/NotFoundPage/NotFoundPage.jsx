import css from "./NotFoundPage.module.css";
import Logo from '../../components/Logo/Logo';
import DocumentTitle from '../../components/DocumentTitle';
import PictureSection from '../../components/PictureSection/PictureSection';

const NotFoundPage = () => {
  return (
    <div className={css.container}>
      <DocumentTitle>Home Track - Not Found Page</DocumentTitle>
      <div className={css.backdrop}>
        <Logo />
        <h2 className={css.header}>Page not found.</h2>
      </div>
      <PictureSection />
    </div>
  );
};

export default NotFoundPage;

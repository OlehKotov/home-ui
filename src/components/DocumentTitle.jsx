import { Helmet } from '@dr.pogodin/react-helmet';

const DocumentTitle = ({ children }) => {
  return (
    <Helmet>
      <title>{children}</title>
    </Helmet>
  );
};

export default DocumentTitle;
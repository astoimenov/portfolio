import React from 'react';
import Helmet from 'react-helmet';
import { injectGlobal, ThemeProvider } from 'styled-components';

import SEO from '../components/SEO';
import Footer from '../components/Footer';
import favicon from './camera.ico';
import config from '../../config/site';
import theme from '../../config/theme';

/* eslint no-unused-expressions: off */
injectGlobal`
  body {
    background: ${theme.colors.bg};
    color: ${theme.colors.color};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    color: ${theme.colors.link};
    transition: color .5s;
    text-decoration: none;
  }

  a:hover {
    text-decoration: none;
    color: ${theme.colors.linkHover};
  }

  .gatsby-resp-image-wrapper {
    margin: 2.75rem 0;
  }
`;

const TemplateWrapper = ({ children }) => (
  <ThemeProvider theme={theme}>
    <React.Fragment>
      <Helmet
        title={config.siteTitleAlt}
        meta={[
          {
            name: 'description',
            content: 'AStoimenov personal portfolio',
          },
          {
            name: 'keywords',
            content: 'portfolio, developer, photographer, photography',
          },
        ]}
      >
        <link rel="shortcut icon" type="image/png" href={favicon} />
      </Helmet>
      <SEO />
      {children()}
      <Footer />
    </React.Fragment>
  </ThemeProvider>
);

export default TemplateWrapper;

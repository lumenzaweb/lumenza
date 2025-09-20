import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description }) => {
  const siteName = "LUMENZA"; // Your brand name
  const fullTitle = `${title} | ${siteName}`;

  return (
    <Helmet>
      {/* Standard SEO Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph / Facebook Tags for social sharing */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
    </Helmet>
  );
};

export default SEO;
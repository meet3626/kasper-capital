import React from 'react';
import { Helmet } from 'react-helmet';

const SEOHead = ({ 
  title = "KAPSERFX | Expert Forex Broker Solutions", 
  description = "Turnkey Forex Brokerage solutions, trading platforms, licensing, CRM, and digital marketing strategies by KAPSERFX IT SOLUTIONS EST.", 
  keywords = "Forex Broker, Turnkey Solutions, MT5, cTrader, Forex Licensing, Crypto Broker, Trading Platform",
  image = "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&auto=format&fit=crop&q=80",
  url = "https://kapserfx.com",
  type = "website"
}) => {
  return (
    <Helmet>
      {/* Standard SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook / LinkedIn */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEOHead;

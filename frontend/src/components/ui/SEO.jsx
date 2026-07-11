import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, image, url }) => {
  const siteTitle = 'VG PHOTOSTUDIO';
  const fullTitle = title ? `${title} | ${siteTitle}` : `${siteTitle} | Premium Photography`;
  const desc = description || 'Premium photography for weddings, portraits, fashion, and commercial brands. Book your session with VG PHOTOSTUDIO.';
  const ogImage = image || '/og-image.jpg';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
      {url && <meta property="og:url" content={url} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <link rel="canonical" href={url || window.location.href} />
    </Helmet>
  );
};

export default SEO;

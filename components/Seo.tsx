import Head from 'next/head';

interface SeoProps {
  title: string;
  description: string;
  path?: string;
}

const siteName = 'ID Lookup';

function buildUrl(path?: string) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (!siteUrl || !path) {
    return null;
  }

  return `${siteUrl.replace(/\/$/, '')}${path}`;
}

export default function Seo({ title, description, path }: SeoProps) {
  const fullTitle = title === siteName ? title : `${title} | ${siteName}`;
  const canonical = buildUrl(path);

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {canonical ? <link rel="canonical" href={canonical} /> : null}
      {canonical ? <meta property="og:url" content={canonical} /> : null}
    </Head>
  );
}

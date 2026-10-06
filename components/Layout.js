import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import { localBusinessJsonLd } from '../lib/structuredData';

export default function Layout({
  children,
  content,
  title,
  description,
  canonicalPath = '/',
}) {
  const pageTitle = title
    ? `${title} | ${content?.businessName || 'SNK Automobile'}`
    : `${content?.businessName || 'SNK Automobile'} — Car Repair Services`;
  const pageDescription =
    description ||
    content?.tagline ||
    'Full service auto repair and maintenance. Certified technicians, fair estimates.';

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const canonical = `${siteUrl}${canonicalPath}`;

  const jsonLd = content ? localBusinessJsonLd(content) : null;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonical} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        {jsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        )}
      </Head>
      <div className="flex min-h-screen flex-col">
        <Header content={content} />
        <main className="flex-1">{children}</main>
        <Footer content={content} />
      </div>
    </>
  );
}

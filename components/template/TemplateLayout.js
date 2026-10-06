import Head from 'next/head';
import TemplateStyles from './TemplateStyles';
import TemplateLoader from './TemplateLoader';
import TemplateHeader from './TemplateHeader';
import TemplateFooter from './TemplateFooter';
import TemplateBodyClassSetter from './TemplateBodyClassSetter';
import { localBusinessJsonLd } from '../../lib/structuredData';

export default function TemplateLayout({
  children,
  content,
  isHome = false,
  title,
  description,
  canonicalPath = '/',
}) {
  const pageTitle = title
    ? `${title} | ${content?.businessName || 'SNV Automobile (UK) Ltd'}`
    : `${content?.businessName || 'SNV Automobile (UK) Ltd'} — Car Repair & Maintenance`;
  const pageDescription =
    description || content?.tagline || 'Vehicle repair shop in Harrow, London.';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const canonical = `${siteUrl}${canonicalPath}`;
  const bodyClass = isHome
    ? 'home page-template-default page layout-1 theme-car-repair-services'
    : 'page layout-1 theme-car-repair-services';

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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta property="og:image" content={`${siteUrl}/brand/snv-logo-512.png`} />
        {jsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        )}
      </Head>
      <TemplateStyles />
      <TemplateBodyClassSetter bodyClass={bodyClass} />
      <div>
        <TemplateLoader />
        <TemplateHeader content={content} />
        <div id="pageContent" className="content-area">
          <div id="primary" className={isHome ? '' : 'container'}>
            {children}
          </div>
        </div>
        <TemplateFooter content={content} />
      </div>
    </>
  );
}

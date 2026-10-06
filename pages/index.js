import TemplateLayout from '../components/template/TemplateLayout';
import HomePageContent from '../components/template/HomePageContent';
import { SITE_CONTENT } from '../lib/siteContent';

export default function Home({ content }) {
  return (
    <TemplateLayout content={content} isHome canonicalPath="/">
      <HomePageContent content={content} />
    </TemplateLayout>
  );
}

export async function getStaticProps() {
  return { props: { content: SITE_CONTENT } };
}

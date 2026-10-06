import TemplateLayout from '../components/template/TemplateLayout';
import TemplateBookingForm from '../components/template/TemplateBookingForm';
import { SITE_CONTENT } from '../lib/siteContent';

export default function BookingPage({ content }) {
  return (
    <TemplateLayout
      content={content}
      title="Schedule Appointment"
      description="Book auto repair and maintenance. Certified technicians, fair estimates."
      canonicalPath="/booking"
    >
      <div className="post page type-page">
        <TemplateBookingForm
          services={content?.repairServices}
          whatsapp={content?.whatsapp}
          phone={content?.phone}
          businessName={content?.businessName}
        />
      </div>
    </TemplateLayout>
  );
}

export async function getStaticProps() {
  return { props: { content: SITE_CONTENT } };
}

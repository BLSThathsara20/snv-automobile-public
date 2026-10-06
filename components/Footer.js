import Link from 'next/link';

export default function Footer({ content }) {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-ink text-white">
      <div className="border-b border-white/10 bg-brand py-10 text-center">
        <p className="text-sm uppercase tracking-widest text-white/90">Schedule</p>
        <h2 className="mt-2 text-2xl font-bold md:text-3xl">
          Schedule Your Appointment Today
        </h2>
        <p className="mt-2 text-white/90">{content?.tagline}</p>
        <a
          href={`tel:${content?.phone?.replace(/[^\d+]/g, '')}`}
          className="mt-4 inline-block text-3xl font-bold tracking-tight"
        >
          {content?.phone}
        </a>
        <div className="mt-6">
          <Link href="/booking" className="btn-outline !border-white !text-white hover:!bg-white hover:!text-brand">
            Appointment
          </Link>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <h3 className="mb-3 font-semibold uppercase">Call</h3>
          <p>{content?.phone}</p>
          <p className="mt-2 text-sm text-white/70">{content?.address}</p>
        </div>
        <div>
          <h3 className="mb-3 font-semibold uppercase">Hours</h3>
          <p className="text-sm text-white/80">{content?.hours?.weekdays}</p>
          <p className="text-sm text-white/80">{content?.hours?.saturday}</p>
          <p className="text-sm text-white/80">{content?.hours?.sunday}</p>
        </div>
        <div>
          <h3 className="mb-3 font-semibold uppercase">Email</h3>
          <a href={`mailto:${content?.email}`} className="text-brand-light hover:underline">
            {content?.email}
          </a>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-sm text-white/60">
        © {year} {content?.businessName || 'SNK Automobile'}, All Rights Reserved
      </div>
    </footer>
  );
}

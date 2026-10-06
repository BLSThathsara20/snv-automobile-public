const icons = {
  maintenance: (
    <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  common: (
    <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  ),
  brake: (
    <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

export default function ServiceList({ services = [] }) {
  return (
    <section id="services" className="bg-gray-50 py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="section-title">What We Do</h2>
        <p className="section-subtitle">
          We offer full service auto repair &amp; maintenance
        </p>

        <ul className="mt-12 grid gap-8 md:grid-cols-3">
          {services.map((service) => (
            <li
              key={service.id}
              className="rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm transition hover:shadow-md"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand/10 text-brand">
                {icons[service.icon] || icons.maintenance}
              </div>
              <h3 className="text-lg font-bold text-ink">{service.title}</h3>
              <p className="mt-3 text-sm text-ink-muted">{service.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function RepairServicesList({ repairServices = [] }) {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="section-title">Repair Services That We Offer</h2>
        <p className="section-subtitle">
          Full range of mechanical repairs for all makes and models
        </p>
        <ul className="mt-10 columns-1 gap-x-8 sm:columns-2 lg:columns-3">
          {repairServices.map((item) => (
            <li
              key={item}
              className="mb-3 flex items-start gap-2 break-inside-avoid text-sm text-ink"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

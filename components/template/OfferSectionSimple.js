import Link from 'next/link';
import SnkIcon from './SnkIcon';

function chunk(list, size) {
  const out = [];
  for (let i = 0; i < list.length; i += size) out.push(list.slice(i, i + size));
  return out;
}

export default function OfferSectionSimple({ services = [] }) {
  const cols = chunk(services, Math.ceil(services.length / 3) || 1);

  return (
    <section className="snk-offer">
      <div className="snk-offer__inner">
        <header className="snk-offer__header">
          <p className="snk-offer__kicker">Services</p>
          <h2 className="snk-offer__title">
            <span className="snk-offer__title-main">Repair Services That</span>{' '}
            <span className="snk-offer__accent">We Offer</span>
          </h2>
          <p className="snk-offer__subtitle">
            Clear pricing, fast diagnostics, and quality work—book an appointment and we’ll take
            care of the rest.
          </p>
          <div className="snk-offer__actions">
            <Link href="/booking" className="btn btn-border snk-offer__cta">
              <span>Book appointment</span>
            </Link>
          </div>
        </header>

        <div className="snk-offer__grid" role="list">
          {cols.map((col, idx) => (
            <ul key={idx} className="snk-offer__col" role="listitem">
              {col.map((item) => (
                <li key={item} className="snk-offer__item">
                  <span className="snk-offer__icon" aria-hidden>
                    <SnkIcon name="check" size={16} strokeWidth={2.5} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}


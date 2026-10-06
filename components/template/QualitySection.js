import Link from 'next/link';
import Image from 'next/image';
import SnkIcon from './SnkIcon';
import { img } from '../../lib/templateAssets';

export default function QualitySection({ guarantees = [] }) {
  return (
    <section className="snk-quality">
      <div className="container">
        <div className="snk-quality__grid">
          <div className="snk-quality__media">
            <div className="snk-quality__image-main">
              <Image
                src={img('img-parallax01-img01-1.jpg')}
                alt="Technician working on a vehicle"
                width={640}
                height={480}
                className="snk-quality__photo"
              />
            </div>
            <div className="snk-quality__promo">
              <div className="snk-quality__promo-tag">Special offer</div>
              <div className="snk-quality__promo-title">
                Coupons from <span>$25 off</span> repairs
              </div>
              <p className="snk-quality__promo-text">Any service of $250 or more</p>
              <Link href="/booking" className="snk-quality__promo-btn">
                See all coupons
              </Link>
            </div>
          </div>

          <div className="snk-quality__content">
            <p className="snk-quality__kicker">Why choose us</p>
            <h2 className="snk-quality__title">
              Quality Service and Customer <span>Satisfaction!</span>
            </h2>
            <p className="snk-quality__lead">
              We use the latest diagnostic equipment to guarantee your vehicle is repaired or
              serviced properly and in a timely fashion.
            </p>
            <ul className="snk-quality__list">
              {guarantees.map((item) => (
                <li key={item} className="snk-quality__item">
                  <span className="snk-quality__check" aria-hidden>
                    <SnkIcon name="check" size={16} strokeWidth={2.5} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

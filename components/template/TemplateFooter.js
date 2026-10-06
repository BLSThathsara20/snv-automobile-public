import Link from 'next/link';
import Image from 'next/image';
import { SITE_LOGO } from '../../lib/templateAssets';
import SnkIcon from './SnkIcon';

export default function TemplateFooter({ content }) {
  const year = new Date().getFullYear();
  const phoneDigits = (content?.phone || '').replace(/[^\d]/g, '');
  const tel = phoneDigits.startsWith('07')
    ? `+44${phoneDigits.slice(1)}`
    : phoneDigits.startsWith('44')
      ? `+${phoneDigits}`
      : phoneDigits;
  const email = content?.email || '';
  const address = content?.address || '';
  const businessName = content?.businessName || 'SNV Automobile (UK) Ltd';
  const hours = content?.hours || {};

  return (
    <>
      <footer className="snk-footer" id="contact">
        <div className="snk-footer__cta">
          <div className="container snk-footer__cta-inner">
            <div className="snk-footer__cta-text">
              <div className="snk-footer__cta-eyebrow">Need service fast?</div>
              <div className="snk-footer__cta-title">Schedule your appointment today</div>
            </div>
            <div className="snk-footer__cta-actions">
              <a className="snk-footer__cta-phone" href={tel ? `tel:${tel}` : undefined}>
                {content?.phone || 'Call us'}
              </a>
              <Link href="/booking" className="snk-footer__cta-btn">
                Book Appointment
              </Link>
            </div>
          </div>
        </div>

        <div className="snk-footer__main">
          <div className="container">
            <div className="snk-footer__grid">
              <div className="snk-footer__brand">
                <div className="snk-footer__logo" aria-label={businessName}>
                  <Image
                    src={SITE_LOGO}
                    alt={businessName}
                    width={88}
                    height={88}
                    className="snk-logo"
                  />
                </div>
                <p className="snk-footer__tagline">
                  {content?.tagline || 'Your Automotive Repair & Maintenance Service Specialist'}
                </p>
              </div>

              <div className="snk-footer__col">
                <div className="snk-footer__title">Contact</div>
                <div className="snk-footer__item">
                  <span className="snk-footer__icon" aria-hidden="true">
                    <SnkIcon name="map-pin" size={18} />
                  </span>
                  <span>{address}</span>
                </div>
                <div className="snk-footer__item">
                  <span className="snk-footer__icon" aria-hidden="true">
                    <SnkIcon name="phone" size={18} />
                  </span>
                  <a href={tel ? `tel:${tel}` : undefined}>{content?.phone}</a>
                </div>
                {email ? (
                  <div className="snk-footer__item">
                    <span className="snk-footer__icon" aria-hidden="true">
                      <SnkIcon name="mail" size={18} />
                    </span>
                    <a href={`mailto:${email}`}>{email}</a>
                  </div>
                ) : null}
              </div>

              <div className="snk-footer__col">
                <div className="snk-footer__title">Hours</div>
                <div className="snk-footer__hours">
                  <div>{hours.weekdays}</div>
                  <div>{hours.saturday}</div>
                  <div>{hours.sunday}</div>
                </div>
                <div className="snk-footer__links">
                  <Link href="/booking">Appointment</Link>
                  <Link href="/#services">Services</Link>
                </div>
              </div>
            </div>

            <div className="snk-footer__bottom">
              <div className="snk-footer__copy">
                © {year} {businessName}. All Rights Reserved.
              </div>
              <div className="snk-footer__credit">
                Designed &amp; developed by{' '}
                <a
                  href="https://savithathsara.me"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  savithathsara.me
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

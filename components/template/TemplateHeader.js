import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { SITE_LOGO } from '../../lib/templateAssets';
import SnkIcon from './SnkIcon';

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/#services', label: 'Services' },
  { href: '/booking', label: 'Appointment' },
  { href: '/#contact', label: 'Contacts' },
];

function formatPhoneDisplay(phone) {
  if (!phone) return { prefix: '', code: '07958', rest: '319821' };
  const digits = phone.replace(/[^\d]/g, '');
  // UK mobile: 07xxx xxxxxx
  if (digits.startsWith('07') && digits.length === 11) {
    return {
      prefix: '',
      code: digits.slice(0, 5),
      rest: digits.slice(5),
    };
  }
  // Already international without +
  if (digits.startsWith('447') && digits.length === 12) {
    return {
      prefix: '+44 ',
      code: `0${digits.slice(2, 6)}`,
      rest: digits.slice(6),
    };
  }
  if (digits.length >= 10) {
    const rest = digits.slice(-7);
    const area = digits.slice(-10, -7);
    const leading = digits.length > 10 ? `${digits.slice(0, -10)}-` : '';
    return { prefix: leading, code: area, rest: `${rest.slice(0, 3)}-${rest.slice(3)}` };
  }
  return { prefix: '', code: '', rest: phone };
}

function toTelHref(phone) {
  if (!phone) return 'tel:+447958319821';
  const digits = phone.replace(/[^\d+]/g, '');
  if (digits.startsWith('+')) return `tel:${digits}`;
  if (digits.startsWith('07')) return `tel:+44${digits.slice(1)}`;
  if (digits.startsWith('44')) return `tel:+${digits}`;
  return `tel:${digits}`;
}

export default function TemplateHeader({ content }) {
  const phone = formatPhoneDisplay(content?.phone);
  const tel = toTelHref(content?.phone);
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = useMemo(() => NAV, []);

  useEffect(() => {
    const body = document.body;
    const pageContent = document.getElementById('pageContent');
    const slidemenu = document.getElementById('slidemenu');
    const headerRow = document.querySelector('.page-header-1 .header-row');
    const headerInfoMobile = document.querySelector('.header-info-mobile');
    const pageFooter = document.querySelector('.snk-footer');

    const targets = [pageContent, slidemenu, headerRow, headerInfoMobile, pageFooter].filter(
      Boolean
    );

    if (menuOpen) {
      body.classList.add('slide-active');
      for (const el of targets) el.classList.add('slide-active');
    } else {
      body.classList.remove('slide-active');
      for (const el of targets) el.classList.remove('slide-active');
    }

    function onKeyDown(e) {
      if (e.key === 'Escape') setMenuOpen(false);
    }

    if (menuOpen) {
      window.addEventListener('keydown', onKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  return (
    <header className="page-header page-header-1 sticky">
      <nav className="navbar" id="slide-nav">
        <div className="container">
          <div
            className="darkout-menu"
            role="presentation"
            onClick={() => setMenuOpen(false)}
          />
          <div className="header-info-mobile">
            <div className="header-info-mobile-inside">
              <p className="snk-header-info-line">
                <SnkIcon name="map-pin" size={16} className="snk-header-info-icon" />
                {content?.address}
              </p>
              <p className="snk-header-info-line">
                <SnkIcon name="phone" size={16} className="snk-header-info-icon" />
                {content?.phone}
              </p>
              {content?.email ? (
                <p className="snk-header-info-line">
                  <SnkIcon name="mail" size={16} className="snk-header-info-icon" />
                  {content.email}
                </p>
              ) : null}
              <p className="snk-header-info-line">
                <SnkIcon name="clock" size={16} className="snk-header-info-icon" />
                {content?.hours?.weekdays}
              </p>
            </div>
          </div>

          <div className="heade-mobile-top">
            <div className="header-info-toggle">
              <i className="icon-arrow_down js-info-toggle" />
            </div>
            <Link href="/booking" className="appointment">
              <span className="appointment__icon" aria-hidden>
                <SnkIcon name="calendar" size={18} strokeWidth={2.25} />
              </span>
              <span>Appointment</span>
            </Link>
          </div>

          <div className="heade-mobile">
            <div className="col-left mr-auto">
              <div className="logo">
                <Link href="/">
                  <Image
                    src={SITE_LOGO}
                    alt={content?.businessName || 'SNV Automobile'}
                    width={72}
                    height={72}
                    priority
                    className="snk-logo"
                  />
                </Link>
              </div>
            </div>
            <div className="col-right">
              <div className="address">{content?.hours?.weekdays}</div>
              <Link href="/booking" className="appointment">
                <span className="appointment__icon" aria-hidden>
                  <SnkIcon name="calendar" size={18} strokeWidth={2.25} />
                </span>
                <span>Appointment</span>
              </Link>
              <button
                type="button"
                className={`navbar-toggle ${menuOpen ? 'slide-active' : ''}`}
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((v) => !v)}
              >
                <span />
                <span />
                <span />
              </button>
            </div>
          </div>

          <div className="header-row">
            <div className="header-info-toggle">
              <i className="icon-arrow_down js-info-toggle" />
            </div>
            <div className="logo">
              <Link href="/">
                <Image
                  src={SITE_LOGO}
                  alt={content?.businessName || 'SNV Automobile'}
                  width={96}
                  height={96}
                  priority
                  className="snk-logo"
                />
              </Link>
            </div>
            <div className="header-right">
              <div className="header-right-top">
                <div className="address">
                  {content?.hours?.weekdays || (
                    <>
                      Monday-Saturday{' '}
                      <span className="custom-color">8:00AM - 7:00PM</span>
                    </>
                  )}
                </div>
                <Link href="/booking" className="appointment">
                  <span className="appointment__icon" aria-hidden>
                    <SnkIcon name="calendar" size={18} strokeWidth={2.25} />
                  </span>
                  <span>Appointment</span>
                </Link>
              </div>
              <div className="header-right-bottom">
                <div className="header-phone">
                  <span className="text">Schedule Your Appointment Today</span>
                  <a href={tel} className="phone-number">
                    {phone.prefix}
                    <span className="code">{phone.code}</span>
                    {phone.rest ? ` ${phone.rest}` : ''}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div id="slidemenu">
            <div className="row">
              <div className="col-md-11">
                <ul className="nav navbar-nav">
                  {navItems.map((item) => (
                    <li key={item.href} className="main-menu-item menu-item-depth-0">
                      <Link
                        href={item.href}
                        className="menu-link main-menu-link"
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

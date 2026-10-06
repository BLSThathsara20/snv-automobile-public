import Link from 'next/link';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/#services', label: 'Services' },
  { href: '/booking', label: 'Appointment' },
  { href: '/#contact', label: 'Contacts' },
];

export default function Header({ content }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-ink text-white shadow-lg">
      <div className="hidden border-b border-white/10 bg-ink/95 py-2 text-xs md:block">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4">
          <span>{content?.address}</span>
          <span>
            <a href={`tel:${content?.phone?.replace(/[^\d+]/g, '')}`} className="hover:text-brand-light">
              {content?.phone}
            </a>
            {content?.fax && ` · Fax: ${content.fax}`}
          </span>
          <a href={`mailto:${content?.email}`} className="hover:text-brand-light">
            {content?.email}
          </a>
          <span>{content?.hours?.weekdays}</span>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold uppercase tracking-wider">
          <span className="text-brand">SNK</span> Auto
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Main">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium uppercase tracking-wide hover:text-brand-light"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/booking" className="btn-primary !py-2 !text-xs">
            Appointment
          </Link>
        </nav>

        <button
          type="button"
          className="rounded border border-white/30 px-3 py-2 text-sm md:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          Menu
        </button>
      </div>

      {open && (
        <nav className="border-t border-white/10 px-4 pb-4 md:hidden" aria-label="Mobile">
          <ul className="flex flex-col gap-3 pt-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block py-1 text-sm font-medium uppercase"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

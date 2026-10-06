import { useState } from 'react';
import SnkIcon from './SnkIcon';

const WHATSAPP_NUMBER = '+447958319821';

const initial = {
  name: '',
  email: '',
  phone: '',
  carModel: '',
  service: '',
  preferredDatetime: '',
  notes: '',
};

function normalizeWhatsAppNumber(number) {
  return (number || '').replace(/[^\d]/g, '');
}

function formatDatetime(value) {
  if (!value) return '';
  try {
    return new Date(value).toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  } catch {
    return value;
  }
}

function buildWhatsAppUrl({ whatsapp, form }) {
  const digits = normalizeWhatsAppNumber(whatsapp);
  const text = encodeURIComponent(
    [
      'Hello, I would like to book an appointment.',
      '',
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      `Car model: ${form.carModel}`,
      `Service: ${form.service}`,
      `Preferred date/time: ${formatDatetime(form.preferredDatetime)}`,
      form.notes ? `Notes: ${form.notes}` : '',
    ]
      .filter(Boolean)
      .join('\n')
  );
  return `https://wa.me/${digits}?text=${text}`;
}

export default function TemplateBookingForm({
  services = [],
  whatsapp = WHATSAPP_NUMBER,
  phone = '',
  businessName = 'SNV Automobile (UK) Ltd',
}) {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState({ type: '', message: '' });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    const digits = normalizeWhatsAppNumber(whatsapp);
    if (!digits) {
      setStatus({
        type: 'error',
        message: 'WhatsApp number is not configured. Please call us to schedule.',
      });
      return;
    }

    window.location.href = buildWhatsAppUrl({ whatsapp, form });
  }

  const phoneDigits = (phone || '').replace(/[^\d]/g, '');
  const tel = phoneDigits.startsWith('07')
    ? `+44${phoneDigits.slice(1)}`
    : phoneDigits.startsWith('44')
      ? `+${phoneDigits}`
      : phoneDigits;

  return (
    <section className="snk-booking">
      <div className="container">
        <header className="snk-booking__header">
          <p className="snk-booking__kicker">Book online</p>
          <h1 className="snk-booking__title">Schedule Auto Service</h1>
          <p className="snk-booking__subtitle">
            Complete the form and we&apos;ll open WhatsApp with your details ready to send to{' '}
            {businessName}.
          </p>
        </header>

        <div className="snk-booking__layout">
          <aside className="snk-booking__aside">
            <div className="snk-booking__info-card">
              <h2 className="snk-booking__info-title">How it works</h2>
              <ol className="snk-booking__steps">
                <li>Fill in your contact and vehicle details</li>
                <li>Tap send — WhatsApp opens with your message</li>
                <li>We confirm your appointment time</li>
              </ol>
            </div>
            {tel ? (
              <div className="snk-booking__info-card snk-booking__info-card--muted">
                <h2 className="snk-booking__info-title">Prefer to call?</h2>
                <a className="snk-booking__phone" href={`tel:${tel}`}>
                  <SnkIcon name="phone" size={18} />
                  {phone}
                </a>
              </div>
            ) : null}
            <p className="snk-booking__note">
              Requested dates and times are subject to availability. We&apos;ll reply on WhatsApp
              as soon as possible.
            </p>
          </aside>

          <form className="snk-booking__form" onSubmit={handleSubmit} noValidate>
            <div className="snk-booking__grid">
              <label className="snk-booking__field">
                <span className="snk-booking__label">Full name *</span>
                <input
                  className="snk-booking__input"
                  name="name"
                  autoComplete="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Smith"
                />
              </label>

              <label className="snk-booking__field">
                <span className="snk-booking__label">Email *</span>
                <input
                  className="snk-booking__input"
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@email.com"
                />
              </label>

              <label className="snk-booking__field">
                <span className="snk-booking__label">Phone *</span>
                <input
                  className="snk-booking__input"
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+44 7xxx xxxxxx"
                />
              </label>

              <label className="snk-booking__field">
                <span className="snk-booking__label">Car model *</span>
                <input
                  className="snk-booking__input"
                  name="carModel"
                  required
                  value={form.carModel}
                  onChange={handleChange}
                  placeholder="e.g. Toyota Corolla 2020"
                />
              </label>

              <label className="snk-booking__field snk-booking__field--full">
                <span className="snk-booking__label">Service required *</span>
                <select
                  className="snk-booking__input snk-booking__select"
                  name="service"
                  required
                  value={form.service}
                  onChange={handleChange}
                >
                  <option value="">Select a service</option>
                  {services.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </label>

              <label className="snk-booking__field snk-booking__field--full">
                <span className="snk-booking__label">Preferred date &amp; time *</span>
                <input
                  className="snk-booking__input"
                  type="datetime-local"
                  name="preferredDatetime"
                  required
                  value={form.preferredDatetime}
                  onChange={handleChange}
                />
              </label>

              <label className="snk-booking__field snk-booking__field--full">
                <span className="snk-booking__label">Additional notes</span>
                <textarea
                  className="snk-booking__input snk-booking__textarea"
                  name="notes"
                  rows={4}
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="Describe the issue or any special requests"
                />
              </label>
            </div>

            {status.message && (
              <p
                className={`snk-booking__alert snk-booking__alert--${status.type || 'info'}`}
                role="alert"
              >
                {status.message}
              </p>
            )}

            <button type="submit" className="snk-booking__submit">
              <span className="snk-booking__submit-icon" aria-hidden>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </span>
              Send appointment via WhatsApp
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

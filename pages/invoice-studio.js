import Head from 'next/head';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Download,
  FilePlus2,
  Loader2,
  Lock,
  LogOut,
  Plus,
  Trash2,
} from 'lucide-react';
import { buildInvoicePdf, preloadInvoicePdf } from '../lib/buildInvoicePdf';
import { SITE_CONTENT } from '../lib/siteContent';
import { SITE_LOGO } from '../lib/templateAssets';

const AUTH_KEY = 'snv_invoice_studio_auth';
const INVOICE_PASSWORD =
  process.env.NEXT_PUBLIC_INVOICE_PASSWORD || 'SNV-Invoice-2026';

const currency = (value) =>
  new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(Number.isFinite(value) ? value : 0);

const formatDateUK = (iso) => {
  if (!iso) return '—';
  const parts = String(iso).split('-');
  if (parts.length !== 3) return iso;
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
};

const todayISO = () => new Date().toISOString().slice(0, 10);

const makeInvoiceNumber = () => {
  const d = new Date();
  const stamp = [
    d.getFullYear().toString().slice(2),
    String(d.getMonth() + 1).padStart(2, '0'),
    String(d.getDate()).padStart(2, '0'),
  ].join('');
  const rand = String(Math.floor(Math.random() * 900) + 100);
  return `SNV-${stamp}-${rand}`;
};

const blankItem = () => ({
  id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
  description: '',
  qty: '1',
  unitPrice: '',
});

const blankInvoice = () => ({
  invoiceNumber: makeInvoiceNumber(),
  date: todayISO(),
  dueDate: todayISO(),
  status: 'Due on receipt',
  customerName: '',
  customerPhone: '',
  customerEmail: '',
  customerAddress: '',
  vehicleMake: '',
  vehicleModel: '',
  vehicleReg: '',
  vehicleMileage: '',
  notes: '',
  vatRate: '20',
  labourDiscount: '0',
  items: [
    {
      ...blankItem(),
      description: 'Labour / diagnostics',
      qty: '1',
      unitPrice: '',
    },
  ],
});

function PasswordGate({ onUnlock }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (password === INVOICE_PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, '1');
      onUnlock();
      return;
    }
    setError('Incorrect password. Try again.');
  };

  return (
    <div className="inv-gate">
      <div className="inv-gate-card">
        <img
          src={SITE_LOGO}
          alt={SITE_CONTENT.businessName}
          className="inv-gate-logo"
        />
        <h1>Invoice Studio</h1>
        <p>
          Private workshop tool for {SITE_CONTENT.businessName}. Enter the
          access password to continue.
        </p>
        <form className="inv-gate-form" onSubmit={submit}>
          <label htmlFor="inv-password">Access password</label>
          <input
            id="inv-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError('');
            }}
            placeholder="••••••••"
          />
          <p className="inv-gate-error" role="alert">
            {error}
          </p>
          <button type="submit" className="inv-gate-btn">
            <Lock size={16} style={{ display: 'inline', marginRight: 8 }} />
            Unlock studio
          </button>
        </form>
      </div>
    </div>
  );
}

function InvoicePreview({ data, logoSrc, lineItems, subtotal, vatAmount, total }) {
  const hasVehicle =
    data.vehicleMake ||
    data.vehicleModel ||
    data.vehicleReg ||
    data.vehicleMileage;

  return (
    <div className="inv-paper" id="invoice-pdf-root">
      <header className="inv-doc-header">
        <div className="inv-doc-company">
          <img
            src={logoSrc}
            alt={SITE_CONTENT.businessName}
            className="inv-doc-logo"
          />
          <div>
            <div className="inv-doc-company-name">
              {SITE_CONTENT.businessName}
            </div>
            <div className="inv-doc-company-details">
              {SITE_CONTENT.address}
              <br />
              {SITE_CONTENT.city}, {SITE_CONTENT.country}
              <br />
              Tel: {SITE_CONTENT.phone}
            </div>
          </div>
        </div>
        <div className="inv-doc-title-block">
          <h1 className="inv-doc-title">INVOICE</h1>
          <table className="inv-doc-meta">
            <tbody>
              <tr>
                <th>Invoice No.</th>
                <td>{data.invoiceNumber}</td>
              </tr>
              <tr>
                <th>Invoice Date</th>
                <td>{formatDateUK(data.date)}</td>
              </tr>
              <tr>
                <th>Due Date</th>
                <td>{formatDateUK(data.dueDate)}</td>
              </tr>
              <tr>
                <th>Status</th>
                <td>{data.status || '—'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </header>

      <div className="inv-doc-rule" />

      <section className="inv-doc-parties">
        <div>
          <h2 className="inv-doc-section-label">Bill To</h2>
          <div className="inv-doc-party-name">
            {data.customerName || 'Customer name'}
          </div>
          <div className="inv-doc-party-lines">
            {data.customerAddress ? <div>{data.customerAddress}</div> : null}
            {data.customerPhone ? <div>Tel: {data.customerPhone}</div> : null}
            {data.customerEmail ? <div>{data.customerEmail}</div> : null}
            {!data.customerAddress &&
              !data.customerPhone &&
              !data.customerEmail && (
                <div className="inv-doc-muted">Customer details</div>
              )}
          </div>
        </div>
        <div>
          <h2 className="inv-doc-section-label">Vehicle Details</h2>
          {hasVehicle ? (
            <table className="inv-doc-vehicle">
              <tbody>
                {(data.vehicleMake || data.vehicleModel) && (
                  <tr>
                    <th>Make / Model</th>
                    <td>
                      {[data.vehicleMake, data.vehicleModel]
                        .filter(Boolean)
                        .join(' ')}
                    </td>
                  </tr>
                )}
                {data.vehicleReg && (
                  <tr>
                    <th>Registration</th>
                    <td>{data.vehicleReg}</td>
                  </tr>
                )}
                {data.vehicleMileage && (
                  <tr>
                    <th>Mileage</th>
                    <td>{data.vehicleMileage}</td>
                  </tr>
                )}
              </tbody>
            </table>
          ) : (
            <div className="inv-doc-muted">No vehicle details entered</div>
          )}
        </div>
      </section>

      <table className="inv-doc-items">
        <thead>
          <tr>
            <th className="col-desc">Description</th>
            <th className="col-qty">Qty</th>
            <th className="col-rate">Unit Price</th>
            <th className="col-amt">Amount</th>
          </tr>
        </thead>
        <tbody>
          {lineItems.length === 0 ? (
            <tr>
              <td colSpan={4}>No line items</td>
            </tr>
          ) : (
            lineItems.map((item) => (
              <tr key={item.id}>
                <td className="col-desc">{item.description || '—'}</td>
                <td className="col-qty">{item.qty}</td>
                <td className="col-rate">{currency(item.unitPrice)}</td>
                <td className="col-amt">{currency(item.amount)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="inv-doc-summary">
        <table className="inv-doc-totals">
          <tbody>
            <tr>
              <th>Subtotal</th>
              <td>{currency(subtotal)}</td>
            </tr>
            <tr>
              <th>VAT ({data.vatRate || 0}%)</th>
              <td>{currency(vatAmount)}</td>
            </tr>
            {Number(data.labourDiscount) > 0 && (
              <tr>
                <th>Discount</th>
                <td>-{currency(Number(data.labourDiscount))}</td>
              </tr>
            )}
            <tr className="inv-doc-total-row">
              <th>Total Due</th>
              <td>{currency(total)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {data.notes?.trim() ? (
        <section className="inv-doc-notes">
          <h2 className="inv-doc-section-label">Notes</h2>
          <p>{data.notes}</p>
        </section>
      ) : null}

      <footer className="inv-doc-footer">
        <div>
          Thank you for your business.
          <br />
          Please make payment by the due date quoted above.
        </div>
        <div className="inv-doc-footer-right">
          {SITE_CONTENT.businessName}
          <br />
          {SITE_CONTENT.phone}
        </div>
      </footer>
    </div>
  );
}

export default function InvoiceStudioPage() {
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [data, setData] = useState(blankInvoice);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [exporting, setExporting] = useState(false);
  const [mobileTab, setMobileTab] = useState('edit');
  const previewRef = useRef(null);

  useEffect(() => {
    try {
      setAuthed(sessionStorage.getItem(AUTH_KEY) === '1');
    } catch {
      setAuthed(false);
    }
    setReady(true);
  }, []);

  // Warm PDF engine + logo after unlock so download is near-instant
  useEffect(() => {
    if (authed) preloadInvoicePdf();
  }, [authed]);

  const updateField = (key, value) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const updateItem = (id, key, value) => {
    setData((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === id ? { ...item, [key]: value } : item
      ),
    }));
  };

  const addItem = () => {
    setData((prev) => ({
      ...prev,
      items: [...prev.items, blankItem()],
    }));
  };

  const removeItem = (id) => {
    setData((prev) => ({
      ...prev,
      items:
        prev.items.length <= 1
          ? prev.items
          : prev.items.filter((item) => item.id !== id),
    }));
  };

  const lineItems = useMemo(
    () =>
      data.items.map((item) => {
        const qty = Math.max(0, parseFloat(item.qty) || 0);
        const unitPrice = Math.max(0, parseFloat(item.unitPrice) || 0);
        return {
          ...item,
          qty,
          unitPrice,
          amount: qty * unitPrice,
        };
      }),
    [data.items]
  );

  const subtotal = useMemo(
    () => lineItems.reduce((sum, item) => sum + item.amount, 0),
    [lineItems]
  );

  const vatRate = Math.max(0, parseFloat(data.vatRate) || 0);
  const discount = Math.max(0, parseFloat(data.labourDiscount) || 0);
  const vatAmount = (subtotal * vatRate) / 100;
  const total = Math.max(0, subtotal + vatAmount - discount);

  const resetInvoice = () => {
    setData(blankInvoice());
    setStatus({ type: 'ok', message: 'New invoice ready.' });
  };

  const logout = () => {
    sessionStorage.removeItem(AUTH_KEY);
    setAuthed(false);
  };

  const downloadPdf = useCallback(async () => {
    setExporting(true);
    setStatus({ type: '', message: 'Generating…' });

    try {
      await buildInvoicePdf({
        data,
        lineItems,
        subtotal,
        vatAmount,
        total,
      });
      setStatus({ type: 'ok', message: 'PDF downloaded.' });
    } catch (err) {
      console.error(err);
      setStatus({
        type: 'err',
        message: 'Could not export PDF. Please try again.',
      });
    } finally {
      setExporting(false);
    }
  }, [data, lineItems, subtotal, vatAmount, total]);

  if (!ready) {
    return (
      <div className="inv-studio">
        <div className="inv-gate">
          <p style={{ color: '#9aa3b2' }}>Loading…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="inv-studio">
      <Head>
        <title>Invoice Studio · {SITE_CONTENT.businessName}</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </Head>

      {!authed ? (
        <PasswordGate onUnlock={() => setAuthed(true)} />
      ) : (
        <div className="inv-shell">
          <header className="inv-topbar">
            <div className="inv-brand">
              <img src={SITE_LOGO} alt="" />
              <div className="inv-brand-text">
                <h1>Invoice Studio</h1>
                <span>{SITE_CONTENT.businessName} · private tool</span>
              </div>
            </div>
            <div className="inv-actions">
              <button
                type="button"
                className="inv-btn inv-btn-ghost"
                onClick={resetInvoice}
                title="New invoice"
              >
                <FilePlus2 size={16} />
                <span className="inv-btn-label">New</span>
              </button>
              <button
                type="button"
                className="inv-btn"
                onClick={logout}
                title="Lock studio"
              >
                <LogOut size={16} />
                <span className="inv-btn-label">Lock</span>
              </button>
            </div>
          </header>

          <div className="inv-mobile-tabs" role="tablist" aria-label="Studio view">
            <button
              type="button"
              role="tab"
              aria-selected={mobileTab === 'edit'}
              className={`inv-mobile-tab${mobileTab === 'edit' ? ' is-active' : ''}`}
              onClick={() => setMobileTab('edit')}
            >
              Edit
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mobileTab === 'preview'}
              className={`inv-mobile-tab${mobileTab === 'preview' ? ' is-active' : ''}`}
              onClick={() => setMobileTab('preview')}
            >
              Preview
            </button>
          </div>

          <div className={`inv-layout inv-layout--${mobileTab}`}>
            <section className="inv-panel inv-panel-form">
              <h2>Details</h2>

              <div className="inv-section-label">Invoice</div>
              <div className="inv-grid-2">
                <div className="inv-field">
                  <label htmlFor="invoiceNumber">Invoice number</label>
                  <input
                    id="invoiceNumber"
                    value={data.invoiceNumber}
                    onChange={(e) => updateField('invoiceNumber', e.target.value)}
                  />
                </div>
                <div className="inv-field">
                  <label htmlFor="status">Status</label>
                  <select
                    id="status"
                    value={data.status}
                    onChange={(e) => updateField('status', e.target.value)}
                  >
                    <option>Due on receipt</option>
                    <option>Paid</option>
                    <option>Part paid</option>
                    <option>Quote</option>
                  </select>
                </div>
                <div className="inv-field">
                  <label htmlFor="date">Date</label>
                  <input
                    id="date"
                    type="date"
                    value={data.date}
                    onChange={(e) => updateField('date', e.target.value)}
                  />
                </div>
                <div className="inv-field">
                  <label htmlFor="dueDate">Due date</label>
                  <input
                    id="dueDate"
                    type="date"
                    value={data.dueDate}
                    onChange={(e) => updateField('dueDate', e.target.value)}
                  />
                </div>
              </div>

              <div className="inv-section-label">Customer</div>
              <div className="inv-field">
                <label htmlFor="customerName">Name</label>
                <input
                  id="customerName"
                  value={data.customerName}
                  onChange={(e) => updateField('customerName', e.target.value)}
                  placeholder="Customer full name"
                />
              </div>
              <div className="inv-grid-2">
                <div className="inv-field">
                  <label htmlFor="customerPhone">Phone</label>
                  <input
                    id="customerPhone"
                    value={data.customerPhone}
                    onChange={(e) => updateField('customerPhone', e.target.value)}
                  />
                </div>
                <div className="inv-field">
                  <label htmlFor="customerEmail">Email</label>
                  <input
                    id="customerEmail"
                    type="email"
                    value={data.customerEmail}
                    onChange={(e) => updateField('customerEmail', e.target.value)}
                  />
                </div>
              </div>
              <div className="inv-field">
                <label htmlFor="customerAddress">Address</label>
                <textarea
                  id="customerAddress"
                  value={data.customerAddress}
                  onChange={(e) => updateField('customerAddress', e.target.value)}
                  placeholder="Billing address"
                />
              </div>

              <div className="inv-section-label">Vehicle</div>
              <div className="inv-grid-2">
                <div className="inv-field">
                  <label htmlFor="vehicleMake">Make</label>
                  <input
                    id="vehicleMake"
                    value={data.vehicleMake}
                    onChange={(e) => updateField('vehicleMake', e.target.value)}
                    placeholder="e.g. BMW"
                  />
                </div>
                <div className="inv-field">
                  <label htmlFor="vehicleModel">Model</label>
                  <input
                    id="vehicleModel"
                    value={data.vehicleModel}
                    onChange={(e) => updateField('vehicleModel', e.target.value)}
                  />
                </div>
                <div className="inv-field">
                  <label htmlFor="vehicleReg">Registration</label>
                  <input
                    id="vehicleReg"
                    value={data.vehicleReg}
                    onChange={(e) => updateField('vehicleReg', e.target.value)}
                  />
                </div>
                <div className="inv-field">
                  <label htmlFor="vehicleMileage">Mileage</label>
                  <input
                    id="vehicleMileage"
                    value={data.vehicleMileage}
                    onChange={(e) => updateField('vehicleMileage', e.target.value)}
                  />
                </div>
              </div>

              <div className="inv-section-label">Line items</div>
              <div className="inv-items">
                {data.items.map((item) => (
                  <div className="inv-item-row" key={item.id}>
                    <div className="inv-field">
                      <label>Description</label>
                      <input
                        value={item.description}
                        onChange={(e) =>
                          updateItem(item.id, 'description', e.target.value)
                        }
                        placeholder="Part / labour"
                      />
                    </div>
                    <div className="inv-field">
                      <label>Qty</label>
                      <input
                        type="number"
                        min="0"
                        step="0.5"
                        value={item.qty}
                        onChange={(e) => updateItem(item.id, 'qty', e.target.value)}
                      />
                    </div>
                    <div className="inv-field">
                      <label>Rate (£)</label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.unitPrice}
                        onChange={(e) =>
                          updateItem(item.id, 'unitPrice', e.target.value)
                        }
                      />
                    </div>
                    <button
                      type="button"
                      className="inv-item-remove"
                      onClick={() => removeItem(item.id)}
                      aria-label="Remove line"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
              <button type="button" className="inv-btn inv-add-item" onClick={addItem}>
                <Plus size={16} />
                Add line item
              </button>

              <div className="inv-totals-form inv-grid-2">
                <div className="inv-field">
                  <label htmlFor="vatRate">VAT %</label>
                  <input
                    id="vatRate"
                    type="number"
                    min="0"
                    step="0.1"
                    value={data.vatRate}
                    onChange={(e) => updateField('vatRate', e.target.value)}
                  />
                </div>
                <div className="inv-field">
                  <label htmlFor="labourDiscount">Discount (£)</label>
                  <input
                    id="labourDiscount"
                    type="number"
                    min="0"
                    step="0.01"
                    value={data.labourDiscount}
                    onChange={(e) => updateField('labourDiscount', e.target.value)}
                  />
                </div>
              </div>

              <div className="inv-field">
                <label htmlFor="notes">Notes (optional)</label>
                <textarea
                  id="notes"
                  value={data.notes}
                  onChange={(e) => updateField('notes', e.target.value)}
                  placeholder="Add a note for this invoice…"
                />
              </div>

              <p
                className={`inv-status${
                  status.type === 'ok'
                    ? ' is-ok'
                    : status.type === 'err'
                      ? ' is-err'
                      : ''
                }`}
              >
                {status.message}
              </p>
            </section>

            <section className="inv-preview-wrap">
              <div className="inv-panel inv-preview-heading">
                <h2>Live preview</h2>
              </div>
              <div className="inv-preview-scroll" ref={previewRef}>
                <InvoicePreview
                  data={data}
                  logoSrc={SITE_LOGO}
                  lineItems={lineItems}
                  subtotal={subtotal}
                  vatAmount={vatAmount}
                  total={total}
                />
              </div>
            </section>
          </div>

          <button
            type="button"
            className={`inv-fab${exporting ? ' is-busy' : ''}`}
            onClick={downloadPdf}
            disabled={exporting}
            aria-busy={exporting}
            aria-label={exporting ? 'Generating invoice PDF' : 'Download PDF'}
            title={exporting ? 'Generating invoice…' : 'Download PDF'}
          >
            {exporting ? (
              <Loader2 size={22} strokeWidth={2.25} className="inv-fab-spin" />
            ) : (
              <Download size={22} strokeWidth={2.25} />
            )}
            <span className="inv-fab-label">
              {exporting ? 'Generating…' : 'PDF'}
            </span>
          </button>

        </div>
      )}
    </div>
  );
}

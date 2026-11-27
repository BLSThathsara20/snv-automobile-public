import { SITE_CONTENT } from './siteContent';
import { SITE_LOGO } from './templateAssets';

const currency = (value) =>
  new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(Number.isFinite(value) ? value : 0);

const formatDateUK = (iso) => {
  if (!iso) return '-';
  const parts = String(iso).split('-');
  if (parts.length !== 3) return iso;
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
};

let jsPdfCtor = null;
let logoCache = null;
let preloadPromise = null;

async function getJsPdf() {
  if (jsPdfCtor) return jsPdfCtor;
  const mod = await import('jspdf');
  jsPdfCtor = mod.jsPDF;
  return jsPdfCtor;
}

async function getLogoDataUrl() {
  if (logoCache !== null) return logoCache;
  try {
    const res = await fetch(SITE_LOGO, { cache: 'force-cache' });
    if (!res.ok) {
      logoCache = '';
      return logoCache;
    }
    const blob = await res.blob();
    logoCache = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result || '');
      reader.onerror = () => resolve('');
      reader.readAsDataURL(blob);
    });
  } catch {
    logoCache = '';
  }
  return logoCache;
}

/** Warm jsPDF + logo after unlock so download feels instant */
export function preloadInvoicePdf() {
  if (!preloadPromise) {
    preloadPromise = Promise.all([getJsPdf(), getLogoDataUrl()]).then(() => true);
  }
  return preloadPromise;
}

/**
 * Fast A4 invoice PDF — text drawing only, cached assets.
 */
export async function buildInvoicePdf({
  data,
  lineItems,
  subtotal,
  vatAmount,
  total,
}) {
  const [JsPDF, logoDataUrl] = await Promise.all([
    getJsPdf(),
    getLogoDataUrl(),
  ]);

  const pdf = new JsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: false,
  });

  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();
  const margin = 16;
  const right = pageW - margin;
  let y = margin;

  const ensureSpace = (needed = 12) => {
    if (y + needed > pageH - margin) {
      pdf.addPage();
      y = margin;
    }
  };

  if (logoDataUrl) {
    try {
      pdf.addImage(logoDataUrl, 'PNG', margin, y, 18, 18);
    } catch {
      // skip logo if image decode fails
    }
  }

  const textLeft = margin + (logoDataUrl ? 22 : 0);

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(12);
  pdf.setTextColor(17, 17, 17);
  pdf.text(SITE_CONTENT.businessName, textLeft, y + 5);

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(8);
  pdf.setTextColor(85, 85, 85);
  pdf.text(
    [
      SITE_CONTENT.address,
      `${SITE_CONTENT.city}, ${SITE_CONTENT.country}`,
      `Tel: ${SITE_CONTENT.phone}`,
    ],
    textLeft,
    y + 10
  );

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(20);
  pdf.setTextColor(17, 17, 17);
  pdf.text('INVOICE', right, y + 6, { align: 'right' });

  pdf.setFontSize(9);
  const meta = [
    ['Invoice No.', data.invoiceNumber || '-'],
    ['Invoice Date', formatDateUK(data.date)],
    ['Due Date', formatDateUK(data.dueDate)],
    ['Status', data.status || '-'],
  ];
  let metaY = y + 14;
  meta.forEach(([label, value]) => {
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(85, 85, 85);
    pdf.text(label, right - 52, metaY);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(17, 17, 17);
    pdf.text(String(value), right, metaY, { align: 'right' });
    metaY += 4.5;
  });

  y = Math.max(y + 28, metaY + 2);

  pdf.setDrawColor(34, 34, 34);
  pdf.setLineWidth(0.4);
  pdf.line(margin, y, right, y);
  y += 8;

  const col2 = margin + (right - margin) / 2 + 2;
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(8);
  pdf.setTextColor(85, 85, 85);
  pdf.text('BILL TO', margin, y);
  pdf.text('VEHICLE DETAILS', col2, y);
  y += 5;

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(10);
  pdf.setTextColor(17, 17, 17);
  pdf.text(data.customerName || 'Customer name', margin, y);

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(8);
  pdf.setTextColor(85, 85, 85);
  const billLines = [
    data.customerAddress,
    data.customerPhone ? `Tel: ${data.customerPhone}` : '',
    data.customerEmail || '',
  ].filter(Boolean);
  if (billLines.length) pdf.text(billLines, margin, y + 4);
  else pdf.text('Customer details', margin, y + 4);

  let vY = y;
  const vehicleRows = [
    [
      'Make / Model',
      [data.vehicleMake, data.vehicleModel].filter(Boolean).join(' '),
    ],
    ['Registration', data.vehicleReg],
    ['Mileage', data.vehicleMileage],
  ].filter(([, val]) => val);

  if (vehicleRows.length) {
    vehicleRows.forEach(([label, value]) => {
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(85, 85, 85);
      pdf.text(label, col2, vY);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(17, 17, 17);
      pdf.text(String(value), col2 + 30, vY);
      vY += 4.5;
    });
  } else {
    pdf.setFont('helvetica', 'italic');
    pdf.setTextColor(136, 136, 136);
    pdf.text('No vehicle details', col2, vY);
    vY += 4.5;
  }

  y = Math.max(y + 4 + Math.max(billLines.length, 1) * 4, vY) + 8;

  ensureSpace(16);
  const cols = {
    desc: margin,
    qty: right - 68,
    rate: right - 40,
    amt: right,
  };

  pdf.setFillColor(31, 41, 51);
  pdf.rect(margin, y - 3.5, right - margin, 7, 'F');
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(7.5);
  pdf.setTextColor(255, 255, 255);
  pdf.text('DESCRIPTION', cols.desc + 1.5, y + 1);
  pdf.text('QTY', cols.qty, y + 1, { align: 'right' });
  pdf.text('UNIT PRICE', cols.rate, y + 1, { align: 'right' });
  pdf.text('AMOUNT', cols.amt, y + 1, { align: 'right' });
  y += 7;

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(9);
  pdf.setTextColor(17, 17, 17);

  const items =
    lineItems.length > 0
      ? lineItems
      : [{ description: 'No line items', qty: '', unitPrice: 0, amount: 0 }];

  items.forEach((item) => {
    const desc = pdf.splitTextToSize(
      item.description || '-',
      cols.qty - cols.desc - 6
    );
    const rowH = Math.max(6, desc.length * 4 + 1.5);
    ensureSpace(rowH + 2);

    pdf.text(desc, cols.desc + 1.5, y);
    if (item.qty !== '') {
      pdf.text(String(item.qty), cols.qty, y, { align: 'right' });
      pdf.text(currency(item.unitPrice), cols.rate, y, { align: 'right' });
      pdf.text(currency(item.amount), cols.amt, y, { align: 'right' });
    }
    y += rowH;
  });

  pdf.setDrawColor(34, 34, 34);
  pdf.setLineWidth(0.3);
  pdf.line(margin, y, right, y);
  y += 6;

  ensureSpace(24);
  const totalsX = right - 68;
  const rows = [
    ['Subtotal', currency(subtotal)],
    [`VAT (${data.vatRate || 0}%)`, currency(vatAmount)],
  ];
  if (Number(data.labourDiscount) > 0) {
    rows.push(['Discount', `-${currency(Number(data.labourDiscount))}`]);
  }

  pdf.setFontSize(9);
  rows.forEach(([label, value]) => {
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(85, 85, 85);
    pdf.text(label, totalsX, y);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(17, 17, 17);
    pdf.text(String(value), right, y, { align: 'right' });
    y += 5;
  });

  y += 1;
  pdf.setDrawColor(34, 34, 34);
  pdf.setLineWidth(0.5);
  pdf.line(totalsX, y - 2, right, y - 2);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(11);
  pdf.setTextColor(17, 17, 17);
  pdf.text('Total Due', totalsX, y + 3);
  pdf.text(currency(total), right, y + 3, { align: 'right' });
  y += 12;

  if (data.notes?.trim()) {
    ensureSpace(16);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(8);
    pdf.setTextColor(85, 85, 85);
    pdf.text('NOTES', margin, y);
    y += 4;
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8);
    const noteLines = pdf.splitTextToSize(data.notes.trim(), right - margin);
    ensureSpace(noteLines.length * 4 + 4);
    pdf.text(noteLines, margin, y);
    y += noteLines.length * 4 + 6;
  }

  ensureSpace(12);
  pdf.setDrawColor(200, 200, 200);
  pdf.setLineWidth(0.2);
  pdf.line(margin, y, right, y);
  y += 5;
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(7.5);
  pdf.setTextColor(85, 85, 85);
  pdf.text(
    'Thank you for your business. Please make payment by the due date.',
    margin,
    y
  );
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(17, 17, 17);
  pdf.text(`${SITE_CONTENT.businessName}  |  ${SITE_CONTENT.phone}`, right, y, {
    align: 'right',
  });

  const safeName = (data.customerName || 'customer')
    .replace(/[^a-z0-9]+/gi, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();

  pdf.save(`${data.invoiceNumber}-${safeName || 'invoice'}.pdf`);
}

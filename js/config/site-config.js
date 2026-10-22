/** Site-wide settings — phones, social, and donation bank details. */
export const WHATSAPP_NUMBER = '2348135529645';

/** Shown in header, footer, and contact areas. */
export const CONTACT_PHONES_DISPLAY = '0813 552 9645 · 0802 778 0305';

export const SOCIAL_URLS = {
  facebook: 'https://www.facebook.com/lasalfoundation/',
  instagram: 'https://www.instagram.com/lasalfoundation/',
  x: 'https://x.com/lasalfoundation',
  // youtube: '#', // No foundation channel yet
};

// Restore YouTube icon: add SOCIAL_URLS.youtube and paste the standard icon link in .social-media / .social-links (see git history or README).

/**
 * Estimated USD → NGN rate for donation equivalents on the Donate page (not live FX).
 * Update periodically; bank transfer is in NGN.
 */
export const DONATION_USD_TO_NGN = 1600;

export function usdToNgn(usd) {
  return Math.round(Number(usd) * DONATION_USD_TO_NGN);
}

export function ngnToUsd(ngn) {
  return Number(ngn) / DONATION_USD_TO_NGN;
}

export function formatUsd(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
}

export function formatNgn(amount) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Direct bank transfer (Donate page and WhatsApp donation messages). */
export const DONATION_BANK = {
  accountName: 'The Lateef Ajibade Salami Foundation',
  currency: 'NGN',
  transferNote:
    'Cheques may also be written in the Foundation’s account name. Use your full name as payment narration (e.g. Donation – Jane Doe).',
  accounts: [
    { bankName: 'Ecobank plc', accountNumber: '0015051133' },
    { bankName: 'Stanbic IBTC', accountNumber: '0017096204' },
  ],
};

/** When set, card donations can use Paystack Inline JS (see js/forms.js). */
// export const PAYSTACK_PUBLIC_KEY = '';

export function donationBankDetailsHtml() {
  const rows = DONATION_BANK.accounts
    .map(
      (a) =>
        `<strong>${a.bankName}:</strong> ${a.accountNumber}`
    )
    .join('<br>');
  return `
      <h4 style="color: var(--primary-color); margin-bottom: var(--spacing-sm);">Bank transfer details</h4>
      <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.7; margin-bottom: var(--spacing-sm);">
        <strong>Account name:</strong> ${DONATION_BANK.accountName}<br>
        ${rows}<br>
        <strong>Currency:</strong> ${DONATION_BANK.currency}
      </p>
      <p style="color: var(--text-muted); font-size: 0.9rem;">${DONATION_BANK.transferNote}</p>
    `;
}

export function donationBankWhatsAppSummary() {
  const accts = DONATION_BANK.accounts
    .map((a) => `${a.bankName} ${a.accountNumber}`)
    .join('; ');
  return `${DONATION_BANK.accountName} (${accts})`;
}

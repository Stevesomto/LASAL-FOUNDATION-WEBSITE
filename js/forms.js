import { openWhatsApp } from './whatsapp.js';
import {
  // PAYSTACK_PUBLIC_KEY,
  DONATION_USD_TO_NGN,
  donationBankDetailsHtml,
  donationBankWhatsAppSummary,
  formatNgn,
  formatUsd,
  ngnToUsd,
  usdToNgn,
} from './config/site-config.js';

export function initSiteForms() {
  initContactForm();
  initDonationForm();
  bindScholarshipApplicationForm();
}

/** Call after dynamic scholarship detail form is injected. */
export function bindScholarshipApplicationForm() {
  initScholarshipApplicationForm();
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form || form.dataset.lasalBound === 'true') return;
  form.dataset.lasalBound = 'true';

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name')?.value.trim();
    const email = document.getElementById('contact-email')?.value.trim();
    const subject = document.getElementById('contact-subject')?.value.trim();
    const message = document.getElementById('contact-message')?.value.trim();

    if (!name || !email || !subject || !message) return;

    const body = [
      '*LASAL Foundation – Contact Form*',
      '',
      `*Name:* ${name}`,
      `*Email:* ${email}`,
      `*Subject:* ${subject}`,
      '',
      '*Message:*',
      message,
    ].join('\n');

    openWhatsApp(body);
    form.reset();
    showFormFeedback(form, 'Opening WhatsApp to send your message to our team…', 'success');
  });
}

function initDonationForm() {
  const form = document.getElementById('donation-form');
  if (!form || form.dataset.lasalBound === 'true') return;
  form.dataset.lasalBound = 'true';

  const amountButtons = form.querySelectorAll('[data-donation-amount]');
  const customAmountInput = document.getElementById('custom-amount');
  const customAmountLabel = document.getElementById('custom-amount-label');
  const selectedEquivalentEl = document.getElementById('donation-selected-equivalent');
  const customEquivalentEl = document.getElementById('donation-custom-equivalent');
  const rateNoteEl = document.getElementById('donation-rate-note');
  const currencyRadios = form.querySelectorAll('input[name="donation-currency"]');
  const bankPanel = document.getElementById('bank-transfer-details');
  const paymentSelect = document.getElementById('payment-method');
  let selectedUsd = 100;

  function getDonationCurrency() {
    const checked = form.querySelector('input[name="donation-currency"]:checked');
    return checked?.value === 'ngn' ? 'ngn' : 'usd';
  }

  function decorateAmountButtons() {
    amountButtons.forEach((btn) => {
      const usd = Number(btn.getAttribute('data-donation-amount'));
      const ngn = usdToNgn(usd);
      btn.innerHTML = `<span class="donation-btn-usd">${formatUsd(usd)}</span><span class="donation-btn-ngn">≈ ${formatNgn(ngn)}</span>`;
    });
  }

  function resolveDonationAmounts() {
    const currency = getDonationCurrency();
    const customRaw = customAmountInput?.value.trim();
    const hasCustom = customRaw !== '' && !Number.isNaN(parseFloat(customRaw, 10));

    if (hasCustom) {
      const val = parseFloat(customRaw, 10);
      if (val <= 0) return null;
      if (currency === 'ngn') {
        return { usd: ngnToUsd(val), ngn: Math.round(val), fromPreset: false };
      }
      return { usd: val, ngn: usdToNgn(val), fromPreset: false };
    }

    return { usd: selectedUsd, ngn: usdToNgn(selectedUsd), fromPreset: true };
  }

  function updateDonationEquivalents() {
    const currency = getDonationCurrency();
    if (customAmountLabel) {
      customAmountLabel.textContent =
        currency === 'ngn' ? 'Custom amount (Naira)' : 'Custom amount (USD)';
    }
    if (customAmountInput) {
      customAmountInput.placeholder = currency === 'ngn' ? '160000' : '100';
    }
    if (rateNoteEl) {
      rateNoteEl.textContent = `Estimated rate: ${formatNgn(DONATION_USD_TO_NGN)} per $1 USD (for guidance; your bank may differ).`;
    }

    const amounts = resolveDonationAmounts();
    if (!amounts) {
      if (selectedEquivalentEl) selectedEquivalentEl.textContent = '';
      if (customEquivalentEl) customEquivalentEl.textContent = '';
      return;
    }

    const { usd, ngn, fromPreset } = amounts;
    const pairLine = `${formatUsd(usd)} ≈ ${formatNgn(ngn)} for bank transfer`;

    if (fromPreset && selectedEquivalentEl) {
      selectedEquivalentEl.textContent = `Selected: ${pairLine}`;
    } else if (selectedEquivalentEl) {
      selectedEquivalentEl.textContent = '';
    }

    const customRaw = customAmountInput?.value.trim();
    const hasCustom = customRaw !== '' && !Number.isNaN(parseFloat(customRaw, 10));
    if (customEquivalentEl) {
      customEquivalentEl.textContent = hasCustom ? `Equivalent: ${pairLine}` : '';
    }
  }

  decorateAmountButtons();
  updateDonationEquivalents();

  amountButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      amountButtons.forEach((b) => {
        b.classList.remove('btn-primary');
        b.classList.add('btn-outline1');
        b.style.backgroundColor = '';
      });
      btn.classList.remove('btn-outline1');
      btn.classList.add('btn-primary');
      btn.style.backgroundColor = 'var(--secondary-color)';
      selectedUsd = Number(btn.getAttribute('data-donation-amount'));
      if (customAmountInput) customAmountInput.value = '';
      const usdRadio = form.querySelector('#donation-currency-usd');
      if (usdRadio) usdRadio.checked = true;
      updateDonationEquivalents();
    });
  });

  if (customAmountInput) {
    customAmountInput.addEventListener('input', () => {
      const val = parseFloat(customAmountInput.value, 10);
      if (!Number.isNaN(val) && val > 0) {
        amountButtons.forEach((b) => {
          b.classList.remove('btn-primary');
          b.classList.add('btn-outline1');
          b.style.backgroundColor = '';
        });
      }
      updateDonationEquivalents();
    });
  }

  if (customAmountInput) {
    customAmountInput.dataset.currency = 'usd';
  }

  currencyRadios.forEach((radio) => {
    radio.addEventListener('change', () => {
      const newCurrency = getDonationCurrency();
      const raw = customAmountInput?.value.trim();
      const prevCurrency = customAmountInput?.dataset.currency || 'usd';
      if (raw && customAmountInput && !Number.isNaN(parseFloat(raw, 10))) {
        const val = parseFloat(raw, 10);
        let nextVal = val;
        if (prevCurrency === 'usd' && newCurrency === 'ngn') {
          nextVal = usdToNgn(val);
        } else if (prevCurrency === 'ngn' && newCurrency === 'usd') {
          nextVal = Math.round(ngnToUsd(val) * 100) / 100;
        }
        customAmountInput.value = String(nextVal);
      }
      if (customAmountInput) customAmountInput.dataset.currency = newCurrency;
      updateDonationEquivalents();
    });
  });

  function toggleBankPanel() {
    if (!bankPanel || !paymentSelect) return;
    const show = paymentSelect.value === 'bank';
    bankPanel.style.display = show ? 'block' : 'none';
  }

  if (paymentSelect) {
    paymentSelect.addEventListener('change', toggleBankPanel);
    toggleBankPanel();
  }

  const staticBank = document.getElementById('donation-bank-static');
  const bankHtml = donationBankDetailsHtml();
  if (staticBank) staticBank.innerHTML = bankHtml;
  if (bankPanel) bankPanel.innerHTML = bankHtml;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('donor-name')?.value.trim();
    const email = document.getElementById('donor-email')?.value.trim();
    const method = paymentSelect?.value || 'bank';
    const amounts = resolveDonationAmounts();
    if (!amounts || amounts.usd <= 0 || amounts.ngn <= 0) {
      showFormFeedback(form, 'Please enter your details and a valid donation amount.', 'error');
      return;
    }
    const { usd, ngn } = amounts;

    // Card (Paystack) — restore with PAYSTACK_PUBLIC_KEY import and donate.html Paystack script
    // if (method === 'card' && PAYSTACK_PUBLIC_KEY) {
    //   startPaystackDonation({ amount, email, name, form });
    //   return;
    // }

    const methodLabel = 'Direct Bank Transfer';
    // method === 'bank'
    //   ? 'Direct Bank Transfer'
    //   : method === 'paypal'
    //     ? 'PayPal'
    //     : 'Credit / Debit Card';

    const body = [
      '*LASAL Foundation – Donation*',
      '',
      `*Donor:* ${name}`,
      `*Email:* ${email}`,
      `*Amount:* ${formatUsd(usd)} (approx. ${formatNgn(ngn)} for bank transfer)`,
      `*Payment method:* ${methodLabel}`,
      '',
      `I will transfer to ${donationBankWhatsAppSummary()}. Please confirm receipt.`,
      // method === 'bank'
      //   ? `I will transfer to ${donationBankWhatsAppSummary()}. Please confirm receipt.`
      //   : 'Please share payment instructions or Paystack link to complete my donation.',
    ].join('\n');

    openWhatsApp(body);
    showFormFeedback(
      form,
      'Bank details are shown above. WhatsApp is opening so you can notify us after you transfer.',
      'success'
    );
    // showFormFeedback(
    //   form,
    //   method === 'bank'
    //     ? 'Bank details are shown above. WhatsApp is opening so you can notify us after you transfer.'
    //     : 'Opening WhatsApp so our team can help you complete your donation.',
    //   'success'
    // );
  });
}

// function startPaystackDonation({ amount, email, name, form }) {
//   if (typeof window.PaystackPop === 'undefined') {
//     showFormFeedback(form, 'Paystack is loading. Please try again in a moment.', 'error');
//     return;
//   }
//
//   const handler = window.PaystackPop.setup({
//     key: PAYSTACK_PUBLIC_KEY,
//     email,
//     amount: Math.round(amount * 100),
//     currency: 'NGN',
//     ref: `LAS-DON-${Date.now()}`,
//     metadata: { custom_fields: [{ display_name: 'Donor Name', variable_name: 'donor_name', value: name }] },
//     callback: () => {
//       showFormFeedback(form, 'Thank you! Your Paystack payment was initiated successfully.', 'success');
//       form.reset();
//     },
//     onClose: () => {},
//   });
//   handler.openIframe();
// }

function initScholarshipApplicationForm() {
  const form = document.getElementById('scholarship-application-form');
  if (!form || form.dataset.lasalBound === 'true') return;
  form.dataset.lasalBound = 'true';

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const feedback = document.getElementById('form-feedback');
    const fullName = document.getElementById('full-name')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const university = document.getElementById('university')?.value.trim();
    const ref = 'LAS-' + Math.floor(100000 + Math.random() * 900000);

    const body = [
      '*LASAL Foundation – Scholarship Application (Quick Form)*',
      '',
      `*Reference:* ${ref}`,
      `*Name:* ${fullName}`,
      `*Email:* ${email}`,
      `*Institution:* ${university}`,
      '',
      'Supporting documents were submitted via the website form.',
    ].join('\n');

    openWhatsApp(body);

    if (feedback) {
      feedback.textContent = `Application recorded (${ref}). WhatsApp is opening to complete submission with our team.`;
      feedback.style.color = 'var(--success-color)';
    }
    form.reset();
  });
}

function showFormFeedback(form, message, type) {
  let el = form.querySelector('.form-inline-feedback');
  if (!el) {
    el = document.createElement('div');
    el.className = 'form-inline-feedback';
    el.style.marginTop = 'var(--spacing-md)';
    el.style.fontSize = '0.95rem';
    el.style.fontWeight = '500';
    form.appendChild(el);
  }
  el.textContent = message;
  el.style.color = type === 'error' ? 'var(--error-color)' : 'var(--success-color)';
}

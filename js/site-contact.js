import { CONTACT_PHONES_DISPLAY, SOCIAL_URLS } from './config/site-config.js';

/** Nigerian local format (0813…) → international tel: link (+234813…). */
function telHref(display) {
  const digits = display.replace(/\D/g, '');
  return `tel:${digits.startsWith('0') ? `+234${digits.slice(1)}` : `+${digits}`}`;
}

function phoneLinksHtml() {
  return CONTACT_PHONES_DISPLAY.split('·')
    .map((phone) => phone.trim())
    .filter(Boolean)
    .map((phone) => `<a href="${telHref(phone)}">${phone}</a>`)
    .join(' · ');
}

/** Apply phones, social URLs, and the copyright year from site-config across static HTML pages. */
export function initSiteContact() {
  const phoneLinks = phoneLinksHtml();
  document.querySelectorAll('.contact-phone-links').forEach((el) => {
    el.innerHTML = phoneLinks;
  });

  const year = String(new Date().getFullYear());
  document.querySelectorAll('.current-year').forEach((el) => {
    el.textContent = year;
  });

  const socialMap = [
    ['Facebook', SOCIAL_URLS.facebook],
    ['Instagram', SOCIAL_URLS.instagram],
    // ['YouTube', SOCIAL_URLS.youtube],
    ['X', SOCIAL_URLS.x],
  ];

  socialMap.forEach(([label, url]) => {
    document.querySelectorAll(`a[aria-label="${label}"]`).forEach((a) => {
      if (url && url !== '#') {
        a.href = url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
      }
    });
  });
}

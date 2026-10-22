import { CONTACT_PHONES_DISPLAY, SOCIAL_URLS } from './config/site-config.js';

const LEGACY_PHONE = '+234 803 400 4001';
const PHONE_DISPLAY = `📞 ${CONTACT_PHONES_DISPLAY}`;

const PHONE_PAIR =
  /0813\s*552\s*9645\s*[^\d\s][^\d]*?\s*0802\s*778\s*0305|0813\s*552\s*9645\s+0802\s*778\s*0305/g;

/** Apply phones and social URLs from site-config across static HTML pages. */
export function initSiteContact() {
  document.querySelectorAll('span, li, p').forEach((el) => {
    if (el.textContent.includes(LEGACY_PHONE)) {
      el.textContent = el.textContent.replace(LEGACY_PHONE, CONTACT_PHONES_DISPLAY);
    }
    if (/0813\s*552\s*9645/.test(el.textContent) && /0802\s*778\s*0305/.test(el.textContent)) {
      el.textContent = el.textContent.replace(PHONE_PAIR, CONTACT_PHONES_DISPLAY);
    }
  });

  document.querySelectorAll('.header-head span').forEach((el) => {
    if (el.textContent.includes('📞')) {
      el.textContent = PHONE_DISPLAY;
    }
  });

  document.querySelectorAll('.site-footer span, .site-footer li').forEach((el) => {
    if (el.textContent.includes('📞') && /0813/.test(el.textContent)) {
      const hasPhoneLabel = /phone\s*:/i.test(el.textContent);
      el.textContent = hasPhoneLabel
        ? `📞 Phone: ${CONTACT_PHONES_DISPLAY}`
        : PHONE_DISPLAY;
    }
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

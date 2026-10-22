let revealObserver = null;

export function initMotion() {
  initHomePreloader();
  initScrollReveal();
  window.setTimeout(refreshScrollReveal, 150);
}

export function refreshScrollReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    markRevealTargets();
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
    return;
  }

  if (!revealObserver) initScrollReveal();
  markRevealTargets();
  observeRevealElements();
}

function initHomePreloader() {
  const preloader = document.getElementById('site-preloader');
  if (!preloader) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    preloader.remove();
    return;
  }

  document.body.classList.add('is-preloading');

  const MIN_DISPLAY_MS = 900;
  const start = Date.now();

  function hidePreloader() {
    const elapsed = Date.now() - start;
    const wait = Math.max(0, MIN_DISPLAY_MS - elapsed);

    window.setTimeout(() => {
      preloader.classList.add('site-preloader--hide');
      document.body.classList.remove('is-preloading');
      window.setTimeout(() => preloader.remove(), 650);
    }, wait);
  }

  if (document.readyState === 'complete') {
    hidePreloader();
  } else {
    window.addEventListener('load', hidePreloader, { once: true });
    window.setTimeout(hidePreloader, 4000);
  }
}

function initScrollReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    },
    { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
  );

  markRevealTargets();
  observeRevealElements();
}

function markRevealTargets(root = document) {
  const candidates = root.querySelectorAll(
    'main .section-header, main .about-hero-content, main .section .card, main .section .wizard-progress, main .section form.card, main .section > .container > .card, main .cycle-step-card, main .story-deck-block, main .partner-deck-card, main .storytelling-pill, main .beneficiaries-table-wrap, main .belief-list li, main .split-deck-grid > div'
  );

  candidates.forEach((el) => {
    if (el.closest('.hero-slider') || el.closest('#site-preloader')) return;
    if (el.classList.contains('no-reveal') || el.closest('.no-reveal')) return;
    if (el.classList.contains('reveal')) return;
    el.classList.add('reveal');
  });

  root.querySelectorAll('main .section .container').forEach((container) => {
    const grid = container.querySelector(':scope > div[style*="grid"]');
    if (!grid) return;

    const children = [...grid.children].filter(
      (child) => child.classList.contains('card') || child.tagName === 'DIV'
    );

    children.forEach((child, index) => {
      if (child.closest('.hero-slider')) return;
      if (!child.classList.contains('reveal')) child.classList.add('reveal');
      child.style.setProperty('--reveal-delay', `${Math.min(index * 90, 450)}ms`);
    });
  });
}

function observeRevealElements() {
  if (!revealObserver) return;

  document.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => {
    if (el.dataset.revealObserved === 'true') return;
    el.dataset.revealObserved = 'true';
    revealObserver.observe(el);
  });
}

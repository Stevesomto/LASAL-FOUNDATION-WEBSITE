/** Photos & Videos merged into Stories — drop legacy nav item if old HTML still has it. */
function removeLegacyPhotosVideosNav() {
  document.querySelectorAll('.nav-links li').forEach((li) => {
    const link = li.querySelector('a');
    if (!link) return;
    const href = (link.getAttribute('href') || '').toLowerCase();
    const label = link.textContent.replace(/\s+/g, ' ').trim().toLowerCase();
    const isLegacyMediaPage = href.includes('student-media');
    const isPhotosVideosLabel =
      /photos?\s*(and|&)\s*videos?/.test(label) ||
      (href.includes('photos-videos') && label.includes('photo'));
    if (isLegacyMediaPage || isPhotosVideosLabel) {
      li.remove();
    }
  });
}

const ABOUT_SUBMENU = [
  { href: 'about.html#governance', label: 'Governance' },
  { href: 'about.html#leadership', label: 'Leadership' },
];

/** Turns the "About Us" nav item into a dropdown (hover on desktop, tap the arrow on mobile). */
function addAboutDropdown() {
  const aboutLink = document.querySelector('.nav-links > li > a[href="about.html"]');
  const item = aboutLink?.parentElement;
  if (!item || item.classList.contains('nav-dropdown')) return;

  item.classList.add('nav-dropdown');

  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'nav-dropdown-toggle';
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Show About Us menu');
  toggle.innerHTML = '<span aria-hidden="true">&#9662;</span>';

  const submenu = document.createElement('ul');
  submenu.className = 'nav-submenu';
  submenu.innerHTML = ABOUT_SUBMENU.map((link) => `<li><a href="${link.href}">${link.label}</a></li>`).join('');

  aboutLink.after(toggle, submenu);

  const setOpen = (open) => {
    item.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  };

  toggle.addEventListener('click', (event) => {
    event.stopPropagation();
    setOpen(!item.classList.contains('open'));
  });

  document.addEventListener('click', (event) => {
    if (!item.contains(event.target)) setOpen(false);
  });

  item.addEventListener('focusout', (event) => {
    if (!item.contains(event.relatedTarget)) setOpen(false);
  });

  item.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      setOpen(false);
      toggle.focus();
    }
  });
}

function setMobileNavOpen(open) {
  const navLinks = document.querySelector('.nav-links');
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  if (!navLinks || !toggleBtn) return;

  navLinks.classList.toggle('active', open);
  document.body.classList.toggle('mobile-nav-open', open);
  toggleBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  toggleBtn.textContent = open ? '✕' : '☰';
}

function syncMobileNavOffset() {
  const header = document.querySelector('.site-header');
  if (!header || window.matchMedia('(min-width: 769px)').matches) return;
  const bottom = header.getBoundingClientRect().bottom;
  document.documentElement.style.setProperty('--mobile-nav-offset', `${Math.round(bottom)}px`);
}

export function initNavigation() {
  removeLegacyPhotosVideosNav();
  addAboutDropdown();

  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      const willOpen = !navLinks.classList.contains('active');
      if (willOpen) syncMobileNavOffset();
      setMobileNavOpen(willOpen);
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        if (window.matchMedia('(max-width: 768px)').matches) {
          setMobileNavOpen(false);
        }
      });
    });
  }

  window.addEventListener('resize', () => {
    syncMobileNavOffset();
    if (window.matchMedia('(min-width: 769px)').matches) {
      setMobileNavOpen(false);
    }
  });

  window.addEventListener('scroll', syncMobileNavOffset, { passive: true });

  // Highlight active page link
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach((link) => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });
}

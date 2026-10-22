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

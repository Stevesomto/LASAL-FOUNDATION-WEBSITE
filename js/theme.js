const STORAGE_KEY = 'lasal-theme';

export function getTheme() {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

export function setTheme(theme) {
  const next = theme === 'dark' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem(STORAGE_KEY, next);
}

function updateToggleButton(btn, theme) {
  const isDark = theme === 'dark';
  btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  btn.setAttribute('title', isDark ? 'Light mode' : 'Dark mode');
  btn.innerHTML = isDark
    ? '<i class="fa-solid fa-sun" aria-hidden="true"></i>'
    : '<i class="fa-solid fa-moon" aria-hidden="true"></i>';
}

/** Inserts header toggle if missing; syncs icon with current theme. */
export function initThemeToggle() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  let toggle = navbar.querySelector('.theme-toggle');
  if (!toggle) {
    toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'theme-toggle';

    const mobileBtn = navbar.querySelector('.mobile-menu-toggle');
    let actions = navbar.querySelector('.navbar-actions');
    if (!actions) {
      actions = document.createElement('div');
      actions.className = 'navbar-actions';
      if (mobileBtn) {
        navbar.replaceChild(actions, mobileBtn);
        actions.appendChild(toggle);
        actions.appendChild(mobileBtn);
      } else {
        actions.appendChild(toggle);
        navbar.appendChild(actions);
      }
    } else {
      actions.insertBefore(toggle, actions.firstChild);
    }
  }

  updateToggleButton(toggle, getTheme());

  if (toggle.dataset.lasalThemeBound === 'true') return;
  toggle.dataset.lasalThemeBound = 'true';

  toggle.addEventListener('click', () => {
    const next = getTheme() === 'dark' ? 'light' : 'dark';
    setTheme(next);
    updateToggleButton(toggle, next);
  });
}

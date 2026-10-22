/** Runs in <head> before paint ? keeps theme in sync with localStorage / system preference. */
(function () {
  var key = 'lasal-theme';
  var stored = localStorage.getItem(key);
  var theme =
    stored === 'dark' || stored === 'light'
      ? stored
      : window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
  document.documentElement.setAttribute('data-theme', theme);
})();

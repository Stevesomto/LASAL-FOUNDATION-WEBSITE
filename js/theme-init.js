/** Runs in <head> before paint: keeps theme in sync with localStorage / system preference. */
(function () {
  var key = 'lasal-theme';
  var stored = localStorage.getItem(key);
  var theme = stored === 'dark' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', theme);
})();

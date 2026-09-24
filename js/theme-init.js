(function () {
  try {
    if (localStorage.getItem('mp-theme') === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  } catch (error) {}
})();

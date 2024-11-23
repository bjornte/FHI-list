function setTheme() {
  const gridDiv = document.querySelector('#myGrid');
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-bs-theme', 'dark');
    gridDiv.classList.add('ag-theme-quartz-dark');
    gridDiv.classList.remove('ag-theme-quartz');
  } else {
    document.documentElement.setAttribute('data-bs-theme', 'light');
    gridDiv.classList.add('ag-theme-quartz');
    gridDiv.classList.remove('ag-theme-quartz-dark');
  }
}
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  setTheme()
});
setTheme();
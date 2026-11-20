(() => {
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const stored = localStorage.getItem('lucy-theme');
  if (stored) root.setAttribute('data-bs-theme', stored);
  document.querySelectorAll('[data-lucy-version]').forEach(el => el.textContent = window.LUCY_SITE.version);
  document.querySelectorAll('[data-lucy-series]').forEach(el => el.textContent = window.LUCY_SITE.series);
  document.querySelectorAll('[data-lucy-paw-version]').forEach(el => el.textContent = window.LUCY_SITE.pawVersion);
  const updateThemeIcon = () => {
    const dark = root.getAttribute('data-bs-theme') === 'dark';
    if (themeToggle) themeToggle.innerHTML = `<i class="bi bi-${dark ? 'sun' : 'moon-stars'}"></i>`;
  };
  updateThemeIcon();
  themeToggle?.addEventListener('click', () => {
    const next = root.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-bs-theme', next); localStorage.setItem('lucy-theme', next); updateThemeIcon();
  });
  document.querySelectorAll('.code-tab').forEach(tab => tab.addEventListener('click', () => {
    document.querySelectorAll('.code-tab').forEach(x => x.classList.remove('active'));
    document.querySelectorAll('.code-example').forEach(x => x.classList.remove('active'));
    tab.classList.add('active'); document.getElementById(tab.dataset.example)?.classList.add('active');
  }));
  document.querySelector('.copy-code')?.addEventListener('click', async () => {
    const active = document.querySelector('.code-example.active'); if (!active) return;
    try { await navigator.clipboard.writeText(active.innerText); const b=document.querySelector('.copy-code'); b.innerHTML='<i class="bi bi-check2"></i>'; setTimeout(()=>b.innerHTML='<i class="bi bi-copy"></i>',1200); } catch (_) {}
  });
  document.getElementById('year').textContent = new Date().getFullYear();
})();

/* docs.js — Sidebar navigation, search filter, active section highlight */

(() => {
  const sidebar = document.getElementById('docsSidebar');
  const tocToggle = document.getElementById('tocToggle');
  const searchInput = document.getElementById('docsSearch');
  const navLinks = Array.from(document.querySelectorAll('.docs-nav-group a'));
  const sections = Array.from(document.querySelectorAll('.docs-section'));

  /* ---------- Mobile sidebar toggle ---------- */
  tocToggle?.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });

  // Close sidebar when a link is clicked (mobile)
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.matchMedia('(max-width: 991px)').matches) {
        sidebar.classList.remove('open');
      }
    });
  });

  // Close sidebar when clicking outside (mobile)
  document.addEventListener('click', (e) => {
    if (!window.matchMedia('(max-width: 991px)').matches) return;
    if (!sidebar.classList.contains('open')) return;
    if (sidebar.contains(e.target) || tocToggle.contains(e.target)) return;
    sidebar.classList.remove('open');
  });

  /* ---------- Active section highlight (scroll spy) ---------- */
  const setActiveLink = (id) => {
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + id);
    });
  };

  const observer = new IntersectionObserver((entries) => {
    // Pick the entry closest to the top that is intersecting
    const visible = entries
      .filter(e => e.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
    if (visible.length) {
      setActiveLink(visible[0].target.id);
    }
  }, {
    rootMargin: '-90px 0px -70% 0px',
    threshold: 0
  });

  sections.forEach(sec => observer.observe(sec));

  /* ---------- Search filter ---------- */
  searchInput?.addEventListener('input', () => {
    const q = searchInput.value.trim().toLowerCase();

    if (!q) {
      navLinks.forEach(l => l.classList.remove('hidden'));
      document.querySelectorAll('.docs-nav-group').forEach(g => g.style.display = '');
      return;
    }

    navLinks.forEach(link => {
      const text = (link.textContent + ' ' + link.getAttribute('href')).toLowerCase();
      link.classList.toggle('hidden', !text.includes(q));
    });

    // Hide groups with no visible links
    document.querySelectorAll('.docs-nav-group').forEach(group => {
      const hasVisible = group.querySelector('a:not(.hidden)');
      group.style.display = hasVisible ? '' : 'none';
    });
  });


  /* Reading progress and quick return */
  const progress = document.getElementById('docsReadingProgress');
  const topButton = document.createElement('button');
  topButton.className = 'docs-back-top';
  topButton.type = 'button';
  topButton.setAttribute('aria-label', 'Back to top');
  topButton.innerHTML = '<i class="bi bi-arrow-up"></i>';
  document.body.appendChild(topButton);
  topButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const value = max > 0 ? Math.min(100, Math.max(0, window.scrollY / max * 100)) : 0;
    if (progress) progress.style.width = value + '%';
    topButton.classList.toggle('visible', window.scrollY > 420);
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  /* ---------- Smooth scroll offset for fixed navbar ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
      history.replaceState(null, '', '#' + targetId);
    });
  });
})();
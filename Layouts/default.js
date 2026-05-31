(() => {
  const DEFAULT_PATH = 'default.html';
  const THEME_KEY = 'etrb_launch_theme';
  const SESSION_KEY = 'etrb_auth';
  const icons = {
    light: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"/></svg>',
    dark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
  };

  function preferredTheme() {
    return localStorage.getItem(THEME_KEY) || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const icon = document.querySelector('#theme-toggle .theme-toggle-icon');
    if (icon) icon.innerHTML = icons[theme];
  }

  function updateMemberState() {
    const isLoggedIn = sessionStorage.getItem(SESSION_KEY) === '1';
    const icon = document.getElementById('member-lock-icon');
    if (icon) icon.classList.toggle('unlocked', isLoggedIn);
    document.querySelectorAll('.member-only').forEach(el => el.classList.toggle('is-visible', isLoggedIn));
  }

  function wireNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'home.html';
    document.querySelectorAll('.site-nav [data-page]').forEach(link => {
      link.classList.toggle('active', link.dataset.page === currentPage);
    });

    const btn = document.getElementById('theme-toggle');
    if (btn) {
      applyTheme(preferredTheme());
      btn.addEventListener('click', () => {
        const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        localStorage.setItem(THEME_KEY, next);
        applyTheme(next);
      });
    }

    document.querySelectorAll('[data-site-logout]').forEach(button => {
      button.addEventListener('click', () => {
        sessionStorage.removeItem(SESSION_KEY);
        if (typeof window.logout === 'function') window.logout();
        else location.reload();
      });
    });

    updateMemberState();
  }

  async function loadDefaultShell() {
    try {
      const response = await fetch(DEFAULT_PATH, { cache: 'no-cache' });
      if (!response.ok) throw new Error(`Unable to load ${DEFAULT_PATH}: ${response.status}`);
      const markup = await response.text();
      const doc = new DOMParser().parseFromString(markup, 'text/html');

      const fonts = doc.getElementById('site-fonts');
      if (fonts && !document.querySelector('link[href*="Space+Grotesk"]')) {
        document.head.append(fonts.content.cloneNode(true));
      }

      const theme = doc.getElementById('site-theme');
      if (theme && !document.getElementById('default-site-theme')) {
        document.head.append(theme.content.cloneNode(true));
      }

      const navMount = document.getElementById('site-nav');
      const navTemplate = doc.getElementById('site-nav-template');
      if (navMount && navTemplate) {
        navMount.replaceWith(navTemplate.content.cloneNode(true));
      }

      wireNav();
    } catch (error) {
      console.error(error);
      applyTheme(preferredTheme());
    }
  }

  applyTheme(preferredTheme());
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadDefaultShell, { once: true });
  } else {
    loadDefaultShell();
  }
})();

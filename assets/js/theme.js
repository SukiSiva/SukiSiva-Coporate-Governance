/**
 * GOVERNORA - Theme & Accessibility Management
 * Light/Dark Switcher & RTL Director with LocalStorage persistence
 */

(function () {
  'use strict';

  const STORAGE_THEME = 'governora_theme';
  const STORAGE_RTL = 'governora_rtl';

  // Initialize theme
  function initTheme() {
    const savedTheme = localStorage.getItem(STORAGE_THEME);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const activeTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    applyTheme(activeTheme);
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-bs-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem(STORAGE_THEME, theme);
    updateThemeIcons(theme);
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-bs-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
  }

  function updateThemeIcons(theme) {
    const themeBtns = document.querySelectorAll('.theme-toggle-btn');
    themeBtns.forEach(btn => {
      if (theme === 'dark') {
        btn.innerHTML = '<i class="bi bi-moon-stars"></i>';
        btn.setAttribute('title', 'Dark mode active - click to switch to light mode');
        btn.setAttribute('aria-label', 'Switch to light mode');
      } else {
        btn.innerHTML = '<i class="bi bi-sun"></i>';
        btn.setAttribute('title', 'Light mode active - click to switch to dark mode');
        btn.setAttribute('aria-label', 'Switch to dark mode');
      }
    });
  }

  // Initialize RTL / LTR direction
  function initRTL() {
    const savedRTL = localStorage.getItem(STORAGE_RTL);
    if (savedRTL === 'rtl') {
      applyRTL(true);
    } else {
      // Default explicitly to LTR mode
      applyRTL(false);
    }
  }

  function applyRTL(isRTL) {
    if (isRTL) {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', 'ar');
      if (document.body) document.body.setAttribute('dir', 'rtl');
      localStorage.setItem(STORAGE_RTL, 'rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('lang', 'en');
      if (document.body) document.body.setAttribute('dir', 'ltr');
      localStorage.setItem(STORAGE_RTL, 'ltr');
    }
    updateRTLButtons(isRTL);
    window.dispatchEvent(new CustomEvent('governoradirectionchange', { detail: { dir: isRTL ? 'rtl' : 'ltr' } }));
  }

  function toggleRTL() {
    const isCurrentlyRTL = document.documentElement.getAttribute('dir') === 'rtl';
    applyRTL(!isCurrentlyRTL);
  }

  function updateRTLButtons(isRTL) {
    const rtlBtns = document.querySelectorAll('.rtl-toggle-btn');
    rtlBtns.forEach(btn => {
      btn.setAttribute('aria-pressed', isRTL ? 'true' : 'false');
      if (isRTL) {
        btn.setAttribute('title', 'Switch to LTR Mode (Left-to-Right)');
        btn.setAttribute('aria-label', 'Switch to LTR Mode');
        btn.innerHTML = '<span class="dir-badge">LTR</span>';
      } else {
        btn.setAttribute('title', 'Switch to RTL Mode (Right-to-Left)');
        btn.setAttribute('aria-label', 'Switch to RTL Mode');
        btn.innerHTML = '<span class="dir-badge">RTL</span>';
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initRTL();

    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleTheme();
      });
    });

    document.querySelectorAll('.rtl-toggle-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleRTL();
      });
    });
  });

  window.GovernoraTheme = {
    toggleTheme,
    applyTheme,
    toggleRTL,
    applyRTL
  };
})();

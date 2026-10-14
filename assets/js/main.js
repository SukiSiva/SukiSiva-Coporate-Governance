/**
 * GOVERNORA - Core JavaScript Interactions (main.js)
 * Sticky header, back-to-top, cookie consent, accordion states, counter animation
 */

(function () {
  'use strict';

  // 1. Sticky Navbar on Scroll
  function initStickyNavbar() {
    const navbar = document.querySelector('.gov-navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // 2. Back-to-Top Button
  function initBackToTop() {
    const backBtn = document.querySelector('.gov-back-to-top');
    if (!backBtn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 350) {
        backBtn.classList.add('visible');
      } else {
        backBtn.classList.remove('visible');
      }
    });

    backBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 3. Scroll Reveal Animation Observer
  function initScrollReveal() {
    // Automatically attach reveal classes to content sections, cards, and key headers below the hero
    const autoTargets = document.querySelectorAll('main > section:not(.hero-wrapper):not(:first-of-type) .container > .row > [class*="col-"], .gov-card, .section-title, .section-subtitle, .gold-divider:not(.hero-wrapper .gold-divider)');
    autoTargets.forEach((el, index) => {
      // Don't hide navbar, breadcrumbs, or hero components
      if (el.closest('.gov-navbar') || el.closest('.hero-wrapper') || el.closest('header')) return;
      if (!el.classList.contains('gov-reveal') && !el.classList.contains('gov-reveal-left') && !el.classList.contains('gov-reveal-right') && !el.classList.contains('gov-reveal-scale')) {
        el.classList.add('gov-reveal');
        // Add subtle stagger delays for grid siblings
        const delay = (index % 4) + 1;
        el.classList.add('gov-delay-' + delay);
      }
    });

    const revealElements = document.querySelectorAll('.gov-reveal, .gov-reveal-left, .gov-reveal-right, .gov-reveal-scale');
    if (revealElements.length === 0) return;

    if (!('IntersectionObserver' in window)) {
      revealElements.forEach(el => el.classList.add('is-revealed'));
      return;
    }

    const isMobile = window.innerWidth < 768;
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: isMobile ? '0px 0px -10px 0px' : '0px 0px -40px 0px',
      threshold: isMobile ? 0.02 : 0.08
    });

    revealElements.forEach(el => observer.observe(el));
  }

  // 4. Counter Animation for Statistics
  function initCounters() {
    const counters = document.querySelectorAll('.gov-stat-number[data-target]');
    if (counters.length === 0) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.getAttribute('data-target')) || 0;
          const prefix = el.getAttribute('data-prefix') || '';
          const suffix = el.getAttribute('data-suffix') || '';
          const duration = 1600;
          const start = 0;
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out quad
            const easeOut = 1 - (1 - progress) * (1 - progress);
            const current = Math.floor(start + (target - start) * easeOut);
            el.textContent = prefix + current + suffix;

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              el.textContent = prefix + target + suffix;
            }
          }

          requestAnimationFrame(updateCounter);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.2 });

    counters.forEach(counter => observer.observe(counter));
  }

  // 5. Configurable Countdown Timer (Coming Soon page)
  function initCountdown() {
    const countdownEl = document.querySelector('[data-countdown]');
    if (!countdownEl) return;

    const targetDateStr = countdownEl.getAttribute('data-countdown') || '2026-12-31T23:59:59';
    const targetDate = new Date(targetDateStr).getTime();

    const daysEl = countdownEl.querySelector('.timer-days');
    const hoursEl = countdownEl.querySelector('.timer-hours');
    const minsEl = countdownEl.querySelector('.timer-mins');
    const secsEl = countdownEl.querySelector('.timer-secs');

    function update() {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        countdownEl.innerHTML = '<div class="alert alert-info">Template Launch Complete!</div>';
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((distance % (1000 * 60)) / 1000);

      if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
      if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
      if (minsEl) minsEl.textContent = String(mins).padStart(2, '0');
      if (secsEl) secsEl.textContent = String(secs).padStart(2, '0');
    }

    update();
    setInterval(update, 1000);
  }

  // 6. Mobile Navbar Enhancements (Auto close drawer on outside click or nav item click)
  function initMobileNav() {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (!navbarCollapse) return;

    const navLinks = navbarCollapse.querySelectorAll('.nav-link:not(.dropdown-toggle), .dropdown-item');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 992 && navbarCollapse.classList.contains('show')) {
          const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
          if (bsCollapse) bsCollapse.hide();
        }
      });
    });
  }

  // 7. Smooth Cross-Page Navigation Transitions
  function initPageTransitions() {
    // Intercept internal page navigation links
    const internalLinks = document.querySelectorAll('a[href]:not([href^="#"]):not([href^="mailto:"]):not([href^="tel:"]):not([target="_blank"])');
    internalLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        // Ignore empty or hash only or javascript links
        if (!href || href === '#' || href.startsWith('javascript:')) return;
        // Check if destination is internal HTML page
        const isInternal = !href.includes('://') || href.startsWith(window.location.origin);
        if (!isInternal) return;

        // If modifier keys are held, let default browser behavior happen
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

        e.preventDefault();
        document.body.classList.add('gov-page-exiting');

        setTimeout(() => {
          window.location.href = href;
        }, 180);
      });
    });

    // In case user clicks back/forward button in browser cache (bfcache)
    window.addEventListener('pageshow', (event) => {
      if (event.persisted) {
        document.body.classList.remove('gov-page-exiting');
      }
    });
  }

  // 8. Contact Page Interactive Map Switcher
  function initContactMapSwitch() {
    const mapFrame = document.querySelector('#contactMapIframe');
    const buttons = document.querySelectorAll('[data-map-location]');
    if (!mapFrame || !buttons.length) return;

    const locations = {
      newyork: {
        title: "Global Headquarters • Financial District",
        address: "100 Wall Street, 24th Floor, New York, NY 10005, United States",
        transit: "Transit: Subway 2, 3 (Wall St) • J, Z (Broad St) • 4, 5 (Wall St)",
        src: "https://maps.google.com/maps?q=100+Wall+Street,+New+York,+NY+10005&t=&z=16&ie=UTF8&iwloc=&output=embed",
        glink: "https://maps.google.com/?q=100+Wall+Street,+New+York,+NY+10005"
      },
      london: {
        title: "London Chambers • City of London",
        address: "30 St Mary Axe, 18th Floor, London EC3A 8EP, United Kingdom",
        transit: "Transit: Underground Aldgate (Circle/Metropolitan) • Liverpool St (Central/Elizabeth Line)",
        src: "https://maps.google.com/maps?q=30+St+Mary+Axe,+London+EC3A+8EP,+UK&t=&z=16&ie=UTF8&iwloc=&output=embed",
        glink: "https://maps.google.com/?q=30+St+Mary+Axe,+London+EC3A+8EP"
      },
      singapore: {
        title: "Singapore Desk • Marina Bay Financial Centre",
        address: "Marina Bay Financial Centre, Tower 1, Singapore 018981",
        transit: "Transit: MRT Downtown (DT17) • Raffles Place (NS26/EW14)",
        src: "https://maps.google.com/maps?q=Marina+Bay+Financial+Centre+Tower+1,+Singapore+018981&t=&z=16&ie=UTF8&iwloc=&output=embed",
        glink: "https://maps.google.com/?q=Marina+Bay+Financial+Centre+Tower+1,+Singapore"
      }
    };

    buttons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        buttons.forEach(b => {
          b.classList.remove('active', 'btn-gov-primary');
          b.classList.add('btn-gov-outline');
        });

        btn.classList.add('active', 'btn-gov-primary');
        btn.classList.remove('btn-gov-outline');

        const key = btn.getAttribute('data-map-location');
        const loc = locations[key];
        if (loc) {
          mapFrame.src = loc.src;
          const titleEl = document.querySelector('#mapAddressTitle');
          const addrEl = document.querySelector('#mapAddressText');
          const transitEl = document.querySelector('#mapTransitText');
          const linkEl = document.querySelector('#mapDirectionsLink');

          if (titleEl) titleEl.textContent = loc.title;
          if (addrEl) addrEl.textContent = loc.address;
          if (transitEl) transitEl.innerHTML = '<i class="bi bi-train-front me-1 text-warning"></i> ' + loc.transit;
          if (linkEl) linkEl.href = loc.glink;
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initStickyNavbar();
    initBackToTop();
    initScrollReveal();
    initCounters();
    initCountdown();
    initMobileNav();
    initPageTransitions();
    initContactMapSwitch();
  });
})();

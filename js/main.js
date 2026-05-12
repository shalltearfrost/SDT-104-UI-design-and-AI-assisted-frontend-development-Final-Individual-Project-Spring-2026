(() => {
  'use strict';

  const $  = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => root.querySelectorAll(selector);


  // Highlights the nav link that matches the current page.
  const markActiveNavLink = () => {
    const current = window.location.pathname.split('/').pop() || 'index.html';

    $$('[data-nav-link]').forEach(link => {
      const target = link.getAttribute('data-nav-link');
      const isActive = target === current || (target === 'index.html' && current === '');

      if (link.classList.contains('nav__link')) {
        link.classList.toggle('nav__link--active', isActive);
      } else if (link.classList.contains('nav__mobile-link')) {
        link.classList.toggle('nav__mobile-link--active', isActive);
      }
    });
  };


  // Mobile menu toggle and burger/close icon swap.
  const initMobileMenu = () => {
    const toggle    = $('[data-mobile-toggle]');
    const menu      = $('[data-mobile-menu]');
    const iconOpen  = $('[data-icon-menu]');
    const iconClose = $('[data-icon-close]');

    if (!toggle || !menu) return;

    const setOpen = (open) => {
      menu.classList.toggle('is-open', open);
      if (iconOpen)  iconOpen.style.display  = open ? 'none' : '';
      if (iconClose) iconClose.style.display = open ? ''     : 'none';
      toggle.setAttribute('aria-expanded', String(open));
    };

    toggle.addEventListener('click', () => {
      setOpen(!menu.classList.contains('is-open'));
    });

    // Close the menu after the user taps any link.
    $$('a', menu).forEach(link => {
      link.addEventListener('click', () => setOpen(false));
    });
  };


  // Floating back-to-top button: appears after half a viewport of scroll.
  const initBackToTop = () => {
    const btn = $('[data-back-to-top]');
    if (!btn) return;

    const update = () => {
      const visible = window.scrollY > window.innerHeight * 0.5;
      btn.classList.toggle('is-visible', visible);
    };

    window.addEventListener('scroll', update, { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    update();
  };


  // Reveal-on-scroll animation via IntersectionObserver.
  const initScrollReveal = () => {
    const items = $$('.reveal');
    if (!items.length) return;

    if (!('IntersectionObserver' in window)) {
      items.forEach(el => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });

    items.forEach(el => observer.observe(el));
  };


  // Writes the current year into the footer.
  const setFooterYear = () => {
    const el = $('[data-current-year]');
    if (el) el.textContent = String(new Date().getFullYear());
  };


  document.addEventListener('DOMContentLoaded', () => {
    markActiveNavLink();
    initMobileMenu();
    initBackToTop();
    initScrollReveal();
    setFooterYear();
  });
})();

(() => {
  'use strict';

  // Sets the panel height so the CSS transition can animate.
  const setPanelHeight = (item) => {
    const panel = item.querySelector('.faq__panel');
    if (!panel) return;
    panel.style.maxHeight = `${panel.scrollHeight}px`;
  };

  const closeAll = (items) => {
    items.forEach(item => {
      item.classList.remove('is-open');
      const panel = item.querySelector('.faq__panel');
      if (panel) panel.style.maxHeight = '0px';
    });
  };

  const initFaq = () => {
    const items = document.querySelectorAll('[data-faq]');
    if (!items.length) return;

    // Open the first item by default.
    items[0].classList.add('is-open');
    setPanelHeight(items[0]);

    items.forEach(item => {
      const btn = item.querySelector('.faq__btn');
      if (!btn) return;

      btn.addEventListener('click', () => {
        const wasOpen = item.classList.contains('is-open');
        closeAll(items);

        if (!wasOpen) {
          item.classList.add('is-open');
          setPanelHeight(item);
        }
      });
    });
  };

  document.addEventListener('DOMContentLoaded', initFaq);
})();

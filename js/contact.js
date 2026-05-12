(() => {
  'use strict';

  const handleSubmit = (form) => (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = new FormData(form);
    const payload = {
      name:    data.get('name'),
      email:   data.get('email'),
      subject: data.get('subject'),
      message: data.get('message'),
    };

    console.info('Contact payload:', payload);
    alert(`Thank you for your message, ${payload.name}! I will get back to you soon.`);

    form.reset();
  };

  document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('[data-contact-form]');
    if (!form) return;
    form.addEventListener('submit', handleSubmit(form));
  });
})();

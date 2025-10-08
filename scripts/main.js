document.addEventListener('DOMContentLoaded', () => {
  const burgerButton = document.querySelector('.burger');
  const nav = document.getElementById('site-nav');

  if (burgerButton && nav) {
    burgerButton.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      burgerButton.setAttribute('aria-expanded', String(isOpen));
      burgerButton.classList.toggle('open', isOpen);
    });
  }

  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // Modal functionality
  const modal = document.getElementById('technical-modal');
  const openBtn = document.getElementById('technical-elin');
  
  if (modal && openBtn) {
    const closeModal = () => {
      modal.setAttribute('hidden', '');
      document.body.classList.remove('modal-open');
    };

    openBtn.addEventListener('click', () => {
      modal.removeAttribute('hidden');
      document.body.classList.add('modal-open');
    });

    modal.querySelector('.modal-close')?.addEventListener('click', closeModal);
    modal.querySelector('.modal-overlay')?.addEventListener('click', closeModal);
    modal.addEventListener('keydown', (e) => e.key === 'Escape' && closeModal());
  }
});

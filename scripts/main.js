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
});




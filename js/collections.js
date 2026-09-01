/* Collections page interaction: compact mobile navigation only; the page remains deliberately editorial and browse-led. */
const menuToggle = document.querySelector('.collection-menu');
const mobileMenu = document.querySelector('.collection-mobile-menu');
if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    const open = menuToggle.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(open));
    mobileMenu.classList.toggle('is-open', open);
    mobileMenu.setAttribute('aria-hidden', String(!open));
  });
  mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    menuToggle.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('is-open');
    mobileMenu.setAttribute('aria-hidden', 'true');
  }));
}
const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

const catalogueFilters = document.querySelectorAll('[data-collection-filter]');
const catalogueCards = document.querySelectorAll('[data-catalogue-card]');
catalogueFilters.forEach((filter) => filter.addEventListener('click', () => {
  const category = filter.dataset.collectionFilter;
  catalogueFilters.forEach((item) => item.classList.toggle('is-active', item === filter));
  catalogueCards.forEach((card) => {
    const visible = category === 'all' || card.dataset.category?.split(' ').includes(category);
    card.hidden = !visible;
  });
}));

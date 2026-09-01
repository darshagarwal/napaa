/* Napaa Corporate Atelier interactions: direct, considered and accessible. */
const header = document.querySelector('#site-header');
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');
const dialog = document.querySelector('#brief-dialog');
const form = document.querySelector('#brief-form');
const feedback = document.querySelector('#form-feedback');

const syncHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 18);
window.addEventListener('scroll', syncHeader, { passive: true });
syncHeader();

const closeMenu = () => {
  mobileMenu.classList.remove('is-open');
  mobileMenu.setAttribute('aria-hidden', 'true');
  menuToggle.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
};
menuToggle.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('is-open');
  mobileMenu.setAttribute('aria-hidden', String(!isOpen));
  menuToggle.classList.toggle('is-open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

document.querySelectorAll('[data-open-brief]').forEach((button) => button.addEventListener('click', () => {
  closeMenu();
  dialog.showModal();
  window.setTimeout(() => document.querySelector('#company').focus(), 100);
}));
document.querySelectorAll('[data-close-brief]').forEach((button) => button.addEventListener('click', () => dialog.close()));
dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const subject = encodeURIComponent(`Napaa project brief — ${data.get('need')}`);
  const body = encodeURIComponent(`Hello Napaa Gifting,\n\nI would like to discuss: ${data.get('need')}.\n\nCompany / name: ${data.get('company')}\n\nProject details:\n${data.get('details') || 'I would love to discuss the right gifting direction.'}\n\nThank you.`);
  feedback.textContent = 'Your email brief is ready. Opening your email app…';
  window.setTimeout(() => { window.location.href = `mailto:napaagifting@gmail.com?subject=${subject}&body=${body}`; }, 180);
});

document.querySelector('#year').textContent = new Date().getFullYear();
const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
}), { threshold: .14 });
document.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element));

const catalogueFilters = document.querySelectorAll('[data-filter]');
const catalogueCards = document.querySelectorAll('[data-category]');
catalogueFilters.forEach((filter) => filter.addEventListener('click', () => {
  const selectedCategory = filter.dataset.filter;
  catalogueFilters.forEach((button) => button.classList.toggle('is-active', button === filter));
  catalogueCards.forEach((card) => {
    const categories = card.dataset.category.split(' ');
    card.classList.toggle('is-hidden', selectedCategory !== 'all' && !categories.includes(selectedCategory));
  });
}));

const serviceCards = document.querySelectorAll('[data-service-card]');
let serviceResetTimer;
const resetServiceCards = () => {
  window.clearTimeout(serviceResetTimer);
  serviceCards.forEach((card) => {
    card.classList.remove('is-flipped');
    card.setAttribute('aria-pressed', 'false');
  });
};
const scheduleServiceReset = () => {
  window.clearTimeout(serviceResetTimer);
  serviceResetTimer = window.setTimeout(resetServiceCards, 10000);
};
const flipServiceCard = (selectedCard) => {
  const shouldFlip = !selectedCard.classList.contains('is-flipped');
  resetServiceCards();
  if (shouldFlip) {
    selectedCard.classList.add('is-flipped');
    selectedCard.setAttribute('aria-pressed', 'true');
    scheduleServiceReset();
  }
};
serviceCards.forEach((card) => card.addEventListener('click', () => flipServiceCard(card)));
document.addEventListener('pointerdown', (event) => {
  if (!event.target.closest('[data-service-card]')) resetServiceCards();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') resetServiceCards();
});

const createVisualSelector = (optionSelector, backgroundSelector) => {
  const options = document.querySelectorAll(optionSelector);
  const background = document.querySelector(backgroundSelector);
  const layers = background?.querySelectorAll('.selector-background__image');
  const activate = (selectedOption) => {
    options.forEach((option) => option.classList.toggle('is-active', option === selectedOption));
    if (!layers?.length || !selectedOption.dataset.image) return;
    const current = background?.dataset.currentImage;
    if (current === selectedOption.dataset.image) return;
    const activeLayer = background.querySelector('.selector-background__image.is-visible');
    const incomingLayer = Array.from(layers).find((layer) => layer !== activeLayer);
    if (!incomingLayer) return;
    incomingLayer.style.backgroundImage = `url("${selectedOption.dataset.image}")`;
    incomingLayer.classList.add('is-visible');
    activeLayer?.classList.remove('is-visible');
    background.dataset.currentImage = selectedOption.dataset.image;
  };
  options.forEach((option) => {
    option.addEventListener('click', () => activate(option));
    option.addEventListener('mouseenter', () => {
      if (window.matchMedia('(hover: hover)').matches) activate(option);
    });
  });
};

createVisualSelector('[data-corporate-option]', '#corporate .selector-background');
createVisualSelector('[data-occasion-option]', '#occasions .selector-background');

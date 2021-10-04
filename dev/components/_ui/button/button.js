// anchor button handler
document.querySelectorAll('.js-anchor').forEach(el => el.addEventListener('click', e => {
  e.preventDefault();

  const { target } = el.dataset;

  scrollTo({
    top: document.querySelector('.' + target).getBoundingClientRect().top + window.pageYOffset - document.querySelector('.header').offsetHeight,
    behavior: 'smooth'
  });
}));
// scroll to tutor section
Array.from(document.querySelectorAll('.tutor__nav-link')).map(el => el.addEventListener('click', () => {
  const target = el.dataset.target;

  scrollTo({
    top: document.querySelector(`[data-block="${target}"]`).getBoundingClientRect().top + window.pageYOffset - document.querySelector('.header').offsetHeight,
    behavior: 'smooth'
  });
}));
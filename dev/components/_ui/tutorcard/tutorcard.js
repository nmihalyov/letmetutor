Array.from(document.querySelectorAll('.js-tutorcard-more')).map(el => el.addEventListener('click', () => {
  el.style.display = 'none';

  Array.from(el.closest('.tutorcard__subjects').querySelectorAll('.tutorcard__subjects-item--hidden')).map(el => {
    el.classList.remove('tutorcard__subjects-item--hidden');
  });
}));
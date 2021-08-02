// show hiddne subject in tutorcard
document.addEventListener('click', e => {
  const $target = e.target;

  if ($target.classList.contains('js-tutorcard-more')) {
    $target.style.display = 'none';
    
    Array.from($target.closest('.tutorcard__subjects').querySelectorAll('.tutorcard__subjects-item--hidden')).map(el => {
      el.classList.remove('tutorcard__subjects-item--hidden');
    });
  }
});
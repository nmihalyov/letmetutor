// show checkbox hint
Array.from(document.querySelectorAll('.checkbox__hint')).map(el => el.addEventListener('click', e => {
  e.preventDefault();
  
  if (!e.target.closest('.checkbox__hint-container')) {
    el.querySelector('.checkbox__hint-container').classList.toggle('checkbox__hint-container--shown')
  }
}));

// hide checkbox hint
document.addEventListener('click', e => {
  const $hintShownContainer = document.querySelector('.checkbox__hint-container--shown');

  if ((!e.target.closest('.checkbox__hint') || e.target.closest('.checkbox__hint-close')) && $hintShownContainer) {
    $hintShownContainer.classList.remove('checkbox__hint-container--shown');
  }
});
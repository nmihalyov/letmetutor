// accordion logic
Array.from(document.querySelectorAll('.accordion__item-title')).map(el => el.addEventListener('click', () => {
  const $activeItem = el.closest('.accordion').querySelector('.accordion__item--active');
  const $currentItem = el.closest('.accordion__item');

  if ($currentItem.classList.contains('accordion__item--active')) {
    $currentItem.classList.remove('accordion__item--active');
  } else {
    if ($activeItem) {
      $activeItem.classList.remove('accordion__item--active');
    }
  
    $currentItem.classList.add('accordion__item--active');
  }
}));
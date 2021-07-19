Array.from(document.querySelectorAll('.checkboxselect__list')).map(el => {
  el.addEventListener('click', e => {
    e.stopPropagation();
  
    const $dropdown = el.closest('.checkboxselect__list');
    const $checkboxSelect = el.closest('.checkboxselect');
    let checked = false;

    $checkboxSelect.classList.remove('checkboxselect--error');

    Array.from($dropdown.querySelectorAll('.checkbox__input')).map(checkbox => {
      if (checkbox.checked) checked = true;
    });
  
    if (checked) {
      $checkboxSelect.classList.add('checkboxselect--checked');
    } else {
      $checkboxSelect.classList.remove('checkboxselect--checked');
    }
  });

  el.fakeScroll();
});
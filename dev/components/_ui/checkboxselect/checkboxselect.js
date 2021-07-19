Array.from(document.querySelectorAll('.checkboxselect__list')).map(list => {
  list.addEventListener('click', e => {
    e.stopPropagation();
  
    const $checkboxSelect = list.closest('.checkboxselect');
    let checked = false;

    $checkboxSelect.classList.remove('checkboxselect--error');

    Array.from(list.querySelectorAll('.checkbox__input')).map(checkbox => {
      const $placeholder = $checkboxSelect.querySelector('.checkboxselect__input-placeholder');

      if (checkbox.checked) checked = true;

      checkbox.addEventListener('click', () => {
        let value = '';

        Array.from(list.querySelectorAll('input:checked')).map(item => {
          value += item.closest('.checkboxselect__item').querySelector('.checkbox__text').innerText + ', ';
        });

        if (value) {
          $placeholder.innerText = value.substring(0, value.length - 2);
          $placeholder.classList.add('checkboxselect__input-placeholder--active');
        } else {
          $placeholder.innerText = $placeholder.dataset.placeholder;
          $placeholder.classList.remove('checkboxselect__input-placeholder--active');
        }
      });
    });
  
    if (checked) {
      $checkboxSelect.classList.add('checkboxselect--checked');
    } else {
      $checkboxSelect.classList.remove('checkboxselect--checked');
    }
  });

  list.fakeScroll();
});
const changeCountryEvent = new Event('changeCountry');

const updateMask = (input, mask) => {
  Inputmask({mask}).mask(input);
};

// Open input dropdown
Array.from(document.querySelectorAll('.input.dropdown'))
.concat(Array.from(document.querySelectorAll('.input .dropdown')))
.map(el => el.addEventListener('click', () => {
  const $dropdown = el.querySelector('.dropdown__menu');
  el.closest('.input').querySelector('.input__dropdown').style.width = el.closest('.input').getBoundingClientRect().width + 'px';

  if (!$dropdown.classList.contains('fakeScroll')) {
    $dropdown.fakeScroll();
  }
}));

// Change phone code on input dropdown
Array.from(document.querySelectorAll('.input__dropdown-item[data-code-loc]')).map(el => el.addEventListener('click', () => {
  const loc = el.dataset.codeLoc;
  const mask = el.dataset.mask;
  const $input = el.closest('.input').querySelector('input');

  el.closest('.input__code').dataset.codeLoc = loc;
  el.closest('.input__code').dataset.mask = mask;
  $input.placeholder = mask.replaceAll('9', '_');
  updateMask($input, mask);
}));

// Change input dropdown value
document.addEventListener('click', e => {
  const $inputDropdownItem = e.target.closest('.input__dropdown-item[data-dropdown]');

  if ($inputDropdownItem) {
    const value = $inputDropdownItem.dataset.value || $inputDropdownItem.innerText;
    
    $inputDropdownItem.closest('.input').querySelector('input').value = value;
    $inputDropdownItem.closest('.input').classList.remove('input--error');
    
    if ($inputDropdownItem.closest('.input').classList.contains('js-auth-country')) {
      $inputDropdownItem.closest('.input').dispatchEvent(changeCountryEvent);
    }
  }
});

// Masking phone input
Array.from(document.querySelectorAll('input[type="tel"]')).map(el => {
  Inputmask({mask: el.closest('.input').querySelector('.input__code').dataset.mask}).mask(el);
});
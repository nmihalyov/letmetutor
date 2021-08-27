const $dropdowns = Array.from(document.querySelectorAll('.dropdown'));

// close dropdown on outer click
document.addEventListener('click', () => {
  if (document.querySelector('.dropdown--active')) {
    document.querySelector('.dropdown--active').classList.remove('dropdown--active');
  }
});


// open dropdown
document.addEventListener('click', e => {
  const $dropdown = e.target.closest('.dropdown');

  if ($dropdown) {
    if ($dropdown.classList.contains('input__code')) {
      e.preventDefault();
    }
  
    if (!$dropdown.classList.contains('dropdown--active')) {
      if (document.querySelector('.dropdown--active')) {
        document.querySelector('.dropdown--active').classList.remove('dropdown--active');
      }
      $dropdown.classList.toggle('dropdown--active');
    }
  }
});


// change dropdown value
document.addEventListener('click', e => {
  const $dropdownMenuItem = e.target.closest('.dropdown__menu-item');

  if ($dropdownMenuItem) {
    document.querySelector('.dropdown--active').classList.remove('dropdown--active');

    if ($dropdownMenuItem.getAttribute('data-toggle')) {
      const $this = e.target;
      const newValue = $this.innerText;
      const $hiddenItem = $this.closest('.dropdown__menu').querySelector('.dropdown__menu-item--hidden');
      const $dropdownValue = $this.closest('.dropdown').querySelector('.dropdown__value');

      if ($hiddenItem) {
        $hiddenItem.classList.remove('dropdown__menu-item--hidden');
      }

      $dropdownMenuItem.classList.add('dropdown__menu-item--hidden'); 
      $dropdownValue.innerText = newValue;
    }
  }
});
const $dropdowns = Array.from(document.querySelectorAll('.dropdown'));

// close dropdown on outer click
document.addEventListener('click', e => {
  const $this = e.target;

  $dropdowns.map(el => {
    if(el.closest('.dropdown') !== $this.closest('.dropdown')) {
      el.classList.remove('dropdown--active');
    }
  });
});

// open dropdown
$dropdowns.map(el => el.addEventListener('click', e => {
  if (el.classList.contains('input__code')) {
    e.preventDefault();
  }

  if (!el.classList.contains('dropdown--active')) {
    $dropdowns.map(el => el !== el && el.classList.remove('dropdown--active'));
    el.classList.toggle('dropdown--active');
  }
}));

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
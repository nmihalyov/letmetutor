const $dropdowns = Array.from(document.querySelectorAll('.dropdown'));

// close dropdown on outer click
document.addEventListener('click', e => {
  const $this = e.target;

  if(!$this.closest('.dropdown')) {
    $dropdowns.map(el => el.classList.remove('dropdown--active'));
  }
});

// open dropdown
$dropdowns.map(el => el.addEventListener('click', e => {
  e.preventDefault();
  const $this = e.currentTarget;

  if (!$this.classList.contains('dropdown--active')) {
    $dropdowns.map(el => el !== $this && el.classList.remove('dropdown--active'));
    $this.classList.toggle('dropdown--active');
  }
}));

// change dropdown value
document.addEventListener('click', e => {
  if (e.target.getAttribute('data-toggle')) {
    const $this = e.target;
    const newValue = $this.innerText;
    const $cloneElement = $this.cloneNode();
    const $dropdownValue = $this.closest('.dropdown').querySelector('.dropdown__value');
    
    $cloneElement.innerText = $dropdownValue.innerText;
    $dropdownValue.innerText = newValue;
    
    $this.parentNode.prepend($cloneElement);
    $this.parentNode.removeChild($this);
  }

  if (e.target.closest('.dropdown__menu-item')) {
    document.querySelector('.dropdown--active').classList.remove('dropdown--active');
  }
});
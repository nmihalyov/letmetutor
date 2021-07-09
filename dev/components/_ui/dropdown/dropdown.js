// close dropdown on outer click
document.addEventListener('click', e => {
  const $this = e.target;

  if(!$this.closest('.dropdown')) {
    Array.from(document.querySelectorAll('.dropdown')).map(el => el.classList.remove('dropdown--active'));
  }
});

// open dropdown
Array.from(document.querySelectorAll('.dropdown')).map(el => el.addEventListener('click', e => {
  const $this = e.currentTarget;
  
  Array.from(document.querySelectorAll('.dropdown')).map(el => el !== $this && el.classList.remove('dropdown--active'));
  $this.classList.toggle('dropdown--active');
}));

// change dropdown value
document.addEventListener('click', e => {
  if (e.target.getAttribute('data-toggle')) {
    console.log(true)
    const $this = e.target;
    const newValue = $this.innerText;
    const $cloneElement = $this.cloneNode();
    const $dropdownValue = $this.closest('.dropdown').querySelector('.dropdown__value');
    
    $cloneElement.innerText = $dropdownValue.innerText;
    $dropdownValue.innerText = newValue;
    
    $this.parentNode.prepend($cloneElement);
    $this.parentNode.removeChild($this);
  }
});
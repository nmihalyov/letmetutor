Array.from(document.querySelectorAll('.hero__dropdown-item')).map(el => el.addEventListener('click', e => {
  const $this = e.currentTarget;
  const value = $this.innerText;

  $this.closest('.hero__input').querySelector('.hero__input-field').value = value;
}));
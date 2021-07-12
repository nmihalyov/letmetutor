Array.from(document.querySelectorAll('.hero__dropdown-item')).map(el => el.addEventListener('click', e => {
  const $this = e.currentTarget;
  const value = $this.innerText;

  $this.closest('.hero__input').querySelector('.hero__input-field').value = value;
}));

Array.from(document.querySelectorAll('.hero__input-field')).map(el => {
  const $this = el;
  const $dropdown = $this.nextElementSibling;
  const handleInput = firstRender => {
    const options = JSON.parse($this.dataset.options);
    const lowerCaseValue = $this.value.toLowerCase();
    let matchesFound = false;
  
    $dropdown.innerHTML = '';
  
    options.map(el => {
      if (firstRender || el.toLowerCase().match(lowerCaseValue)) {
        matchesFound = true;
        $dropdown.insertAdjacentHTML('beforeend', `<a class="hero__dropdown-item dropdown__menu-item" href="javascript:void(0)">${el}</a>`)
      }
    });

    if (matchesFound) {
      $dropdown.classList.remove('hero__dropdown--hidden');
    } else {
      $dropdown.classList.add('hero__dropdown--hidden');
    }

    Array.from($dropdown.querySelectorAll('.hero__dropdown-item')).map(el => el.addEventListener('click', () => {
      $this.value = el.innerText;
      $this.setAttribute('data-value', el.innerText);
    }));
  };

  $this.addEventListener('input', () => handleInput(false))
  $this.addEventListener('focus', () => handleInput(true));
  $this.addEventListener('blur', () => {
    if ($this.value === '' || !$this.dataset.value) {
      $this.value = '';
    } else {
      $this.value = $this.dataset.value;
    }
  });
});
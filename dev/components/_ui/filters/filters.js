Array.from(document.querySelectorAll('.filters__dropdown-item')).map(el => el.addEventListener('click', e => {
  const $this = e.currentTarget;
  const value = $this.innerText;

  $this.closest('.filters__input').querySelector('.filters__input-field').value = value;
}));

Array.from(document.querySelectorAll('.filters__input-field')).map(el => {
  const $this = el;
  const handleInput = firstRender => {
    const $dropdownElement = $this.nextElementSibling;
    const $dropdown = $dropdownElement.querySelector('.fakeScroll__content') || $dropdownElement;
    const options = JSON.parse($this.dataset.options);
    const lowerCaseValue = $this.value.toLowerCase();
    let matchesFound = false;

    $dropdown.innerHTML = '';
  
    options.map(el => {
      if (firstRender || el.toLowerCase().indexOf(lowerCaseValue) === 0) {
        matchesFound = true;
        $dropdown.insertAdjacentHTML('beforeend', `<a class="filters__dropdown-item dropdown__menu-item" href="javascript:void(0)">${el}</a>`)
      }
    });

    if (matchesFound) {
      $dropdownElement.classList.remove('filters__dropdown--hidden');
    } else {
      $dropdownElement.classList.add('filters__dropdown--hidden');
    }

    Array.from($dropdown.querySelectorAll('.filters__dropdown-item')).map(el => el.addEventListener('click', () => {
      $this.value = el.innerText;
      $this.setAttribute('data-value', el.innerText);
    }));

    if (firstRender && !$dropdownElement.classList.contains('fakeScroll')) {
      $dropdown.fakeScroll();
    }
  };

  if ($this.name !== 'cost') {
    $this.addEventListener('input', () => handleInput(false));
    $this.addEventListener('focus', () => handleInput(true));
    $this.addEventListener('blur', () => {
      if ($this.value === '' || !$this.dataset.value) {
        $this.value = '';
      } else {
        $this.value = $this.dataset.value;
      }
    });
  }
});

Array.from(document.querySelectorAll('.filters__cost-range')).map($range => {
  const min = +$range.dataset.min;
  const max = +$range.dataset.max;

  noUiSlider.create($range, {
    start: [min, max],
    connect: true,
    range: {
      min,
      max
    },
    step: 100
  });

  $range.noUiSlider.on('slide', values => {
    const min = parseInt(values[0]);
    const max = parseInt(values[1]);

    $range.closest('.filters__input').querySelector('.filters__input-field').value = `${min} ₽ – ${max} ₽`;
    $range.closest('.filters__cost').querySelector('[data-cost="from"]').innerText = min;
    $range.closest('.filters__cost').querySelector('[data-cost="to"]').innerText = max;
  });
});
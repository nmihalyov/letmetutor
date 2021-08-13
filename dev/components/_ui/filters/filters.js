// set filter input value
Array.from(document.querySelectorAll('.filters__dropdown-item')).map(el => el.addEventListener('click', e => {
  const $this = e.currentTarget;
  const value = $this.innerText;

  $this.closest('.filters__input').querySelector('.filters__input-field').value = value;
}));

// filter main logic
if (document.querySelectorAll('.filters__input-field').length) {
  Array.from(document.querySelectorAll('.filters__input-field')).map(el => {
    fetch('json/location.json').then(res => res.json()).then(data => {
      const $this = el;
      // handle filter input
      const handleInput = firstRender => {
        const $dropdownElement = $this.nextElementSibling.querySelector('.filters__dropdown-inner');
        const $dropdown = $dropdownElement.querySelector('.fakeScroll__content') || $dropdownElement;
        const inputSmartSearch = $this.getAttribute('name') === 'location';
        const options = inputSmartSearch ? data.map(el => el.key).concat(data.flatMap(item => item.cities)) : JSON.parse($this.dataset.options);
        const lowerCaseValue = $this.value.toLowerCase();
        const $checkbox = $dropdown.closest('.filters__dropdown').querySelector('input[type="checkbox"]');
        let matchesFound = false;

        $dropdown.innerHTML = '';
      
        // render filter dropdown items
        options.map(el => {
          if (firstRender || el.toLowerCase().indexOf(lowerCaseValue) === 0) {
            const $element = inputSmartSearch ?
              `<a class="filters__dropdown-item dropdown__menu-item${(lowerCaseValue && !firstRender) ? ' filters__dropdown-item--smart' : ''}" href="javascript:void(0)"><span>${el.substr(0, lowerCaseValue.length)}</span>${el.substr(lowerCaseValue.length)}</a>` :
              `<a class="filters__dropdown-item dropdown__menu-item" href="javascript:void(0)">${el}</a>`;
            matchesFound = true;
            $dropdown.insertAdjacentHTML('beforeend', $element)
          }
        });

        // toggle filter dropdown visibility
        if (matchesFound) {
          $dropdownElement.parentNode.classList.remove('filters__dropdown--hidden');
          $dropdownElement.parentNode.classList.remove('filters__dropdown--empty');
        } else if (!$checkbox) {
          $dropdownElement.parentNode.classList.add('filters__dropdown--hidden');
        } else {
          $dropdownElement.parentNode.classList.add('filters__dropdown--empty');
        }

        // handle input value
        Array.from($dropdown.querySelectorAll('.filters__dropdown-item')).map(el => el.addEventListener('click', () => {
          $this.value = el.innerText;
          $this.setAttribute('data-value', el.innerText);

          if ($checkbox) {
            $checkbox.checked = false;
            $this.removeAttribute('readonly');
          }
        }));

        // fakeScroll init
        if (firstRender && !$dropdownElement.classList.contains('fakeScroll')) {
          $dropdown.fakeScroll();
        }
      };
      // add listeners on filter input
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
  });
}


// handle filter range slider
Array.from(document.querySelectorAll('.filters__cost-range')).map($range => {
  const min = +$range.dataset.min;
  const max = +$range.dataset.max;
  const smin = +$range.dataset.min;
  const smax = +$range.dataset.max;

  noUiSlider.create($range, {
    start: [smin, smax],
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


// handle filter checkbox
Array.from(document.querySelectorAll('.filters__dropdown-checkbox')).map(el => el.addEventListener('click', () => {
  const $inputField = el.closest('.filters__input').querySelector('.filters__input-field');

  if (el.querySelector('input').checked) {
    const checkboxValue = el.querySelector('.checkbox__text').innerText;
  
    $inputField.value = checkboxValue;
    $inputField.setAttribute('data-value', checkboxValue);
    $inputField.setAttribute('readonly', 'readonly');
  } else {
    $inputField.value = '';
    $inputField.setAttribute('data-value', '');
    $inputField.removeAttribute('readonly');
  }
}));
// auth form validation
if (document.querySelector('form[data-login-form]')) {
  $api.validate(document.querySelector('form[data-login-form]'), () => {
    document.querySelector('form[data-login-form]').submit();
  });
}

if (document.querySelector('form[data-signup-student-form]')) {
  $api.validate(document.querySelector('form[data-signup-student-form]'), () => {
    document.querySelector('form[data-signup-student-form]').submit();
  });
}

if (document.querySelector('form[data-signup-tutor-form]')) {
  $api.validate(document.querySelector('form[data-signup-tutor-form]'), () => {
    document.querySelector('form[data-signup-tutor-form]').submit();
  });
}

if (document.querySelector('form[data-support-form]')) {
  $api.validate(document.querySelector('form[data-support-form]'), () => {
    document.querySelector('form[data-support-form]').submit();
  });
}

// set country value to cities input
Array.from(document.querySelectorAll('.js-auth-country')).map(el => el.addEventListener('changeCountry', e => {
  el.closest('form').querySelector('.js-auth-city').dataset.country = e.target.querySelector('input').value;
}));

// handling cities input
if (document.querySelectorAll('.js-auth-city input').length) {
  fetch('data/location.json').then(res => res.json()).then(data => {
    Array.from(document.querySelectorAll('.js-auth-city input')).map(el => {
      el.addEventListener('input', e => {
        const $this = e.currentTarget;
        const $labelElement = $this.closest('.input');
        const country = $labelElement.dataset.country;

        if (country) {
          const cities = data.filter(el => el.key === country)[0].cities;
          const lowerCaseValue = $this.value.toLowerCase();
          const $dropdownElement = $this.closest('.input').querySelector('.dropdown__menu');
          const $dropdownContent = $dropdownElement.querySelector('.fakeScroll__content');
          let matchesFound = false;

          if ($dropdownContent) {
            $dropdownContent.innerHTML = '';
          }

          if ($this.value !== '') {
            cities.map(el => {
              if (el.toLowerCase().indexOf(lowerCaseValue) === 0) {
                matchesFound = true;
                $dropdownContent.insertAdjacentHTML('beforeend', `<a class="input__dropdown-item dropdown__menu-item${lowerCaseValue ? ' input__dropdown-item--smart' : ''}" href="javascript:void(0)"><span>${el.substr(0, lowerCaseValue.length)}</span>${el.substr(lowerCaseValue.length)}</a>`)
              }
            });

            if (matchesFound) {
              Array.from($labelElement.querySelectorAll('.input__dropdown-item')).map(el => el.addEventListener('click', () => {
                $this.value = el.innerText;
              }));
            }
          }

          if (!$dropdownElement.classList.contains('fakeScroll')) {
            $dropdownElement.fakeScroll();
          }
        }
      });

      el.addEventListener('focus', () => {
        const $dropdownElement = el.closest('.input').querySelector('.fakeScroll__content');

        if ($dropdownElement) {
          $dropdownElement.innerHTML = '';
        }
      });
    });
  });
}

// handling required agreement checkbox
Array.from(document.querySelectorAll('input[name="rulesAgreement"]')).map(el => el.addEventListener('change', () => {
  const $submitButton = el.closest('form').querySelector('button[type="submit"]');

  if (el.checked) {
    $submitButton.classList.remove('button--disabled');
    $submitButton.removeAttribute('disabled');
  } else {
    $submitButton.classList.add('button--disabled');
    $submitButton.setAttribute('disabled', 'disabled');
  }
}));

Array.from(document.querySelectorAll('.auth__toggle .tabs__item')).map(el => el.addEventListener('click', () => {
  document.querySelector('.auth__type').value = el.dataset.tab - 1;
}));
if (document.querySelector('form[data-login-form]')) {
  $api.validate(document.querySelector('form[data-login-form]'));
}

if (document.querySelector('form[data-signup-student-form]')) {
  $api.validate(document.querySelector('form[data-signup-student-form]'));
}

if (document.querySelector('form[data-signup-tutor-form]')) {
  $api.validate(document.querySelector('form[data-signup-tutor-form]'));
}

if (document.querySelectorAll('.js-auth-country').length) {
  Array.from(document.querySelectorAll('.js-auth-country')).map(el => el.addEventListener('changeCountry', e => {
    el.closest('form').querySelector('.js-auth-city').dataset.country = e.target.querySelector('input').value;
  }));
}

if (document.querySelectorAll('.js-auth-city input').length) {
  Array.from(document.querySelectorAll('.js-auth-city input')).map(el => el.addEventListener('input', el => {
    const $this = el.currentTarget;
    const $labelElement = $this.closest('.input');
    const country = $labelElement.dataset.country;
    
    if (country) {
      const cities = JSON.parse($labelElement.dataset.cities).filter(el => el.key === country)[0].cities;
      const lowerCaseValue = $this.value.toLowerCase();
      const $dropdownElement = $this.closest('.input').querySelector('.dropdown__menu');
      let matchesFound = false;

      $dropdownElement.innerHTML = '';

      if (el.currentTarget.value !== '') {
        cities.map(el => {
          if (el.toLowerCase().indexOf(lowerCaseValue) === 0) {
            matchesFound = true;
            $dropdownElement.insertAdjacentHTML('beforeend', `<a class="input__dropdown-item" href="javascript:void(0)">${el}</a>`)
          }
        });

        if (matchesFound) {
          Array.from($labelElement.querySelectorAll('.input__dropdown-item')).map(el => el.addEventListener('click', () => {
            $this.value = el.innerText;
          }));
        }
      }
    }
  }));

document.querySelector('.js-auth-city input').addEventListener('focus', el => {
  const $this = el.currentTarget;
  const $dropdownElement = $this.closest('.input').querySelector('.dropdown__menu');

  $dropdownElement.innerHTML = '';
});
}
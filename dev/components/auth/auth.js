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
  const citiesData = [{
    "key": "Россия",
    "cities": [
      "Москва",
      "Санкт-Петербург",
      "Казань",
      "Нижний Новгород",
      "Сочи",
      "Екатеринбург",
      "Ростов-на-Дону",
      "Новосибирск",
      "Тюмень",
      "Калининград",
      "Уфа",
      "Красноярск",
      "Краснодар",
      "Челябинск",
      "Воронеж"
    ]
  },
  {"key": "Украина",
    "cities": [
      "Киев",
      "Днепр",
      "Донецк",
      "Запорожье",
      "Львов",
      "Кривой Рог",
      "Севастополь",
      "Николаев",
      "Мариуполь"
    ]
  }];

  Array.from(document.querySelectorAll('.js-auth-city input')).map(el => el.addEventListener('input', el => {
    const $this = el.currentTarget;
    const $labelElement = $this.closest('.input');
    const country = $labelElement.dataset.country;
    
    if (country) {
      const cities = citiesData.filter(el => el.key === country)[0].cities;
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

if (document.querySelectorAll('input[name="rulesAgreement"]').length) {
  Array.from(document.querySelectorAll('input[name="rulesAgreement"]')).map(el => el.addEventListener('change', () => {
    if (el.checked) {
      el.closest('form').querySelector('button[type="submit"]').classList.remove('button--disabled');
      el.closest('form').querySelector('button[type="submit"]').removeAttribute('disabled');
    } else {
      el.closest('form').querySelector('button[type="submit"]').classList.add('button--disabled');
      el.closest('form').querySelector('button[type="submit"]').setAttribute('disabled', 'disabled');
    }
  }));
}
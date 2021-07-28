// auth form validation
if (document.querySelector('form[data-login-form]')) {
  $api.validate(document.querySelector('form[data-login-form]'), () => {console.log(true)});
}

if (document.querySelector('form[data-signup-student-form]')) {
  $api.validate(document.querySelector('form[data-signup-student-form]'), () => {});
}

if (document.querySelector('form[data-signup-tutor-form]')) {
  $api.validate(document.querySelector('form[data-signup-tutor-form]'), () => {});
}

if (document.querySelector('form[data-support-form]')) {
  $api.validate(document.querySelector('form[data-support-form]'), () => {});
}

// set country value to cities input
Array.from(document.querySelectorAll('.js-auth-country')).map(el => el.addEventListener('changeCountry', e => {
  el.closest('form').querySelector('.js-auth-city').dataset.country = e.target.querySelector('input').value;
}));

// handling cities input
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

  Array.from(document.querySelectorAll('.js-auth-city input')).map(el => {
    el.addEventListener('input', el => {
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
              $dropdownElement.insertAdjacentHTML('beforeend', `<a class="input__dropdown-item dropdown__menu-item${lowerCaseValue ? ' input__dropdown-item--smart' : ''}" href="javascript:void(0)"><span>${el.substr(0, lowerCaseValue.length)}</span>${el.substr(lowerCaseValue.length)}</a>`)
            }
          });

          if (matchesFound) {
            Array.from($labelElement.querySelectorAll('.input__dropdown-item')).map(el => el.addEventListener('click', () => {
              $this.value = el.innerText;
            }));
          }
        }
      }
    });

    el.addEventListener('focus', () => {
      const $dropdownElement = el.closest('.input').querySelector('.dropdown__menu');
  
      $dropdownElement.innerHTML = '';
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
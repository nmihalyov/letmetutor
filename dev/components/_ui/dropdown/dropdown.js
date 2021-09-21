const $dropdowns = Array.from(document.querySelectorAll('.dropdown'));

// close dropdown on outer click
document.addEventListener('click', () => {
  if (document.querySelector('.dropdown--active')) {
    document.querySelector('.dropdown--active').classList.remove('dropdown--active');
  }
});


// open dropdown
document.addEventListener('click', e => {
  const $dropdown = e.target.closest('.dropdown');

  if ($dropdown) {
    if ($dropdown.classList.contains('input__code')) {
      e.preventDefault();
    }

    if ($dropdown.classList.contains('header__profile-notifications')) {
      var queryUrl = '/ajax/action/read_notifications';
      // check notifications
      fetch(queryUrl)
      .then(response => response.text())
      .then(text => {
        if (text === 'ok') {
          const find = $dropdown.querySelector('.header__profile-counter');
          if (find !== null) find.remove();
        }
      });    
    }
  
    if (!$dropdown.classList.contains('dropdown--active')) {
      if (document.querySelector('.dropdown--active')) {
        document.querySelector('.dropdown--active').classList.remove('dropdown--active');
      }
      $dropdown.classList.toggle('dropdown--active');
    }
  }
});

const formatURL = url => {
  let formattedURL = url;

  formattedURL += `?filter=${document.querySelector('.js-catalog-filter .dropdown__value').innerText}`;
  const filtersNames = Array.from(document.querySelectorAll('.filters__input-field')).map(el => el.name);
  
  new URL(location.href).searchParams.toString().split("&").map(el => {
    const [ key ] = el.split('=');
    if (filtersNames.includes(key)) {
      formattedURL += '&' + el;
    }
  });

  formattedURL += `&limit=${document.querySelector('.js-catalog-limit .dropdown__value').innerText}`;

  return formattedURL;
};

const changeActions = url => {
  // change currency/language
  fetch(url)
  .then(response => response.text())
  .then(text => {
    location.reload();
  });
};

// change dropdown value
document.addEventListener('click', e => {
  const $dropdownMenuItem = e.target.closest('.dropdown__menu-item');

  if ($dropdownMenuItem) {
    document.querySelector('.dropdown--active').classList.remove('dropdown--active');

    if ($dropdownMenuItem.getAttribute('data-toggle')) {
      const $this = e.target;
      const newValue = $this.innerText;
      const $hiddenItem = $this.closest('.dropdown__menu').querySelector('.dropdown__menu-item--hidden');
      const $dropdown = $this.closest('.dropdown');
      const $dropdownValue = $dropdown.querySelector('.dropdown__value');
      const $dropdownInput = $dropdown.querySelector('input');

      if ($hiddenItem) {
        $hiddenItem.classList.remove('dropdown__menu-item--hidden');
      }

      if ($dropdownInput) {
        $dropdownInput.value = newValue;
      }

      $dropdownMenuItem.classList.add('dropdown__menu-item--hidden'); 
      $dropdownValue.innerText = newValue;

      // search filters
      if($this.closest('.dropdown').classList.contains('catalog__sort-item')) {
        document.location.href = formatURL('/search');
      }

      // currency filters
      if($this.closest('.dropdown').classList.contains('js-currency-change')) {
        changeActions('/ajax/action/currency_change?currency='+newValue);   
      }
      
      // language filters
      if($this.closest('.dropdown').classList.contains('js-language-change')) {
        changeActions('/ajax/action/language_change?language='+newValue);
      }
    }
  }
});
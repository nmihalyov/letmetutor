// handle open popup
document.addEventListener('click', e => {
  const $this = e.target;

  if ($this.classList.contains('js-open-popup')) {
    e.preventDefault();

    const target = $this.dataset.popup;
    const $popup = document.querySelector(`.js-popup[data-popup="${target}"]`);
    
    $api.popup($popup).show();
  }
});

// handle close popup
Array.from(document.querySelectorAll('.js-close-popup')).map(el =>
  el.addEventListener('click', e => {
    if(!e.target.closest('.popup__window') || !e.currentTarget.classList.contains('js-popup')) {
      const $popup = e.currentTarget.closest('.popup');

      $api.popup($popup).hide();
    }
  })
);

if (document.querySelector('form[data-restore-form]')) {
  $api.validate(document.querySelector('form[data-restore-form]'), () => {});
}

if (document.querySelector('form[data-request-auth-form]')) {
  $api.validate(document.querySelector('form[data-request-auth-form]'), () => {});
}

if (document.querySelector('form[data-request-form]')) {
  $api.validate(document.querySelector('form[data-request-form]'), () => {
    const $popup = document.querySelector('.js-popup[data-popup="request"]');
    const $successPopup = document.querySelector('.js-popup[data-popup="request-success"]');

    $api.popup($popup, {
      onHide() {
        Array.from($popup.querySelectorAll('input')).map(el => el.value = '');
        $api.popup($successPopup).show();
      }
    }).hide();
  });
}

if (document.querySelector('form[data-request-specific-form]')) {
  $api.validate(document.querySelector('form[data-request-specific-form]'), () => {
    const $popup = document.querySelector('.js-popup[data-popup="request-specific"]');
    const $successPopup = document.querySelector('.js-popup[data-popup="request-success"]');

    $api.popup($popup, {
      onHide() {
        Array.from($popup.querySelectorAll('input')).map(el => el.value = '');
        $api.popup($successPopup).show();
      }
    }).hide();
  });
}
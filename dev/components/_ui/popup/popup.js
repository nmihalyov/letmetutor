// handle open popup
const popupShow = new Event('popupShow');

document.addEventListener('click', e => {
  const $this = e.target;

  if ($this.closest('.js-open-popup')) {
    e.preventDefault();
    
    const target = $this.closest('.js-open-popup').dataset.popup;
    const $popup = document.querySelector(`.js-popup[data-popup="${target}"]`);

    if (target === 'request-auth') {
      if (document.querySelector('.profile-head__name')) {
        $popup.querySelector('.popup__desc b').innerText = document.querySelector('.profile-head__name').innerText;
      } else {
        $popup.querySelector('.popup__desc b').innerText = $this.closest('.tutorcard').querySelector('.tutorcard__name').innerText;
      }
    }

    $api.popup($popup, {
      onShow() {
        if (target === 'edit-photo') {
          $popup.dispatchEvent(popupShow);
        }
      }
    }).show();
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

// all popup forms
const $popupForms = [{
  $element: document.querySelector('form[data-restore-form]'),
  callback: $element => {
    setTimeout(() => {
      $element.querySelector('button[type="submit"]').classList.remove('button--loading');
      $element.submit();
    }, 1000);
  }
},
{
  $element: document.querySelector('form[data-request-auth-form]'),
  callback: $element => {
    setTimeout(() => {
      $element.querySelector('button[type="submit"]').classList.remove('button--loading');
      $element.submit();
    }, 1000);
  }
},
{
  $element: document.querySelector('form[data-offer-form]'),
  callback: $element => {
    const $popup = document.querySelector('.js-popup[data-popup="offer"]');
    const $successPopup = document.querySelector('.js-popup[data-popup="offer-success"]');

    setTimeout(() => {
      $api.popup($popup, {
        onHide() {
          Array.from($popup.querySelectorAll('input')).map(el => el.value = '');
          $api.popup($successPopup).show();
          $element.querySelector('button[type="submit"]').classList.remove('button--loading');
        }
      }).hide();
    }, 1000);
  }
},
{
  $element: document.querySelector('form[data-request-form]'),
  callback: $element => {
    const $popup = document.querySelector('.js-popup[data-popup="request"]');
    const $successPopup = document.querySelector('.js-popup[data-popup="request-success"]');

    setTimeout(() => {
      $api.popup($popup, {
        onHide() {
          Array.from($popup.querySelectorAll('input')).map(el => el.value = '');
          $api.popup($successPopup).show();
          $element.querySelector('button[type="submit"]').classList.remove('button--loading');
        }
      }).hide();
    }, 1000);
  }
},
{
  $element: document.querySelector('form[data-request-specific-form]'),
  callback: $element => {
    const $popup = document.querySelector('.js-popup[data-popup="request-specific"]');
    const $successPopup = document.querySelector('.js-popup[data-popup="request-success"]');

    setTimeout(() => {
      $api.popup($popup, {
        onHide() {
          Array.from($popup.querySelectorAll('input')).map(el => el.value = '');
          $api.popup($successPopup).show();
          $element.querySelector('button[type="submit"]').classList.remove('button--loading');
        }
      }).hide();
    }, 1000);
  }
}];

// apply validation on popups forms
$popupForms.map(form => {
  const { $element, callback } = form;

  if ($element) {
    $api.validate($element, () => callback($element));
  }
});
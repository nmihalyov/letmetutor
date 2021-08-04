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

// all popup forms and theirs validation callbacks
const $popupForms = [{
  $element: document.querySelector('form[data-restore-form]'),
  callback: () => {}
},
{
  $element: document.querySelector('form[data-request-auth-form]'),
  callback: () => {}
},
{
  $element: document.querySelector('form[data-offer-form]'),
  callback: () => {
    const $popup = document.querySelector('.js-popup[data-popup="offer"]');
    const $successPopup = document.querySelector('.js-popup[data-popup="offer-success"]');

    $api.popup($popup, {
      onHide() {
        Array.from($popup.querySelectorAll('input')).map(el => el.value = '');
        $api.popup($successPopup).show();
      }
    }).hide();
  }
},
{
  $element: document.querySelector('form[data-request-form]'),
  callback: () => {
    const $popup = document.querySelector('.js-popup[data-popup="request"]');
    const $successPopup = document.querySelector('.js-popup[data-popup="request-success"]');

    $api.popup($popup, {
      onHide() {
        Array.from($popup.querySelectorAll('input')).map(el => el.value = '');
        $api.popup($successPopup).show();
      }
    }).hide();
  }
},
{
  $element: document.querySelector('form[data-request-specific-form]'),
  callback: () => {
    const $popup = document.querySelector('.js-popup[data-popup="request-specific"]');
    const $successPopup = document.querySelector('.js-popup[data-popup="request-success"]');

    $api.popup($popup, {
      onHide() {
        Array.from($popup.querySelectorAll('input')).map(el => el.value = '');
        $api.popup($successPopup).show();
      }
    }).hide();
  }
}];

// apply validation on popups forms
$popupForms.map(form => {
  const { $element, callback } = form;

  if ($element) {
    $api.validate($element, callback);
  }
});
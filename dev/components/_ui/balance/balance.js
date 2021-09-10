// masking balacne input
document.querySelectorAll('.balance__input').forEach(el => {
  Inputmask({alias: 'decimal', radixPoint: ' ', suffix: ' ₽'}).mask(el);
});

// all balance forms
const $balanceForms = [{
  $element: document.querySelector('form[data-balance-replensih]'),
  callback: $element => {
    setTimeout(() => {
      $element.querySelector('button[type="submit"]').classList.remove('button--loading');
      $element.submit();
    }, 1000);
  }
}];

// apply validation on balance forms
$balanceForms.map(form => {
  const { $element, callback } = form;

  if ($element) {
    $api.validate($element, () => callback($element));
  }
});
const $toggleCheckboxes = document.querySelectorAll('.personal__applications-checkbox');

// toggle application form message
document.querySelectorAll('.application__write').forEach(el => el.addEventListener('click', () => {
  const showText = el.dataset.show;
  const hideText = el.dataset.hide;
  const currentText = el.innerHTML;

  el.closest('.application').querySelector('.application__form').style.display = currentText === showText ? 'block' : 'none';
  el.innerText = currentText === showText ? hideText : showText;
}));

// toggle applications checkboxes
$toggleCheckboxes.forEach(el => el.addEventListener('click', () => {
  const checked = el.querySelector('input').checked;
  
  el.closest('.personal__card').querySelectorAll('.application__checkbox input').forEach(el => el.checked = checked);

  el.closest('.personal__card').querySelectorAll('.personal__applications-checkbox').forEach(item => {
    if (item !== el) {
      item.querySelector('input').checked = checked;
    }
  });
}));

// toggle main checkbox
document.querySelectorAll('.application__checkbox input').forEach(el => el.addEventListener('change', () => {
  let isChecked = true;

  el.closest('.personal__card').querySelectorAll('.application__checkbox input').forEach(el => {
    if (!el.checked) {
      isChecked = false;
    }
  });

  $toggleCheckboxes.forEach(el => el.querySelector('input').checked = isChecked);
}));

// toggle application reason
document.querySelectorAll('.application__declined-link').forEach(el => el.addEventListener('click', () => {
  el.nextElementSibling.classList.toggle('application__declined-reason--active');
}));

document.addEventListener('click', e => {
  const $activeReason = document.querySelector('.application__declined-reason--active');

  if ($activeReason && !e.target.closest('.application__declined')) {
    $activeReason.classList.remove('application__declined-reason--active');
  }
});
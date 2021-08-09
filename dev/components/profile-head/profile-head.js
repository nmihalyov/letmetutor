// set payment per hour
Array.from(document.querySelectorAll('.profile-head__subjects-item')).map(el => el.addEventListener('click', () => {
  const payment = el.dataset.pay;

  el.closest('.profile-head__subjects').querySelector('.profile-head__subjects-item--highlight').classList.remove('profile-head__subjects-item--highlight');
  el.classList.add('profile-head__subjects-item--highlight');

  Array.from(document.querySelectorAll('.js-profile-cost')).map(el => el.innerText = payment);
}));
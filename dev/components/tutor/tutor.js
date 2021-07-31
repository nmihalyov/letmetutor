// scroll to tutor section
Array.from(document.querySelectorAll('.tutor__nav-link')).map(el => el.addEventListener('click', () => {
  const target = el.dataset.target;

  scrollTo({
    top: document.querySelector(`[data-block="${target}"]`).getBoundingClientRect().top + window.pageYOffset - document.querySelector('.header').offsetHeight,
    behavior: 'smooth'
  });
}));

// set payment per hour
Array.from(document.querySelectorAll('.profile-head__subjects-item')).map(el => el.addEventListener('click', () => {
  const payment = el.dataset.pay;

  el.closest('.profile-head__subjects').querySelector('.profile-head__subjects-item--highlight').classList.remove('profile-head__subjects-item--highlight');
  el.classList.add('profile-head__subjects-item--highlight');

  Array.from(document.querySelectorAll('.tutor__cost-value span')).map(el => el.innerText = payment);
}));
const $cookies = document.querySelector('.cookies');

if (!JSON.parse(localStorage.getItem('cookiesIsHidden'))) {
  $cookies.classList.add('cookies--shown');

  document.querySelector('.cookies__btn').addEventListener('click', () => {
    $cookies.classList.remove('cookies--shown');
    setTimeout(() => {
      $cookies.remove();
      localStorage.setItem('cookiesIsHidden', true);
    }, 500)
  });
} else {
  $cookies.remove();
}
const $cookies = document.querySelector('.cookies');

// cookies handling
if (!JSON.parse(localStorage.getItem('letmetutor:cookiesIsHidden'))) {
  $cookies.classList.add('cookies--shown');

  document.querySelector('.cookies__btn').addEventListener('click', () => {
    $cookies.classList.remove('cookies--shown');
    setTimeout(() => {
      $cookies.remove();
      localStorage.setItem('letmetutor:cookiesIsHidden', true);
    }, 500)
  });
} else {
  $cookies.remove();
}
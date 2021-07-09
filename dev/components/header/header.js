const $banner = document.querySelector('.header__banner');

if (!JSON.parse(localStorage.getItem('bannerIsHidden'))) {
  $banner.style.display = 'flex';
  document.querySelector('.header__banner-close').addEventListener('click', () => {
    $banner.classList.add('header__banner--hide');
    setTimeout(() => {
      $banner.remove();
      localStorage.setItem('bannerIsHidden', true);
    }, 500)
  });
} else {
  $banner.remove();
}
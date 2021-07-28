const $banner = document.querySelector('.banner');

// banner handling
if (!JSON.parse(localStorage.getItem('letmetutor:bannerIsHidden'))) {
  $banner.style.display = 'flex';
  document.querySelector('.banner__close').addEventListener('click', () => {
    $banner.classList.add('banner--hide');
    setTimeout(() => {
      $banner.remove();
      localStorage.setItem('letmetutor:bannerIsHidden', true);
    }, 500)
  });
} else {
  $banner.remove();
}
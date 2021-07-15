let offset = 0;
const $banner = document.querySelector('.header__banner');
const hideOverflow = () => {
  offset = -parseInt(document.body.style.marginTop);
  document.body.style.cssText = `position: fixed; margin-top: ${-window.scrollY}px`;
};
const showOverflow = offset => {
  document.body.style.cssText = 'position: static; margin-top: 0';
  window.scrollTo(0, offset);
};
const hideHeaderMenu = () => {
  showOverflow();
  document.querySelector('.header-menu').classList.remove('header-menu--shown');
};

if (!JSON.parse(localStorage.getItem('letmetutor:bannerIsHidden'))) {
  $banner.style.display = 'flex';
  document.querySelector('.header__banner-close').addEventListener('click', () => {
    $banner.classList.add('header__banner--hide');
    setTimeout(() => {
      $banner.remove();
      localStorage.setItem('letmetutor:bannerIsHidden', true);
    }, 500)
  });
} else {
  $banner.remove();
}

document.querySelector('.header__burger').addEventListener('click', () => {
  hideOverflow();
  document.querySelector('.header-menu').classList.add('header-menu--shown');
});

document.querySelector('.header-menu__backdrop').addEventListener('click', hideHeaderMenu);
document.querySelector('.header-menu__close').addEventListener('click', hideHeaderMenu);
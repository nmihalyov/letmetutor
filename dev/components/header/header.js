let offset = 0;
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

document.querySelector('.header__burger').addEventListener('click', () => {
  hideOverflow();
  document.querySelector('.header-menu').classList.add('header-menu--shown');
});

document.querySelector('.header-menu__backdrop').addEventListener('click', hideHeaderMenu);
document.querySelector('.header-menu__close').addEventListener('click', hideHeaderMenu);

Array.from(document.querySelectorAll('.header__notifications-wrapper')).map(el => {
  if (!el.classList.contains('fakeScroll')) {
    el.fakeScroll();
  }
});
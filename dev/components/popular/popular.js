const popularSlider = new Swiper('.popular__grid--mobile', {
  loop: true,
  loopAdditionalSlides: 3,
  spaceBetween: 20,
  slidesPerView: 'auto',
  centeredSlides: true,
  breakpoints: {
    760: {
      slidesPerView: 2,
      centeredSlides: false
    }
  }
});
const reviewsSlider = new Swiper('.reviews__slider', {
  loop: true,
  spaceBetween: 20,
  slidesPerView: 3,
  slidesPerGroup: 3,
  loopAdditionalSlides: 3,
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  }
});

const reviewSliderMobile = new Swiper('.reviews__slider--mobile', {
  loop: true,
  spaceBetween: 20,
  loopAdditionalSlides: 3,
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  }
});
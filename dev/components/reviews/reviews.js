const swiper = new Swiper('.swiper-container', {
  loop: true,
  spaceBetween: 20,
  slidesPerView: 1,
  slidesPerGroup: 1,
  loopAdditionalSlides: 3,
  pagination: {
    el: '.swiper-pagination'
  },
  breakpoints: {
    1200: {
      slidesPerView: 3,
      slidesPerGroup: 3
    }
  }
});
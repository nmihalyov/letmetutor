const swiper = new Swiper('.swiper-container', {
  loop: true,
  spaceBetween: 20,
  slidesPerView: 3,
  slidesPerGroup: 3,
  loopAdditionalSlides: 3,
  pagination: {
    el: '.swiper-pagination'
  }
});
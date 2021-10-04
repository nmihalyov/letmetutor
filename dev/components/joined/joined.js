const joinedSlider = new Swiper('.joined__slider', {
  loop: true,
  centeredSlides: true,
  allowTouchMove: false,
  slidesPerView: 1,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  on: {
    slideChange(swiper) {
      document.querySelector('.joined__info--active').classList.remove('joined__info--active');
      document.querySelector(`.joined__info[data-content="${swiper.realIndex + 1}"]`).classList.add('joined__info--active');
    }
  },
  breakpoints: {
    760: {
      slidesPerView: 3
    }
  }
});
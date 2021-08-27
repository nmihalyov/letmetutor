// init fakeScroll on timezone dropdown
const $timezoneDropdowns = document.querySelectorAll('.profile-schedule__timezone-menu');

if ($timezoneDropdowns.length) {
  Array.from($timezoneDropdowns).map(el => {
    if (!el.classList.contains('fakeScroll')) {
      el.fakeScroll();
    }
  });
}

// init fakeScroll on date/time dropdowns
Array.from(document.querySelectorAll('.profile-schedule__time')).map(el => {
  const $container = el.querySelector('.profile-schedule__time-menu');

  if ($container && !$container.classList.contains('fakeScroll')) {
    $container.fakeScroll();
  }
});

const setDateTime = () => {
  const $currentUnit = document.querySelector('.profile-schedule__unit--current');
  const $popup = document.querySelector('.js-popup[data-popup="request-specific"]');

  if ($currentUnit) {
    setTimeout(() => {
      const date = $currentUnit.dataset.date;
      const time = $currentUnit.querySelector('.profile-schedule__time-value').innerText;
  
      document.querySelector('.profile-schedule__pick').classList.add('profile-schedule__pick--active');
      document.querySelector('.profile-schedule__pick-date').innerText = date;
      document.querySelector('.profile-schedule__pick-time').innerText = time;

      if ($popup) {
        $popup.querySelector('.popup__heading-date').innerText = date;
        $popup.querySelector('.popup__heading-time').innerText = time;
        $popup.querySelector('input[name="time"]').value = time;
      }
    }, 0);
  }
}

// handle schedule slider
if (document.querySelector('.profile-schedule')) {
  const $prevButton = document.querySelector('.profile-schedule__controls-button--prev');
  const $nextButton = document.querySelector('.profile-schedule__controls-button--next');
  
  if ($prevButton) {
    $prevButton.addEventListener('click', () => {
      const $activeSlide = document.querySelector('.profile-schedule__slide--active');
      const currentIndex = +$activeSlide.dataset.slide;
      const $prevSlide = document.querySelector(`.profile-schedule__slide[data-slide="${currentIndex - 1}"]`);
    
      if ($prevSlide) {
        $activeSlide.classList.remove('profile-schedule__slide--active');
        $prevSlide.classList.add('profile-schedule__slide--active');
        document.querySelector('.profile-schedule__controls-button--next').classList.remove('profile-schedule__controls-button--disabled');
        document.querySelector('.profile-schedule__controls-dates').innerText = $prevSlide.dataset.dates;
    
        if ($prevSlide.dataset.first) {
          $prevButton.classList.add('profile-schedule__controls-button--disabled');
        }
      }
    });
  }
  
  if ($nextButton) {
    $nextButton.addEventListener('click', () => {
      const $activeSlide = document.querySelector('.profile-schedule__slide--active');
      const currentIndex = +$activeSlide.dataset.slide;
      const $nextSlide = document.querySelector(`.profile-schedule__slide[data-slide="${currentIndex + 1}"]`);
    
      if ($nextSlide) {
        $activeSlide.classList.remove('profile-schedule__slide--active');
        $nextSlide.classList.add('profile-schedule__slide--active');
        document.querySelector('.profile-schedule__controls-button--prev').classList.remove('profile-schedule__controls-button--disabled');
        document.querySelector('.profile-schedule__controls-dates').innerText = $nextSlide.dataset.dates;
    
        if ($nextSlide.dataset.last) {
          $nextButton.classList.add('profile-schedule__controls-button--disabled');
        }
      }
    });
  }
}

// handle select datetime unit
Array.from(document.querySelectorAll('.profile-schedule__unit')).map(el => el.addEventListener('click', e => {
  if (!e.target.closest('.profile-schedule__time')) {
    const $currentUnit = document.querySelector('.profile-schedule__unit--current');
  
    if ($currentUnit) {
      $currentUnit.classList.remove('profile-schedule__unit--current');
    }
  
    el.classList.add('profile-schedule__unit--current');
    setDateTime();
  }
}));

// execute set datetime on time change
Array.from(document.querySelectorAll('.profile-schedule__time-menu .dropdown__menu-item')).map(el => el.addEventListener('click', setDateTime));
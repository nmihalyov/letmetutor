// cropped image to send to server
let croppedImage = null;

// all personal forms
const $personalForms = [{
  $element: document.querySelector('form[data-personal-data]'),
  callback: $element => {
    setTimeout(() => {
      $element.querySelector('button[type="submit"]').classList.remove('button--loading');
      $element.submit();
    }, 1000);
  }
},
{
  $element: document.querySelector('form[data-personal-experience]'),
  callback: $element => {
    setTimeout(() => {
      $element.querySelector('button[type="submit"]').classList.remove('button--loading');
      $element.submit();
    }, 1000);
  }
},
{
  $element: document.querySelector('form[data-personal-contacts]'),
  callback: $element => {
    setTimeout(() => {
      $element.querySelector('button[type="submit"]').classList.remove('button--loading');
      $element.submit();
    }, 1000);
  }
},
{
  $element: document.querySelector('form[data-personal-pass]'),
  callback: $element => {
    setTimeout(() => {
      $element.querySelector('button[type="submit"]').classList.remove('button--loading');
      $element.submit();
    }, 1000);
  }
},
{
  $element: document.querySelector('form[data-personal-notification]'),
  callback: $element => {
    setTimeout(() => {
      $element.querySelector('button[type="submit"]').classList.remove('button--loading');
      $element.submit();
    }, 1000);
  }
},
{
  $element: document.querySelector('form[data-personal-info]'),
  callback: $element => {
    setTimeout(() => {
      $element.querySelector('button[type="submit"]').classList.remove('button--loading');
      $element.submit();
    }, 1000);
  }
},
{
  $element: document.querySelector('form[data-photo-form]'),
  callback: $element => {
    setTimeout(() => {
      const fileData = croppedImage.getData();
      const data = {
        x: parseInt(fileData.x),
        y: parseInt(fileData.y),
        width: parseInt(fileData.width),
        height: parseInt(fileData.height)
      };
      croppedImage.element.closest('.popup__photo').querySelector('input[name="imageCropInfo"]').value = JSON.stringify(data);

      $element.querySelector('button[type="submit"]').classList.remove('button--loading');
      $element.submit();
    }, 1000);
  }
}];

// apply validation on personal forms
$personalForms.map(form => {
  const { $element, callback } = form;

  if ($element) {
    $api.validate($element, () => callback($element));
  }
});

// add items logic
Array.from(document.querySelectorAll('.js-personal-add')).map(el => el.addEventListener('click', () => {
  const $element = el.parentNode.querySelector('.js-copy-item');
  const $clonedElement = $element.cloneNode(true);
  const $inputDropdown = $clonedElement.querySelector('.input.dropdown');

  Array.from($clonedElement.querySelectorAll('.fakeScroll__content')).map(el => {
    const $menu = el.closest('.dropdown__menu');

    Array.from(el.children).map(item => {
      $menu.insertAdjacentElement('beforeend', item);
    });

    Array.from($clonedElement.querySelectorAll('input[type="text"]')).map(el => el.value = '');
    Array.from($clonedElement.querySelectorAll('input[type="checkbox"]')).map(el => el.checked = false);

    $menu.classList.remove('fakeScroll', 'fakeScroll--hasBar');
    $menu.querySelector('.fakeScroll__wrap').remove();
    $menu.querySelector('.fakeScroll__track').remove();
    $menu.fakeScroll();
  });

  $element.parentNode.insertAdjacentElement('beforeend', $clonedElement);
  
  if ($inputDropdown) {
    $inputDropdown.addEventListener('click', () => {
      const $dropdown = $inputDropdown.querySelector('.dropdown__menu');

      $inputDropdown.closest('.input').querySelector('.input__dropdown').style.width = $inputDropdown.closest('.input').getBoundingClientRect().width + 'px';
    
      if (!$dropdown.classList.contains('fakeScroll')) {
        $dropdown.fakeScroll();
      }

    });

    Array.from($inputDropdown.querySelectorAll('.input__dropdown-item[data-dropdown]')).map(el => el.addEventListener('click', () => {
      const value = el.innerText;
      
      el.closest('.input').querySelector('input').value = value;
      el.closest('.input').classList.remove('input--error');
    }));
  }
}));

// initialize image cropper
const cropperInit = image => {
  croppedImage = new Cropper(image, {
    viewMode: 3,
    aspectRatio: 1,
    zoomable: false,
    guides: false,
    center: false,
    highlight: false,
    minContainerWidth: window.innerWidth < 760 ? 200 : 350,
    autoCropArea: 1,
    minCropBoxWidth: 200,
    minCropBoxHeight: 200,
    preview: image.closest('.popup__photo').querySelector('.popup__photo-pic')
  });
};

const $editPhotoPopup = document.querySelector('.js-popup[data-popup="edit-photo"]');
if ($editPhotoPopup) {
  $editPhotoPopup.addEventListener('popupShow', () => {
    const $uploadedImage = $editPhotoPopup.querySelector('.popup__photo-image[data-uploaded]');
  
    if ($uploadedImage) {
      cropperInit($uploadedImage);
    }
  })
}

// get uploaded photo
const $popupPhotoInput = document.querySelector('.js-photo-input');

if ($popupPhotoInput) {
  $popupPhotoInput.addEventListener('change', e => {
    const file = e.target.files[0];
    const reader = new FileReader();
  
    reader.onloadend = () => {
      const image = reader.result;
      const $cropper = document.querySelector('.cropper-container');
      const $popupPhotoContainer = $popupPhotoInput.closest('.popup__photo');
      
      if ($cropper || !$popupPhotoContainer.querySelector('.popup__photo-image[data-uploaded]')) {
        if ($cropper) {
          $cropper.remove();
        }

        $popupPhotoContainer.querySelector('.popup__photo-pic').style.backgroundImage = `url(${image})`;
        $popupPhotoContainer.querySelector('.popup__photo-image').remove();
        $popupPhotoContainer.querySelector('.popup__photo-container').insertAdjacentHTML('afterbegin', `<img class="popup__photo-image" src="${image}" alt="">`)
      }

      const $imageElement = $popupPhotoContainer.querySelector('.popup__photo-image');
  
      cropperInit($imageElement);
    };
    reader.readAsDataURL(file);
  });
}

// go to detailed schedule
Array.from(document.querySelectorAll('.personal__schedule-time-link')).map(el => el.addEventListener('click', () => {
  const target = el.dataset.schedule;

  document.querySelector('[data-schedule-main]').style.display = 'none';
  document.querySelector(`[data-schedule-detail="${target}"]`).style.display = 'block';
  if (window.innerWidth > 1199) window.scrollTo(0, 0);
}));

// go back to main schedule
Array.from(document.querySelectorAll('.personal__back')).map(el => el.addEventListener('click', () => {
  el.closest('[data-schedule-detail]').style.display = 'none';
  document.querySelector('[data-schedule-main]').style.display = 'block';
  if (window.innerWidth > 1199) window.scrollTo(0, 0);
}));

// handle schedule days toggler
if (document.querySelector('.personal__schedule')) {
  Array.from(document.querySelectorAll('.profile-schedule__controls-button--prev')).map(el => el.addEventListener('click', () => {
    const $currentSchedule = el.closest('[data-schedule-detail]');
    const currentScheduleId = parseInt($currentSchedule.dataset.scheduleDetail);

    $currentSchedule.style.display = 'none';
    document.querySelector(`[data-schedule-detail="${currentScheduleId - 1}"]`).style.display = 'block';
  }));

  Array.from(document.querySelectorAll('.profile-schedule__controls-button--next')).map(el => el.addEventListener('click', () => {
    const $currentSchedule = el.closest('[data-schedule-detail]');
    const currentScheduleId = parseInt($currentSchedule.dataset.scheduleDetail);

    $currentSchedule.style.display = 'none';
    document.querySelector(`[data-schedule-detail="${currentScheduleId + 1}"]`).style.display = 'block';
  }));
}
// cropped image to send to server
let croppedImage = null;

// all personal forms
const $personalForms = [{
  $element: document.querySelector('form[data-personal-data]'),
  callback: $element => {
    sendForm('/ajax/account/basic', $element);
  }
},
{
  $element: document.querySelector('form[data-personal-experience]'),
  callback: $element => {
    sendForm('/ajax/account/experiences', $element);
  }
},
{
  $element: document.querySelector('form[data-personal-specialization]'),
  callback: $element => {
    document.querySelector('.errortype').style.display = 'none';

    sendForm('/ajax/account/specialization', $element, function(error) {
      if(error == 'error.type') document.querySelector('.errortype').style.display = 'block';
    });
  }
},
{
  $element: document.querySelector('form[data-personal-contacts]'),
  callback: $element => {
    sendForm('/ajax/account/contacts', $element);
  }
},
{
  $element: document.querySelector('form[data-personal-pass]'),
  callback: $element => {
    sendForm('/ajax/account/password', $element);
  }
},
{
  $element: document.querySelector('form[data-personal-notification]'),
  callback: $element => {
    sendForm('/ajax/account/notifications', $element);
  }
},
{
  $element: document.querySelector('form[data-personal-info]'),
  callback: $element => {
    sendForm('/ajax/account/info', $element);
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

      $element.submit();
    }, 0);
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

  $clonedElement.style.display = 'block';

  Array.from($clonedElement.querySelectorAll('input')).map(el => {
    el.required = true;
  });

  Array.from($clonedElement.querySelectorAll('input')).map(el => {
    el.addEventListener('input', function(e) {
      e.target.parentNode.parentNode.classList.remove('input--error');
    });
    
  });

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

  // remove event
  Array.from(document.querySelectorAll('.js-personal-remove')).map(el => el.addEventListener('click', () => {
    el.parentNode.remove();
  }));

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

// remove button
Array.from(document.querySelectorAll('.js-personal-remove')).map(el => el.addEventListener('click', () => {
  el.parentNode.remove();
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

const setSelectedServiceTerm = () => {
  const $checkedRadio = document.querySelector('.personal__services-terms--active input:checked');

  if ($checkedRadio) {
    const term = $checkedRadio.parentElement.querySelector('.radio__text').innerHTML.split('<span>')[0].trim();
    const cost = $checkedRadio.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' &#8381;';
  
    document.querySelector('.personal__services-selected span[data-selected="term"]').innerText = term;
    document.querySelector('.personal__services-topay span').innerHTML = cost;

    document.querySelector('.personal__services-footer').classList.remove('personal__services-footer--hidden');
    if (document.querySelector('span[data-service-cost]')) {
      document.querySelector('span[data-service-cost]').innerHTML = cost;
    }
  } else {
    document.querySelector('.personal__services-footer').classList.add('personal__services-footer--hidden');
  }
};

// handle service toggler
document.querySelectorAll('.personal__services-label input').forEach(el => el.addEventListener('change', () => {
  const value = el.value;
  const title = el.parentElement.querySelector('.personal__services-heading').innerText;

  document.querySelector('.personal__services-terms--active').classList.remove('personal__services-terms--active');
  document.querySelector(`.personal__services-terms[data-terms="${value}"]`).classList.add('personal__services-terms--active');

  document.querySelector('.personal__services-selected span[data-selected="service"]').innerHTML = '&laquo;' + title + '&raquo;';

  if (document.querySelector('.popup__heading-service')) {
    document.querySelector('.popup__heading-service').innerText = title;
  }

  setSelectedServiceTerm();
}));

// handle service term toggler
document.querySelectorAll('.personal__services-radio input').forEach(el => el.addEventListener('change', setSelectedServiceTerm));

// scroll to verification
if (document.querySelector('.personal__verify-arrow')) {
  document.querySelector('.personal__verify-arrow').addEventListener('click', () => {
    scrollTo({
      top: document.querySelector('.personal__verification-btn').getBoundingClientRect().top + window.pageYOffset - document.querySelector('.header').offsetHeight - 20,
      behavior: 'smooth'
    });
  });
}

// copy to clipboard
const $copyBtn = document.querySelector('.personal__ref-copy');

if ($copyBtn) {
  $copyBtn.addEventListener('click', () => {
    const $input = $copyBtn.parentNode.querySelector('input');
    const type = $input.getAttribute('type');
    $input.setAttribute('type', 'text');
    
    $input.select();
    $input.setSelectionRange(0, 99999);
    document.execCommand('copy');
    $input.setAttribute('type', type);
  });
}

// share menu handling
const $shareMenu = document.querySelector('.personal__ref-share');

if (document.querySelector('.personal__ref-invite')) {
  document.querySelector('.personal__ref-invite').addEventListener('click', () => {
    setTimeout(() => {
      $shareMenu.classList.add('personal__ref-share--active');
    });
  });
}

// close share menu on outer click
document.addEventListener('click', e => {
  const $activeShareMenu = document.querySelector('.personal__ref-share--active');

  if ($activeShareMenu && !e.target.closest('.personal__ref-share')) {
    $activeShareMenu.classList.remove('personal__ref-share--active');
  }
});
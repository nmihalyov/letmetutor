const showNotification = id => {
  const $notification = document.querySelector(`.header-notification[data-notification="${id}"]`);
  $notification.classList.add('header-notification--active');
  
  setTimeout(() => {
    $notification.classList.remove('header-notification--active');
  }, 4000);
};

const sendForm = (queryUrl, element, useCallback = false) => {
  fetch(queryUrl, {
    method: "POST",
    credentials: "same-origin",
    body: new FormData(element)
  })
  .then(res => res.json()).then(json => {
    if (json.success) {
      showNotification("success");
      element.querySelector('button[type="submit"]').classList.remove('button--loading');
    } else {
      element.querySelector('button[type="submit"]').classList.remove('button--loading');
      console.log(json);
      json.errors.forEach(error => {
        if(error.indexOf(';') !== -1) {
          var split = error.split(';');
          if(element.querySelector('[name="'+split[0]+'"]').closest('label').classList.contains('textarea')) {
            element.querySelector('[name="'+split[0]+']"').closest('label').classList.add('textarea--error');
            element.querySelector('[name="'+split[0]+']"').closest('label').querySelector('.textarea__error').innerHTML = split[1];
          }
          else if(element.querySelector('[name="'+split[0]+'"]').closest('label').classList.contains('input')) {
            element.querySelector('[name="'+split[0]+'"]').closest('label').classList.add('input--error');
            element.querySelector('[name="'+split[0]+'"]').closest('label').querySelector('.input__error').innerHTML = split[1];
          }
        } else {
          console.log(error);
          if (useCallback !== false) useCallback(error);
        }
      });
    }
  });
};
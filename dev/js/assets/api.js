// Объект глобального API
const $api = {};

// API для работы с попапами
$api.popup = ($popup, { onHide, onShow } = {}) => {
  // Отключает возможность скроллить страницу
  const hideOverflow = () => {
    document.body.style.cssText = `position: fixed; margin-top: ${-window.scrollY}px`;
  };
  
  // Включает возможность скроллить страницу
  const showOverflow = offset => {
    document.body.style.cssText = 'position: static; margin-top: 0';
    
    window.scrollTo(0, offset);
  };
  
  return {
    // Возвращает true, если попап показывается, в ином случае false
    isShown: () => $popup.classList.contains('popup--opened'),
    // Показывает попап
    show() {
      const promise = new Promise(resolve => {
        $popup.style.display = 'block';
        resolve();
      });

      hideOverflow();

      promise.then(() => {
        $popup.classList.add('popup--opened');
        if (typeof onShow === 'function') {
          onShow();
        }
      });
    },
    // Скрывает попап
    hide() {
      const offset = -parseInt(document.body.style.marginTop);
  
      $popup.classList.remove('popup--opened');
      setTimeout(() => {
        $popup.style.display = 'none';
        showOverflow(offset);
        if (typeof onHide === 'function') {
          onHide();
        }
      }, 300);
    }
  };
};

// API для валидации форм
$api.validate = (form, request) => {
  const emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const setInvalidInput = input => {
    if (input.closest('.input')) {
      input.closest('.input').classList.add('input--error');
    } else if (input.closest('.textarea')) {
      input.closest('.textarea').classList.add('textarea--error');
    }
    input.focus();
  };
  const setInvalidCheckbox = input => {
    input.closest('.checkbox').classList.add('checkbox--error');
  };

  form.querySelector('button[type="submit"]').addEventListener('click', e => {
    e.preventDefault();

    let formIsValid = true;
    const $formInputs = Array.from(form.querySelectorAll('input[required], textarea[required]'));
    const $checkboxSelect = form.querySelectorAll('.checkboxselect');

    $formInputs.reverse().map(el => {
      if (el.dataset.passRepeat && el.value !== el.closest('form').querySelector('input[data-pass]').value) {
        setInvalidInput(el);
      }

      switch(el.getAttribute('type')) {
        case 'text':
        case 'password':
          if (el.value === '') {
            setInvalidInput(el);
            formIsValid = false;
          }
          break;
        case 'tel':
          if (el.value === '' || el.value.includes('_')) {
            setInvalidInput(el);
            formIsValid = false;
          }
          break;
        case 'checkbox':
          if (!el.checked) {
            setInvalidCheckbox(el);
            formIsValid = false;
          }
          break;
        case 'email':
          if (!emailRegexp.test(el.value)) {
            setInvalidInput(el);
            formIsValid = false;
          }
          break;
        default:
          if (el.value === '') {
            setInvalidInput(el);
            formIsValid = false;
          }
      }
    });
  
    if ($checkboxSelect.length) {
      Array.from($checkboxSelect).map(el => {
        let checked = false;
  
        Array.from(el.querySelectorAll('.checkbox__input')).map(checkbox => {
          if (checkbox.checked) {
            checked = true;
          }
        });
  
        if (!checked) {
          el.classList.add('checkboxselect--error');
          formIsValid = false;
        }
      });
    }

    if (formIsValid) {
      request();
    }
  });

  Array.from(form.querySelectorAll('input')).concat(Array.from(form.querySelectorAll('textarea'))).map(el => el.addEventListener('input', () => {
    if (el.closest('.input')) {
      el.closest('.input').classList.remove('input--error');
    } else if (el.closest('.checkbox')) {
      el.closest('.checkbox').classList.remove('checkbox--error');
    } else if (el.closest('.textarea')) {
      el.closest('.textarea').classList.remove('textarea--error');
    }
  }));
};
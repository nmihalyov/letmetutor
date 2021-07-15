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
$api.validate = form => {
  const emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const setInvalidInput = input => {
    input.closest('.input').classList.add('input--error');
    input.focus();
  };

  form.querySelector('button[type="submit"]').addEventListener('click', e => {
    e.preventDefault();

    const $formInputs = Array.from(form.querySelectorAll('input[required]'));

    $formInputs.reverse().map(el => {
      switch(el.getAttribute('type')) {
        case 'text':
        case 'password':
          el.value === '' && setInvalidInput(el);
          break;
        case 'email':
          !emailRegexp.test(el.value) && setInvalidInput(el);
          break;
      }
    });
  });

  Array.from(form.querySelectorAll('input')).map(el => el.addEventListener('input', () => {
    el.closest('.input').classList.remove('input--error');
  }));
};
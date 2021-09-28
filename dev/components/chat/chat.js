const $dialogContainer = document.querySelector('.chat__grid');
const $dialogList = document.querySelector('.chat__aside');
const $dialogListItems = Array.from(document.querySelectorAll('.chat-item'));
const $dialogWarning = document.querySelector('.chat__head-warning');
const $dialogWindow = document.querySelector('.chat__dialog');
const $dialogWindowContainer = document.querySelector('.chat__dialog-container');
const $dialogInputField = document.querySelector('.chat__footer-input');
const $dialogForm = document.querySelector('.chat__footer-container');
const $dialogContextMenu = document.querySelector('.chat__context');
const $dialogDeleteMessageBtn = document.querySelector('.js-popup[data-popup="dialog-delete"] [data-delete]');
let screenOffset = 0;

// custom form submit event
const formSubmitEvent = new Event('formSubmit');

// destroy dialog context menu
const contextDestroy = deleteMessage => {
  if (document.querySelector('.chat__context--shown')) {
    $dialogContextMenu.classList.remove('chat__context--shown');
    
    if (window.innerWidth < 760 && !deleteMessage) {
      document.body.style.cssText = 'position: static; margin-top: 0';
      
      window.scrollTo(0, screenOffset);
    }
  }
};

if ($dialogList) {
  $dialogList.fakeScroll();
}

// set height of form textarea field
const setDialogInputHeight = () => {
  $dialogInputField.style.height = '5px';
  $dialogInputField.style.height = $dialogInputField.scrollHeight + 3 + 'px';
};

const scrollChatToBottom = () => {
  const $chatScrollContainer = $dialogWindow.querySelector('.fakeScroll__content');
  $chatScrollContainer.scrollTop = $chatScrollContainer.scrollHeight;
};

// dialog warning handling
if ($dialogWarning) {
  if (!JSON.parse(localStorage.getItem('letmetutor:dialogWarningIsHidden'))) {
    $dialogWarning.classList.add('chat__head-warning--shown');
  
    document.querySelector('.chat__head-warning-close').addEventListener('click', () => {
      $dialogWarning.remove();
      localStorage.setItem('letmetutor:dialogWarningIsHidden', true);
    });
  } else {
    $dialogWarning.remove();
  }
}

// go back to dialog lists on mobile devices
document.querySelector('.chat__head-back').addEventListener('click', () => {
  $dialogContainer.classList.remove('chat__grid--inner');
});

// toggle current dialog
if ($dialogListItems) {
  $dialogListItems.map(el => el.addEventListener('click', e => {
    el.querySelector('.chat-item__container').style = '';
    el.querySelector('.chat-item__delete').style = '';
  
    
    if ((window.innerWidth > 759 && !el.classList.contains('chat-item--active')) || !e.target.closest('.chat-item__delete')) {
      $dialogContainer.classList.add('chat__grid--inner');
  
      document.querySelector('.chat-item--active').classList.remove('chat-item--active');
      el.classList.add('chat-item--active');
  
      if (el.querySelector('.chat-item__counter')) {
        el.querySelector('.chat-item__counter').remove();
      }
  
      document.querySelector('.chat__head-image').style.backgroundImage = el.querySelector('.chat-item__image').style.backgroundImage;
      document.querySelector('.chat__head-name').innerText = el.querySelector('.chat-item__name').innerText;
    }
  }));
}

// handle input field
if ($dialogInputField) {
  $dialogInputField.addEventListener('input', setDialogInputHeight);
}

// set scroll on dialog window
if ($dialogWindow) {
  $dialogWindow.fakeScroll();
  $dialogWindow.querySelector('.fakeScroll__content').addEventListener('scroll', () => {
    contextDestroy();
  });

  scrollChatToBottom();
}

if ($dialogForm) {
  // custom form submit event handler
  $dialogForm.addEventListener('formSubmit', () => {
    const message = $dialogInputField.value;
  
    if (message.replace(/\s/g, '').length === 0) {
      $dialogInputField.focus();
    
      return false;
    }
  
    if ($dialogForm.dataset.action === 'send') {
      const $messageElement = `<div class="chat__message chat__message--right" data-id="${+document.querySelector('.chat__message:last-child').dataset.id + 1}">
        <p class="chat__message-text">${message}</p>
        <p class="chat__message-time">${Intl.DateTimeFormat('ru-Ru', {hour: 'numeric', minute: 'numeric'}).format(Date.now())}</p>
      </div>`;
    
      $dialogWindowContainer.insertAdjacentHTML('beforeend', $messageElement);
      scrollChatToBottom();
    } else if ($dialogForm.dataset.action === 'edit') {
      document.querySelector(`.chat__message[data-id="${$dialogForm.dataset.id}"] .chat__message-text`).innerText = message;
      $dialogForm.classList.remove('chat__footer-container--edit');
      $dialogForm.dataset.action = 'send';
    }
  
    $dialogInputField.value = '';
    $dialogInputField.focus();
    setDialogInputHeight();
  });

  // send message handlers
  $dialogForm.addEventListener('submit', e => {
    e.preventDefault();
  
    $dialogForm.dispatchEvent(formSubmitEvent);
  });

  $dialogForm.addEventListener('keypress', e => {
    const keycode = e.keyCode ? e.keyCode : e.which;
  
    if (keycode === 13 && !e.shiftKey) {
      e.preventDefault();
      $dialogForm.dispatchEvent(formSubmitEvent);
    }
  });
}

// handle message context menu
document.addEventListener('click', e => {
  const $this = e.target;

  if ($this.classList.contains('chat__message-text') && $this.closest('.chat__message--right')) {
    const messageID = $this.parentNode.dataset.id;

    $dialogContextMenu.classList.add('chat__context--shown');
    $dialogContextMenu.style.cssText = `left: ${e.clientX + 10}px; top: ${e.clientY + scrollY + 10}px;`;

    $dialogDeleteMessageBtn.dataset.id = messageID;
    $dialogForm.dataset.id = messageID;

    if (window.innerWidth < 760) {
      screenOffset = window.scrollY;
      document.body.style.cssText = `position: fixed; margin-top: ${-window.scrollY}px`;
    }
  } else {
    contextDestroy($this.closest('[data-action="delete"]'));
  }
});

// delete chat message
if ($dialogDeleteMessageBtn) {
  $dialogDeleteMessageBtn.addEventListener('click', () => {
    document.querySelector(`.chat__message[data-id="${$dialogDeleteMessageBtn.dataset.id}"]`).remove();
  });
}

// handle context edit click
if (document.querySelector('.chat__context-item[data-action="edit"]')) {
  document.querySelector('.chat__context-item[data-action="edit"]').addEventListener('click', () => {
    const originalMessageText = document.querySelector(`.chat__message[data-id="${$dialogForm.dataset.id}"] .chat__message-text`).innerText;
  
    $dialogForm.classList.add('chat__footer-container--edit');
    $dialogForm.dataset.action = 'edit';
    $dialogInputField.focus();
    $dialogInputField.value = originalMessageText;
    document.querySelector('.chat__edit-text').innerText = originalMessageText;
    setDialogInputHeight();
  });
}

// cancel message editing
if (document.querySelector('.chat__edit-cancel')) {
  document.querySelector('.chat__edit-cancel').addEventListener('click', () => {
    $dialogForm.classList.remove('chat__footer-container--edit');
    $dialogForm.dataset.action = 'send';
    $dialogInputField.focus();
    $dialogInputField.value = '';
    setDialogInputHeight();
  });
}

// handle delete dialog on mobile devices
const swipeCoordinates = {
  start: null,
  end: null,
  diff: null
};

if ($dialogListItems) {
  $dialogListItems.map(el => {
    const $chatItemContainer = el.querySelector('.chat-item__container');
    const $chatItemDelete = el.querySelector('.chat-item__delete');
  
    el.addEventListener('touchstart', e => {
      $dialogListItems.map(item => {
        if (item !== el) {
          item.querySelector('.chat-item__container').style.transform = 'translateX(0)';
          item.querySelector('.chat-item__delete').style.transform = 'translateX(0)';
        }
      });
  
      $chatItemContainer.style.transition = 'none';
      $chatItemDelete.style.transition = 'none';
  
      swipeCoordinates.start = e.touches[0].clientX;
    }, false);
  
    el.addEventListener('touchmove', e => {
      const currentCoordinate = e.touches[0].clientX;
      const diff = swipeCoordinates.start - currentCoordinate;
    
      swipeCoordinates.end = currentCoordinate;
      swipeCoordinates.diff = diff;
  
  
      if (diff > 0 && diff < 120) {
        $chatItemContainer.style.transform = `translateX(-${diff}px)`;
        $chatItemDelete.style.transform = `translateX(-${diff}px)`;
      }
    }, false);
  
    el.addEventListener('touchend', e => {    
      e.stopPropagation();
      const dest = swipeCoordinates.diff < 60 ? 0 : -120;
      
      $chatItemContainer.style.cssText = `
        transition: transform .3s ease;
        transform: translateX(${dest}px);
      `;
      $chatItemDelete.style.cssText = `
        transition: transform .3s ease;
        transform: translateX(${dest}px);
      `;
    }, false);
  });
}
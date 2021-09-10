const showNotification = id => {
  const $notification = document.querySelector(`.header-notification[data-notification="${id}"]`);
  $notification.classList.add('header-notification--active');
  
  setTimeout(() => {
    $notification.classList.remove('header-notification--active');
  }, 4000);
};
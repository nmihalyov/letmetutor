const $profileVideoCover = document.querySelector('.profile-about__video-cover');

// play vide on about section
if ($profileVideoCover) {
  $profileVideoCover.addEventListener('click', () => {
    $profileVideoCover.classList.add('profile-about__video-cover--hidden');
    $profileVideoCover.parentNode.querySelector('video').play();
  });
}
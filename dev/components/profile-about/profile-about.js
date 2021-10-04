const $profileVideoCover = document.querySelector('.profile-about__video-cover');

// play vide on about section
if ($profileVideoCover) {
  $profileVideoCover.addEventListener('click', () => {
    const $video = $profileVideoCover.parentNode.querySelector('iframe');
    
    $profileVideoCover.parentNode.querySelector('iframe').setAttribute('src', $video.getAttribute('src') + '?autoplay=1');
    $profileVideoCover.classList.add('profile-about__video-cover--hidden');
  });
}
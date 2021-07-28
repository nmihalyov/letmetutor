// handle tabs logic
Array.from(document.querySelectorAll('.tabs__item')).map(el => el.addEventListener('click', e => {
  e.preventDefault();
  const target = el.dataset.tab;
  const $activeTabContent = el.closest('[data-tabs]').querySelector('[data-active]');

  el.closest('.tabs').querySelector('.tabs__item--active').classList.remove('tabs__item--active');
  el.classList.add('tabs__item--active');

  if ($activeTabContent) {
    el.closest('[data-tabs]').querySelector('[data-active]').removeAttribute('data-active');
    el.closest('[data-tabs]').querySelector(`[data-content="${target}"]`).setAttribute('data-active', true);
  }
}));
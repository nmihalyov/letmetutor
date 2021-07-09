Array.from(document.querySelectorAll('.tabs__item')).map(el => el.addEventListener('click', e => {
  const $this = e.currentTarget;
  const target = $this.dataset.tab;

  $this.closest('.tabs').querySelector('.tabs__item--active').classList.remove('tabs__item--active');
  $this.classList.add('tabs__item--active');

  $this.closest('[data-tabs]').querySelector('[data-active]').removeAttribute('data-active');
  $this.closest('[data-tabs]').querySelector(`[data-content="${target}"]`).setAttribute('data-active', true);
}));
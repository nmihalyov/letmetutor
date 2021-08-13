const $catalogMoreBtn = document.querySelector('.js-catalog-more');

if ($catalogMoreBtn) {
  const $prevArrow = document.querySelector('.pagination__arrow--prev');
  const $nextArrow = document.querySelector('.pagination__arrow--next');
  const $separator = document.querySelector('.pagination__separator');

  // catalog pages state
  const catalogPages = {
    current: [1],
    total: parseInt(document.querySelector('.catalog__items').dataset.total)
  };

  // set pagination current page
  const setCurrentPage = currentPage => {
    Array.from(document.querySelectorAll('.pagination__page--current')).map(el => el.classList.remove('pagination__page--current'));
    document.querySelector(`.pagination__page[data-page="${currentPage}"]`).classList.add('pagination__page--current');
  };

  // set pagination break
  const setBreak = latestPage => {
    const $beforeSeparatorItem = $separator.previousElementSibling;
    const $firstItem = document.querySelector('.pagination__page');

    if (+$beforeSeparatorItem.dataset.page === latestPage) {
      if (latestPage === catalogPages.total - 2) {
        $firstItem.remove();
        $separator.classList.add('pagination__separator--hidden');
        $separator.insertAdjacentHTML('beforebegin', `<a class="pagination__page" href="javascript:void(0)" data-page="${latestPage + 1}">${latestPage + 1}</a>`);
      } else if (latestPage < catalogPages.total - 2) {
        $firstItem.remove();
        $separator.insertAdjacentHTML('beforebegin', `<a class="pagination__page" href="javascript:void(0)" data-page="${latestPage + 1}">${latestPage + 1}</a>`);
        $separator.classList.remove('pagination__separator--hidden');
      }
    } else if (+$firstItem.dataset.page === latestPage && latestPage !== 1) {
      $beforeSeparatorItem.remove();
      document.querySelector('.pagination__pages').insertAdjacentHTML('afterbegin', `<a class="pagination__page" href="javascript:void(0)" data-page="${latestPage - 1}">${latestPage - 1}</a>`);
      $separator.classList.remove('pagination__separator--hidden');
    } else if (latestPage === catalogPages.total && !$separator.classList.contains('pagination__separator--')) {
      const $paginationPages = document.querySelectorAll('.pagination__page');

      $separator.classList.add('pagination__separator--hidden');
      Array.from($paginationPages).reverse().map((el, i) => {
        el.innerText = latestPage - i;
        el.dataset.page = latestPage - i;
      });
    }
  };

  // forming query url with filters values from url paramertres
  const formatURL = url => {
    let formattedURL = url;
    const filtersNames = Array.from(document.querySelectorAll('.filters__input-field')).map(el => el.name);
    
    new URL(location.href).searchParams.toString().split("&").map(el => {
      const [ key ] = el.split('=');
      if (filtersNames.includes(key)) {
        formattedURL += '&' + el;
      }
    });

    formattedURL += `&limit=${document.querySelector('.js-catalog-limit .dropdown__value').innerText}`;

    return formattedURL;
  };

  // generate catalog item element
  const catalogItemElement = ({ top, image, verified, name, country, subjects, location, description, link, rating, reviews, price }) => `
    <div class="tutorcard${top ? ' tutorcard--top' : ''}">
      <div class="tutorcard__image" style="background-image: url('img/inhtml/${image}')"></div>
      <div class="tutorcard__info">
        <div>
          <p class="tutorcard__name${verified ? ' tutorcard__name--verified' : ''}">${name}</p>
          <p class="tutorcard__location" data-loc=${country}>${location}</p>
          <div class="tutorcard__subjects">
            ${subjects.map(el => `
              <a class="tutorcard__subjects-item${el.search ? ' tutorcard__subjects-item--search' : ''}${el.hidden ? ' tutorcard__subjects-item--hidden' : ''}" href="javascript:void(0)">${el.name} <span>(опыт <b>${el.experience}</b>)</span></a>
            `).join('')}
            <a class="tutorcard__subjects-more js-tutorcard-more" href="javascript:void(0)">+2 предмета</a>
          </div>
          <p class="tutorcard__desc">${description}</p>
        </div><a class="tutorcard__more" href=${link}>Подробнее</a>
      </div>
      <div class="tutorcard__actions">
        <div class="tutorcard__actions-info">
          <div class="tutorcard__rating${parseInt(reviews) === 0 ? ' tutorcard__rating--empty' : ''}">
            <p class="tutorcard__rating-rate">${rating}</p>
            <p class="tutorcard__rating-reviews">(${reviews})</p>
          </div>
          <div class="tutorcard__cost">
            <p class="tutorcard__cost-value">${price} ₽</p>
            <p class="tutorcard__cost-desc">в час</p>
          </div>
        </div>
        <button class="button js-open-popup${top ? ' button--primary' : ' button--secondary'} tutorcard__btn" data-popup="request-auth">Оставить заявку</button>
      </div>
    </div>
  `;

  // load more catalog items
  $catalogMoreBtn.addEventListener('click', e => {
    e.preventDefault();

    $catalogMoreBtn.classList.add('button--loading');

    const latestPage = catalogPages.current[catalogPages.current.length - 1] + 1;
    const queryUrl = formatURL(`data/catalog.json?page=${latestPage}`);

    // set current pages
    catalogPages.current.push(latestPage);

    // set current pagintaion pages
    Array.from(document.querySelectorAll('.pagination__page')).map(el => {
      if (catalogPages.current.includes(parseInt(el.innerText))) {
        el.classList.add('pagination__page--current');
      }
    });

    fetch(queryUrl).then(res => res.json()).then(data => {
      data.map(item => {
        document.querySelector('.catalog__items').insertAdjacentHTML('beforeend', catalogItemElement(item));
      });

      if (latestPage === catalogPages.total) {
        $catalogMoreBtn.classList.add('catalog__bottom-btn--hidden');
        $nextArrow.classList.add('pagination__arrow--disabled');
      }

      $catalogMoreBtn.classList.remove('button--loading');
    });
  });

  // go to previous page
  $prevArrow.addEventListener('click', e => {
    e.preventDefault();

    const currentPage = catalogPages.current[0] - 1;
    const queryUrl = formatURL(`json/catalog.json?page=${currentPage}`);

    catalogPages.current = [currentPage];

    fetch(queryUrl).then(res => res.json()).then(data => {
      let $elements = '';
  
      data.map(item => {
        $elements += catalogItemElement(item);
      });

      document.querySelector('.pagination__arrow--next').classList.remove('pagination__arrow--disabled');
      setCurrentPage(currentPage);

      if (currentPage === 1) {
        $prevArrow.classList.add('pagination__arrow--disabled');
      }

      $catalogMoreBtn.classList.remove('catalog__bottom-btn--hidden');
      document.querySelector('.catalog__items').innerHTML = $elements;
    });

    if ($separator) {
      setBreak(currentPage);
    }
  });

  // go to next page
  $nextArrow.addEventListener('click', e => {
    e.preventDefault();

    const currentPage = catalogPages.current[catalogPages.current.length - 1] + 1;
    const queryUrl = formatURL(`data/catalog.json?page=${currentPage}`);

    catalogPages.current = [currentPage];

    fetch(queryUrl).then(res => res.json()).then(data => {
      let $elements = '';
  
      data.map(item => {
        $elements += catalogItemElement(item);
      });

      document.querySelector('.pagination__arrow--prev').classList.remove('pagination__arrow--disabled');
      setCurrentPage(currentPage);

      if (currentPage === catalogPages.total) {
        $catalogMoreBtn.classList.add('catalog__bottom-btn--hidden');
        $nextArrow.classList.add('pagination__arrow--disabled');
      }

      document.querySelector('.catalog__items').innerHTML = $elements;
  
      if ($separator) {
        setBreak(currentPage);
      }
    });
  });

  // go to specific page
  document.addEventListener('click', e => {
    const $this = e.target;

    if ($this.classList.contains('pagination__page')) {
      const currentPage = parseInt($this.dataset.page);
      const queryUrl = formatURL(`data/catalog.json?page=${currentPage}`);

      catalogPages.current = [currentPage];

      fetch(queryUrl).then(res => res.json()).then(data => {
        let $elements = '';
    
        data.map(item => {
          $elements += catalogItemElement(item);
        });
  
        setCurrentPage(currentPage);
  
        if (currentPage === catalogPages.total) {
          $prevArrow.classList.remove('pagination__arrow--disabled');
          $nextArrow.classList.add('pagination__arrow--disabled');
          $catalogMoreBtn.classList.add('catalog__bottom-btn--hidden');
        } else if (currentPage === 1) {
          $prevArrow.classList.add('pagination__arrow--disabled');
          $nextArrow.classList.remove('pagination__arrow--disabled');
          $catalogMoreBtn.classList.remove('catalog__bottom-btn--hidden');
        } else {
          $prevArrow.classList.remove('pagination__arrow--disabled');
          $nextArrow.classList.remove('pagination__arrow--disabled');
          $catalogMoreBtn.classList.remove('catalog__bottom-btn--hidden');
        }

        if ($separator) {
          setBreak(currentPage);
        }

        document.querySelector('.catalog__items').innerHTML = $elements;
      });
    }
  });
}
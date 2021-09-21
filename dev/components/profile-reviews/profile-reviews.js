const $reviewsMoreBtn = document.querySelector('.js-reviews-more');

if ($reviewsMoreBtn) {
  // reviews pages state
  const reviewsPages = {
    current: 1,
    total: parseInt(document.querySelector('meta[name="reviews-total"]').content)
  };
  // generate review element
  const reviewElement = ({ image, name, date, rating, feedback, tag }) => `
    <div class="profile-reviews__feedback">
      ${image ?
        `<div class="profile-reviews__feedback-image" style="background-image: url('${image}')"></div>` :
        '<div class="profile-reviews__feedback-image"></div>'
      }
      <div class="profile-reviews__feedback-info">
        <div class="profile-reviews__feedback-head">
          <div>
            <p class="profile-reviews__feedback-name">${name}</p>
            <p class="profile-reviews__feedback-date">${date}</p>
          </div>
          ${tag ? '<p class="profile-reviews__feedback-tag">' + tag + '</p>' : ''}
        </div>
        <div class="profile-reviews__rating-stars">
          ${[1, 2, 3, 4, 5].map(e => e <= rating ?
            '<div class="profile-reviews__rating-star profile-reviews__rating-star--full"></div>' :
            '<div class="profile-reviews__rating-star"></div>'
          ).join('')}
        </div>
        <p class="profile-reviews__feedback-text">${feedback}</p>
      </div>
    </div>
  `;

  // load more review on button click
  $reviewsMoreBtn.addEventListener('click', e => {
    e.preventDefault();
    const url = $reviewsMoreBtn.dataset.url;

    // increment current loaded reviews page
    ++reviewsPages.current;
    
    // load reviews
    fetch(`${url}?page=${reviewsPages.current}`)
    .then(res => res.json())
    .then(data => {
      data.data.map(review => {
        document.querySelector('.profile-reviews__feedbacks').insertAdjacentHTML('beforeend', reviewElement(review));

        if (reviewsPages.current === reviewsPages.total) {
          $reviewsMoreBtn.remove();
        }
      });
    });
  });
}
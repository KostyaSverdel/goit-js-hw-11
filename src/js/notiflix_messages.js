import { Notify } from 'notiflix';

const options = {
  width: '280px',
  position: 'left-top', // 'right-top' - 'right-bottom' - 'left-top' - 'left-bottom' - 'center-top' - 'center-bottom' - 'center-center'
  distance: '40px',
  cssAnimationDuration: 800,
  cssAnimationStyle: 'from-left', // 'fade' - 'zoom' - 'from-right' - 'from-top' - 'from-bottom' - 'from-left'
};

export function showMessage(searchResult, page, pages) {
  const totalHits = searchResult.totalHits;
  if (page === 1 && searchResult.hits.length) {
    Notify.success(`Hooray! We found ${totalHits} images.`, options);
  }
  if (!searchResult.hits.length) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
      options
    );
  }
  if (pages === page) {
    Notify.info(
      "We're sorry, but you've reached the end of search results.",
      options
    );
  }
}

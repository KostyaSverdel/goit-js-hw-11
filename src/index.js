import { fetchImages } from '../src/js/fetchImages';
import { createMarkup } from '../src/js/createMarkup';
import { showMessage } from './js/notiflix_messages';
import { galleryScroll } from './js/galleryScroll';
import { simpleLightbox } from './js/simple_lightbox';
import './js/scrollUp';

let userInput = '';
let page = 1;
let pages = 1;
const perPage = 40;
let isInfinityLoad;
let observerOptions = {
  root: null,
  rootMargin: '500px',
  threshold: 1.0,
};

const gallery = document.querySelector('.js-gallery');
const form = document.querySelector('#search-form');
const buttonLoad = document.querySelector('.js-load-more-button');
const observerTarget = document.querySelector('.js-observer-target');

form.addEventListener('submit', onSearch);
buttonLoad.addEventListener('click', onLoadGallery);

let observer = new IntersectionObserver(handleIntersect, observerOptions);

async function onSearch(event) {
  event.preventDefault();

  const newUserInput = event.currentTarget.elements.searchQuery.value.trim();

  if (userInput !== newUserInput) {
    userInput = newUserInput;
    pages = 1;
    onCleanGallery();
    observer.unobserve(observerTarget);
  }
  if (userInput && pages >= page) {
    isInfinityLoad ? observer.observe(observerTarget) : await onLoadGallery();
  }
}

function onCleanGallery() {
  gallery.innerHTML = '';
  observerTarget.textContent = '';
  buttonLoad.hidden = true;
  page = 1;
}

async function onLoadGallery() {
  const res = await getData();
  observerTarget.textContent = '';
  buttonLoad.hidden = true;
  createMarkup(res, gallery);
  simpleLightbox.refresh();
  if (pages === page) {
    observerTarget.textContent =
      "We're sorry, but you've reached the end of search results.";
  }
  if (page > 1 && !isInfinityLoad) galleryScroll(gallery);
  if (pages > page && !isInfinityLoad) buttonLoad.hidden = false;
  page += 1;
}

async function getData() {
  try {
    const responce = await fetchImages(userInput, page, perPage);
    pages = Math.ceil(responce.data.total / perPage);
    const searchResult = responce.data;
    showMessage(searchResult, page, pages);
    return searchResult.hits;
  } catch (error) {
    console.log('error :>> ', error.message);
  }
}

function handleIntersect(entries, observer) {
  entries.forEach(async entry => {
    if (entry.isIntersecting && userInput) await onLoadGallery();
    if (pages < page) {
      observer.unobserve(observerTarget);
    }
  });
}

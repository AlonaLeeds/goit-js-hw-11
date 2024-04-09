
import './css/styles.css';

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import NewsApiService from './js/pixabay-api';
import { lightbox } from './js/render-functions';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  searchForm: document.querySelector('.search-form'),
  galleryContainer: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

const loaderWrapper = document.querySelector('.preloader');

function showLoader() {
  loaderWrapper.style.display = 'block';
}

function hideLoader() {
  loaderWrapper.style.display = 'none';
}

let isShown = 0;
const newsApiService = new NewsApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

const options = {
  rootMargin: '50px',
  root: null,
  threshold: 0.3,
};
const observer = new IntersectionObserver(onLoadMore, options);

function onSearch(event) {
  event.preventDefault();

  const searchQuery = event.currentTarget.elements.searchQuery.value.trim();

  if (!searchQuery) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query!',
      position: 'topCenter',
    });
    return;
  }

  refs.galleryContainer.innerHTML = '';
  newsApiService.query = searchQuery;
  newsApiService.resetPage();

  isShown = 0;
  fetchGallery();
}

function onLoadMore() {
  newsApiService.incrementPage();
  fetchGallery();
}

async function fetchGallery() {
  refs.loadMoreBtn.classList.add('is-hidden');
  showLoader();

  try {
    const result = await newsApiService.fetchGallery();
    const { hits, total } = result;
    isShown += hits.length;

    if (!hits.length) {
      throw new Error('No images found');
    }

    onRenderGallery(hits);

    if (isShown < total) {
      Notify.success(`Hooray! We found ${total} images !!!`);
      refs.loadMoreBtn.classList.remove('is-hidden');
    } else {
      Notify.info("We're sorry, but you've reached the end of search results.");
    }
  } catch (error) {
    errorMessage(error.message);
  } finally {
    hideLoader();
  }
}

function onRenderGallery(elements) {
  const markup = elements.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
    return `
      <div class="photo-card">
        <a href="${largeImageURL}">
          <img class="photo-img" src="${webformatURL}" alt="${tags}" loading="lazy" />
        </a>
        <div class="info">
          <p class="info-item"><b>Likes</b> ${likes}</p>
          <p class="info-item"><b>Views</b> ${views}</p>
          <p class="info-item"><b>Comments</b> ${comments}</p>
          <p class="info-item"><b>Downloads</b> ${downloads}</p>
        </div>
      </div>
    `;
  }).join('');

  refs.galleryContainer.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

const iziToastParam = {
  title: '',    
  position: 'topRight',
  backgroundColor: '#ef4040',
  messageColor: '#fff',
  titleColor: '#fff',
  timeout: 3000,
  pauseOnHover: false, 
};

function errorMessage(message) {
  iziToast.error({
    ...iziToastParam,
    message: `${message}`,
  });
}
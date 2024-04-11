import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImages } from './js/pixabay-api';
import { getGallery } from './js/render-functions.js';

import './css/styles.css';

const searchForm = document.querySelector('.search-form');
const input = document.querySelector('.search-form__input');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.preloader');


searchForm.addEventListener('submit', handlerSearch);


//loader

function showLoader() {
    loader.classList.remove('is-hidden');
}

function hideLoader() {
    loader.classList.add('is-hidden');
}


function handlerSearch(event) {
    event.preventDefault();
  gallery.innerHTML = '';
  
  showLoader(); //loader
    
    loader.classList.remove('is-hidden');

    const inputSearchValue = input.value.trim();

    if (inputSearchValue === '') {
        errorMessage(`Please fill out the input field!`);
        searchForm.reset();

        loader.classList.add('is-hidden');

        return;            
    }

    fetchImages(inputSearchValue)
        .then(data => {            
            if (data.hits.length === 0) {
                errorMessage(`Sorry, there are no images matching your search query. Please try again!`);
                return;
            }
            getGallery(gallery, data.hits);            
        })
        .catch(error => console.log(error))
        .finally(() => {

            loader.classList.add('is-hidden');
            hideLoader();
            searchForm.reset(); 
        });
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
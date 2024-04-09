import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('form');
const searchInput = document.querySelector('input[type="text"]');
const gallery = document.querySelector('.gallery');

// css-loader
const loaderWrapper = document.querySelector('.loader-wrapper');
function showLoader() {
  loaderWrapper.style.display = 'block';
}
function hideLoader() {
  loaderWrapper.style.display = 'none';
}
// css-loader

function createImageCard(imageData) {
  return `
  <li class="gallery-item">
  <a class="gallery-link" href="${imageData.largeImageURL}">
    <img
      class="gallery-image"
      src="${imageData.webformatURL}"
      data-source="${imageData.largeImageURL}"
      alt="${imageData.tags}"
    />
  </a>
<ul class="parametrs-items">
<li class="parametrs-item"><h4>Likes</h4><span>${imageData.likes}</span></li>
<li class="parametrs-item"><h4>Views</h4><span>${imageData.views}</span></li>
<li class="parametrs-item"><h4>Comments</h4><span>${imageData.comments}</span></li>
<li class="parametrs-item"><h4>Downloads</h4><span>${imageData.downloads}</span></li>
</ul>
</li>
`;
}
hideLoader();
form.addEventListener('submit', event => {
  event.preventDefault();

  const searchQuery = searchInput.value.trim();

  if (!searchQuery) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query!',
      position: 'topCenter',
    });
    return;
  }

  form.reset();
  showLoader();
  gallery.innerHTML = '';

  fetch(
    `https://pixabay.com/api/?key=42170319-af092c1d236dd53a733e41db9&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`
  )
    .then(response => {
      hideLoader();
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.show({
          title: 'Error',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topCenter',
          backgroundColor: 'red',
          messageColor: '#fff',
        });
      } else {
        gallery.innerHTML = '';
        const imageCards = data.hits.map(imageData =>
          createImageCard(imageData)
        );
        gallery.innerHTML = imageCards.join('');
        const galleryList = new SimpleLightbox('.gallery a', {
          captionDelay: 250,
          captionsData: 'alt',
        });
        galleryList.refresh();
      }
    })
    .catch(error => console.log(error));
});
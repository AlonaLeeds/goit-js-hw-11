import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const API_KEY = "43218628-434600724cd02d3e35d2dc910";
const API_URL = "https://pixabay.com/api/";

const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const gallery = document.querySelector("#gallery");

searchForm.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const searchTerm = searchInput.value.trim();

  if (!searchTerm) {
    iziToast.error({
      title: "Error",
      message: "Please enter a search term",
    });
    return;
  }

  searchImages(searchTerm);
}

function searchImages(searchTerm) {
  fetch(`${API_URL}?key=${API_KEY}&q=${searchTerm}&image_type=photo&orientation=horizontal&safesearch=true`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }
      return response.json();
    })
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.info({
          title: "Info",
          message: "Sorry, there are no images matching your search query. Please try again!",
        });
        return;
      }
      displayImages(data.hits);
    })
    .catch(error => {
      iziToast.error({
        title: "Error",
        message: error.message,
      });
    });
}

function displayImages(images) {
  gallery.innerHTML = "";
  images.forEach(image => {
    const img = document.createElement("img");
    img.src = image.webformatURL;
    img.alt = image.tags;
    gallery.appendChild(img);
  });
}
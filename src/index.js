import Notiflix from "notiflix";


const API_KEY = "37254887-1c916d48415972de0f5a632e0";
const API_URL = "https://pixabay.com/api/";

const searchGalleryForm = document.getElementById("search-form");
const galleryMarkup = document.querySelector(".gallery");

function getElGallery(searchId) {

  return fetch(`${API_URL}?key=${API_KEY}&q=${searchId}&image_type=photo&orientation=horizontal&safesearch=true`).then((response) => response.json());

}

searchGalleryForm.addEventListener("submit", hendleFormSearchGallery);


function hendleFormSearchGallery(e) {

  e.preventDefault();

  let searshQuery = e.currentTarget.elements.searchQuery.value;

  if (searshQuery.length === 0) {
    throw new Error(Notiflix.Notify.failure('Qui timide rogat docet negare'));
  }

  getElGallery(searshQuery).then(({ hits }) => {
    return hits.reduce((markup, hit) => {markup + getMarkupImages(hit)}, "")
  }).catch((error) => console.log(error));

  e.currentTarget.reset();
}


function getMarkupImages({webformatURL, tags, likes, views, comments, downloads}) {

  return galleryMarkup.insertAdjacentHTML("afterbegin", 
    
  `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${downloads}</b>
    </p>
  </div>
</div>`);
  
}







import Notiflix from "notiflix";
import { fetchImages } from "./script/api";



const searchGalleryForm = document.getElementById("search-form");
const galleryMarkup = document.querySelector(".gallery");
const loadBtnGallery = document.querySelector(".load-more");

let page = 1;
let perPage = 40;
let searchValue = "";

searchGalleryForm.addEventListener("submit", hendleFormSearchGallery);
loadBtnGallery.addEventListener("click", hendlePageLoadMore);


function createGallery(pictures) {

    if (!galleryMarkup) {
      return;
    }

  const markup = pictures.map(picture => {

    const {

      webformatURL,
      tags,
      likes,
      views,
      comments,
      downloads

    } = picture;

      return `<div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" width="322" height="226"/>
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
     </div>`
    
    }).join("");

   galleryMarkup.insertAdjacentHTML("beforeend", markup);
  } 



async function hendleFormSearchGallery(e) {

  e.preventDefault();

  const searchQuery = e.currentTarget.elements.searchQuery.value.trim();
  page = 1;
  searchValue = searchQuery
  clearMarkup()
  hideBtnLoadMore();

  if (searchValue === "") {
    onError();
    return;
  }

  const response = await fetchImages(searchValue, page, perPage);
   
    if (response.totalHits === 0) {
      onError();
    } else {
      createGallery(response.hits);
      showBtnLoadMore()
      Notiflix.Notify.success(`Hooray! We found ${response.totalHits} images.`);
    }

  e.target.reset();
}




async function hendlePageLoadMore() {

  page += 1;

  const response = await fetchImages(searchValue, page, perPage)

    createGallery(response.hits);

    const totalPages = response.totalHits / perPage;

    if (page > totalPages) {
      hideBtnLoadMore();
      onErrorResultImages();
      return;
    }

}




function clearMarkup() {
  galleryMarkup.innerHTML = "";
}


function onError() {
  Notiflix.Notify.failure('Error!!!');
}

function onErrorResultImages() {
  Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.")
}

// function disabledBtnLoadMore() {
//   loadBtnGallery.setAttribute("disabled", false);
// }

// function enabledBtnLoadMore() {
//   loadBtnGallery.setAttribute("disabled", true);
// };

function showBtnLoadMore() {
  loadBtnGallery.style.display = "block";
}

function hideBtnLoadMore() {
  loadBtnGallery.style.display = "none";
}













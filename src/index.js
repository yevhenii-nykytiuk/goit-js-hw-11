import Notiflix from "notiflix";
import { getElGallery } from "./script/api";


const searchGalleryForm = document.getElementById("search-form");
const galleryMarkup = document.querySelector(".gallery");
const loadBtnGallery = document.querySelector(".load-more");

let page = 1;
let searchValue = "";

searchGalleryForm.addEventListener("submit", hendleFormSearchGallery);
loadBtnGallery.addEventListener("click", hendlePageLoadMore);


function hendleFormSearchGallery(e) {

  e.preventDefault();

  const form = e.currentTarget;
  const searshQuery = form.elements.searchQuery.value.trim();

  page = 1;

  searchValue = searshQuery;

  clearMarkup()

  getElGallery(searchValue).then(({ hits }) => {
    if (searchValue.length === 0) {
      throw new Error("Not data!");
    }

    return hits.reduce((markup, hit) => { markup + getMarkupImages(hit) }, "")
    
  }).catch(onError);

  e.currentTarget.reset();
}



function getMarkupImages({webformatURL, tags, likes, views, comments, downloads}) {
  galleryMarkup.insertAdjacentHTML("afterbegin", 
  `<div class="photo-card">
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
</div>`);
  
}

function hendlePageLoadMore() {

  page += 1;

  getElGallery(searchValue, page)
  fetchMarkup();
}

function fetchMarkup() {
  then(({ hits }) => {
    if (searchValue.length === 0) {
      throw new Error("Not data!");
    }
    return hits.reduce((markup, hit) => { markup + getMarkupImages(hit) }, "")   
  }).catch(onError);
}

function clearMarkup() {
  galleryMarkup.innerHTML = "";
}

function onError() {
  throw new Error(Notiflix.Notify.failure('Qui timide rogat docet negare'));
}











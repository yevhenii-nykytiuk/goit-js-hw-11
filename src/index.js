import Notiflix from "notiflix";
import { getElGallery, getMarkup } from "./script/api";


const searchGalleryForm = document.getElementById("search-form");
const galleryMarkup = document.querySelector(".gallery");
const loadBtnGallery = document.querySelector(".load-more");

let page = 1;
let searchValue = "";

searchGalleryForm.addEventListener("submit", hendleFormSearchGallery);


function hendleFormSearchGallery(e) {

  e.preventDefault();

  const form = e.currentTarget;
  const searshQuery = form.elements.searchQuery.value;

  
  getElGallery(searshQuery).then(({ hits }) => {
    if (searshQuery.length === 0) {
      throw new Error(Notiflix.Notify.failure('Qui timide rogat docet negare'));
    }

    return hits.reduce((markup, hit) => { markup + getMarkupImages(hit) }, "")
    
  }).catch((error) => console.log(error));

  e.currentTarget.reset();
}


function getMarkupImages({webformatURL, tags, likes, views, comments, downloads}) {
  return galleryMarkup.insertAdjacentHTML("afterbegin", getMarkup(webformatURL, tags, likes, views, comments, downloads));
  
}

loadBtnGallery.addEventListener("click", function () {
  page += 1;
  getElGallery(searchValue, page);
})










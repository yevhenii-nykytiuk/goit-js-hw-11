const API_KEY = "37254887-1c916d48415972de0f5a632e0";
const API_URL = "https://pixabay.com/api/";

function getElGallery(searchId, page = 1) {

  return fetch(`${API_URL}?key=${API_KEY}&q=${searchId}&image_type=photo&orientation=horizontal&safesearch=true&per_page=5&page=${page}`).then((res) => res.json());

}

function getMarkup(webformatURL, tags, likes, views, comments, downloads) {
  return `<div class="photo-card">
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
</div>`

}

export {getElGallery, getMarkup};
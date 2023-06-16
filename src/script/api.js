import axios from "axios";

const API_KEY = "37254887-1c916d48415972de0f5a632e0";
const API_URL = "https://pixabay.com/api/";

function fetchImages(searchId, page = 1, perPage = 5) {

  return axios.get(`${API_URL}?key=${API_KEY}&q=${searchId}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${page}`);

}


export {fetchImages};
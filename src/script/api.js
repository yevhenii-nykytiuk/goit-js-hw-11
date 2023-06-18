import axios from "axios";


async function fetchImages(searchId, page = 1, perPage = 40) {

  try {
    const API_URL = `https://pixabay.com/api/?key=37254887-1c916d48415972de0f5a632e0&q=${searchId}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${page}`;

    const response = await axios.get(API_URL);

    return response.data;
    } catch (error) {
      console.log(error);
    }
  } 

  
export {fetchImages};
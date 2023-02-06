import axios from 'axios';

const API_KEY = '33346847-49a68cc77b2127185fe21774e';
const BASE_URL = 'https://pixabay.com/api/';

const params = new URLSearchParams({
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
});

export async function fetchImages(search, page, perPage) {
  return await axios.get(
    `${BASE_URL}?q=${search}&page=${page}&per_page=${perPage}`,
    { params }
  );
}

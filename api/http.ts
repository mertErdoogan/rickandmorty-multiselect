import axios from 'axios';

const httpApi = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default httpApi;
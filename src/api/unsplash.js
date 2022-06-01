import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.unsplash.com/',
    headers: {
        Authorization:
          "Client-ID f_K1K0bRYSen9KLXccDwGuLZTjHxF0pPW2oXKtH0sbA"
      }
});
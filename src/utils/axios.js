const { default: axios } = require('axios');

export const api = axios.create({
  baseURL: 'https://kresus.99starzplayers.com/v1/',
  headers: {
    'Content-Type': 'application/json'
  }
})
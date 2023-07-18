const { default: axios } = require('axios');

export const api = axios.create({
  baseURL: process.env.API_URL + '/v1',
  headers: {
    'Content-Type': 'application/json'
  }
})
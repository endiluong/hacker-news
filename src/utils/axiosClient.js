const axios = require('axios');

const { ENDPOINT } = process.env;

axios.defaults.baseURL = ENDPOINT;

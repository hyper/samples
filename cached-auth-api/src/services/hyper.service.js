const axios = require('axios');

axios.defaults.baseURL = 'https://api.hyper.co/v6';
axios.defaults.headers.Authorization = `Bearer ${process.env.HYPER_SECRET_KEY}`;

module.exports.retrieveLicense = async function retrieveLicense(id) {
  return axios.get(`/licenses/${id}`)
    .then((response) => response.data)
    .catch(() => null);
};

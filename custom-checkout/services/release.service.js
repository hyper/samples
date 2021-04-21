import axios from 'axios';

export const retrieveRelease = async function retrieveRelease(password) {
  return axios.get(`https://api.hyper.co/v5/releases`, {
    headers: { authorization: `Bearer ${process.env.HYPER_SECRET_KEY}` },
    params: { password, active: true }
  }).then((response) => response.data.data[0]);
};

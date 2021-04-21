import axios from 'axios';

export const createCheckout = async function createCheckout(data = {}) {
  return axios.post('https://api.hyper.co/v5/checkouts', data, {
    headers: { authorization: `Bearer ${process.env.NEXT_PUBLIC_HYPER_PUBLISHABLE_KEY}` }
  }).then((response) => response.data);
};

export const pollCheckout = async function pollCheckout(id, exitCondition = ((c) => c.status !== 'processing')) {
  return axios.get(`https://api.hyper.co/v5/checkouts/${id}`, {
    headers: { authorization: `Bearer ${process.env.NEXT_PUBLIC_HYPER_PUBLISHABLE_KEY}` }
  }).then(async (response) => {
    if (exitCondition(response.data)) return response.data;

    return new Promise((resolve) => {
      setTimeout(() => resolve(pollCheckout(id, exitCondition)), 1000);
    });
  });
};

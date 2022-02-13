import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost/api',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default {
  getPurchases() {
    return apiClient.get('/purchases');
  },
  getPurchase(id) {
    return apiClient.get(`/users/${id}/purcharse`);
  },
};

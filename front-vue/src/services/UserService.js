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
  getUsers() {
    return apiClient.get('/users');
  },
  register(credential) {
    return apiClient.post('/users', credential);
  },
  login(credential) {
    return apiClient.post('/login_check', credential);
  },
};

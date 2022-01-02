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

  createUser(credentials) {
    return apiClient.post('/users', credentials);
  },
  logUser(credentials) {
    return apiClient.post('/login_check', credentials);
  },
  //   registerUser() {
  //     return apiClient.post(baseURL);
  //   },
};

import axios from 'axios';

// const apiClient = axios.create({
//   baseURL: 'http://localhost/api',
//   withCredentials: false,
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//   },
// });
const BASE_URL = '//localhost/api';

export default {
  getUsers() {
    return axios.get(BASE_URL + '/users');
  },

  createUser(credentials) {
    return axios.post(BASE_URL + '/users', credentials);
  },

  logUser(credentials) {
    return axios.post('http://localhost/api/login_check', credentials);
  },
  registerUser(credentials) {
    return axios.post(BASE_URL + '/users', credentials);
  },
};

import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost/api/users',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default {
  getUsers() {
    return apiClient.get();
  },
  //   registerUser() {
  //     return apiClient.post(baseURL);
  //   },
};

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
  getProducts(page) {
    return apiClient.get('/products?page=' + page);
  },
  getProduct(id) {
    return apiClient.get('/products/' + id);
  },
  postProduct(product) {
    return apiClient.post('/products/', product);
  },
  editProduct(id) {
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*',

    return apiClient.patch('/products/', id);
  },
};

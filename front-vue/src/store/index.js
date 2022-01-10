import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import ProductService from '../services/ProductService';
import jwt_decode from 'jwt-decode';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    cartProducts: [],
    products: [],
    loading: true,
    admin: false,
  },
  // plugins: [createPersistedState()],
  getters: {
    products: (state) => {
      return state.products;
    },
    productsNumber(state) {
      // Cart Component
      return state.cartProducts.length;
    },
    totalPrice(state) {
      // Cart Component
      if (state.cartProducts.length != 0) {
        return state.cartProducts.reduce((a, b) => {
          console.log(state.cartProducts);
          return parseInt(b.price) == null
            ? parseInt(a)
            : parseInt(a) + parseInt(b.price);
        }, 0);
      }
    },
    loggedIn(state) {
      return !!state.user && localStorage.getItem('user') !== null;
    },
  },
  mutations: {
    ADD_CART(state, n) {
      // Cart Component
      return state.cartProducts.push(n);
    },
    REMOVE_CART(state, n) {
      // Cart Component
      let index = state.cartProducts.findIndex((x) => x.id === n);
      return state.cartProducts.splice(index, 1);
    },
    DELETE_PRODUCT(state, n) {
      // Cart Component
      let index = state.products.findIndex((x) => x.id === n);
      return state.products.splice(index, 1);
    },
    SET_USER_DATA(state, userData) {
      state.user = userData;
      const token = userData.token;
      const decoded = jwt_decode(token);
      const roles = decoded.roles;
      const admin = roles.find((role) => role === 'ROLE_ADMIN');
      if (admin) state.admin = true;
      localStorage.setItem('user', JSON.stringify(userData));
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${userData.token}`;
    },

    SET_REGISTRATION_DATA(state, userData) {
      state.user = userData;
    },
    CLEAR_USER_DATA() {
      localStorage.removeItem('user');
      location.reload();
    },
    SET_PRODUCTS(state, product) {
      state.products = product;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
  },
  actions: {
    deleteProduct({ commit }, id) {
      return ProductService.deleteProduct(id)

        .then(({ data }) => {
          console.log(data);
          commit('SET_PRODUCTS', data);
        })
        .catch((err) => console.log(err.message));
    },
    createProduct({ commit }, product) {
      return axios
        .post('//localhost/api/products', product)
        .then(({ data }) => {
          commit('SET_PRODUCTS', data);
        });
    },
    login({ commit }, credentials) {
      return axios
        .post('//localhost/api/login_check', credentials)
        .then(({ data }) => {
          commit('SET_USER_DATA', data);
        });
    },
    register({ commit }, credentials) {
      return axios
        .post('//localhost/api/users', credentials)
        .then(({ data }) => {
          commit('SET_REGISTRATION_DATA', data);
        });
    },
    logout({ commit }) {
      commit('CLEAR_USER_DATA');
    },
    fetchProducts({ commit }) {
      return ProductService.getProducts()
        .then((response) => response.data)
        .then((products) => {
          commit('SET_PRODUCTS', products);
          commit('SET_LOADING', false);
        })
        .catch((err) => console.log(err.message));
    },
  },
});

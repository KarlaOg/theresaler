import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import ProductService from '../services/ProductService';
import { getAdminRole } from '@/services/auth';
// import jwt_decode from 'jwt-decode';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    cartProducts: [],
    products: [],
    loading: true,
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
    loggedInAdmin(state) {
      return localStorage.getItem('admin') !== null && !!state.user;
    },
  },
  mutations: {
    inCart(state, n) {
      // Cart Component
      return state.cartProducts.push(n);
    },
    outCart(state, n) {
      // Cart Component
      let index = state.cartProducts.findIndex((x) => x.id === n);
      return state.cartProducts.splice(index, 1);
    },
    SET_USER_DATA(state, userData) {
      state.user = userData;
      localStorage.setItem('user', JSON.stringify(userData));
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${userData.token}`;
      //   const decoded = jwt_decode(userData);
      //   const roles = decoded.roles;
      //   const admin = roles.find((role) => role === 'ROLE_ADMIN');
      //   if (admin) {
      //     console.log('ADMIIIIIIN love');
      //   }

      localStorage.setItem('admin', true);
    },

    SET_REGISTRATION_DATA(state, userData) {
      state.user = userData;
    },
    CLEAR_USER_DATA() {
      const admin = getAdminRole();

      if (admin) {
        localStorage.removeItem('admin');
      }
      localStorage.removeItem('user');
      location.reload();
    },
    SET_PRODUCT(state, product) {
      state.products = product;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
  },
  actions: {
    createProduct({ commit }, product) {
      return axios
        .post('//localhost/api/products', product)
        .then(({ data }) => {
          commit('SET_PRODUCT', data);
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
    loadProducts({ commit }) {
      return ProductService.getProducts()
        .then((response) => response.data)
        .then((products) => {
          commit('SET_PRODUCT', products);
          commit('SET_LOADING', false);
        })
        .catch((err) => console.log(err.message));
    },
  },
});

import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import ProductService from '../services/ProductService';
import UserService from '../services/UserService';
import jwt_decode from 'jwt-decode';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    users: [],
    admin: false,
    loading: true,
    cartProducts: [],
    products: [],
    notifications: [],
    userInfo: null,
  },

  getters: {
    users: (state) => {
      return state.users;
    },
    loggedIn(state) {
      return !!state.user && localStorage.getItem('user') !== null;
    },
    products: (state) => {
      return state.products;
    },
    productsNumber(state) {
      return state.cartProducts.length;
    },
    totalPrice(state) {
      if (state.cartProducts.length != 0) {
        return state.cartProducts.reduce((a, b) => {
          console.log(state.cartProducts);
          return parseInt(b.price) == null
            ? parseInt(a)
            : parseInt(a) + parseInt(b.price);
        }, 0);
      }
    },
  },

  mutations: {
    SET_USER_DATA(state, userData) {
      state.user = userData;
      const token = userData.token;
      const decoded = jwt_decode(token);
      state.userInfo = decoded;
      const roles = decoded.roles;
      const admin = roles.find((role) => role === 'ROLE_ADMIN');
      if (admin) state.admin = true;
      localStorage.setItem('user', JSON.stringify(userData));
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${userData.token}`;
    },
    SET_USERS(state, user) {
      state.users = user;
    },
    SET_REGISTRATION_DATA(state, userData) {
      state.user = userData;
    },
    CLEAR_USER_DATA() {
      localStorage.removeItem('user');
      location.reload();
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_PRODUCTS(state, product) {
      state.products = product;
    },
    DELETE_PRODUCT(state, product) {
      let index = state.products.findIndex((x) => x.id === product);
      return state.products.splice(index, 1);
    },
    ADD_CART(state, n) {
      return state.cartProducts.push(n);
    },
    REMOVE_CART(state, n) {
      let index = state.cartProducts.findIndex((x) => x.id === n);
      return state.cartProducts.splice(index, 1);
    },
    PUSH_NOTIFICATION(state, notification) {
      let nextId = 1;
      state.notifications.push({
        ...notification,
        id: nextId++,
      });
    },
    DELETE_NOTIFICATION(state, notificationToRemove) {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== notificationToRemove.id
      );
    },
  },

  actions: {
    login({ commit }, credentials) {
      return axios
        .post('//localhost/api/login_check', credentials)
        .then(({ data }) => {
          commit('SET_USER_DATA', data);
        });
    },
    register({ commit, dispatch }, credentials) {
      return axios
        .post('//localhost/api/users', credentials)
        .then(({ data }) => {
          commit('SET_REGISTRATION_DATA', data);
          const notification = {
            type: 'success',
            message: 'Your account have been created. Login !',
          };
          dispatch('addNotification', notification, { root: true });
        });
    },
    logout({ commit }) {
      commit('CLEAR_USER_DATA');
    },
    fetchUsers({ commit }) {
      return UserService.getUsers().then(({ data }) => {
        commit('SET_USERS', data);
        commit('SET_LOADING', false);
      });
    },
    fetchProducts({ commit, dispatch }, { page }) {
      return ProductService.getProducts(page)
        .then((response) => response.data)
        .then((products) => {
          commit('SET_PRODUCTS', products);
          commit('SET_LOADING', false);
        })
        .catch((err) => {
          const notification = {
            type: 'error',
            message: 'There was a problem fetch' + err.message,
          };
          dispatch('addNotification', notification, { root: true });
        });
    },
    createProduct({ commit, dispatch }, product) {
      return axios
        .post('//localhost/api/products', product)
        .then(({ data }) => {
          commit('SET_PRODUCTS', data);
          const notification = {
            type: 'success',
            message: 'You product has been created',
          };
          dispatch('addNotification', notification, { root: true });
        });
    },
    editProduct({ commit, dispatch }, product) {
      return axios
        .patch('//localhost/api/products', product)
        .then(({ data }) => {
          commit('SET_PRODUCTS', data);
          const notification = {
            type: 'success',
            message: 'You product has been edit',
          };
          dispatch('addNotification', notification, { root: true });
        });
    },
    deleteProduct({ commit, dispatch }, product) {
      commit('DELETE_PRODUCT', product);
      const notification = {
        type: 'error',
        message: 'You product has been delete',
      };
      dispatch('addNotification', notification, { root: true });
      axios.delete(`//localhost/api/products/${product}`);
    },

    addNotification({ commit }, notification) {
      commit('PUSH_NOTIFICATION', notification);
    },
    removeNotification({ commit }, notificationToRemove) {
      commit('DELETE_NOTIFICATION', notificationToRemove);
    },
  },
});

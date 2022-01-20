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
    cartProducts: JSON.parse(localStorage.getItem('cart')) || [],
    products: [],
    notifications: [],
    userInfo: null,
    product: {},
    delivery: [],
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

    getProductById: (state) => (id) => {
      return state.products.find((product) => product.id === id);
    },
    totalPrice(state) {
      if (state.cartProducts.length != 0) {
        return state.cartProducts.reduce((a, b) => {
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
    SET_DELIVERY_DATA(state, del) {
      state.delivery = del;
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
    SET_PRODUCT(state, product) {
      state.product = product;
    },
    DELETE_PRODUCT(state, product) {
      let index = state.products.findIndex((x) => x.id === product);
      return state.products.splice(index, 1);
    },
    ADD_CART(state, product) {
      return state.cartProducts.push(product);
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

    fetchProduct({ commit, getters, dispatch }, id) {
      const product = getters.getProductById(id);
      if (product) {
        commit('SET_PRODUCT', product);
      } else {
        ProductService.getProduct(id)
          .then((response) => {
            commit('SET_PRODUCT', response.data);
          })
          .catch((error) => {
            const notification = {
              type: 'error',
              message:
                'There was a problem fetching products: ' + error.message,
            };
            dispatch('addNotification', notification, { root: true });
          });
      }
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
        .put(`//localhost/api/products/${product.id}`, product, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        .then(({ data }) => {
          commit('SET_PRODUCT', data);
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
        type: 'success',
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

    addCart({ commit }, product) {
      commit('ADD_CART', product);
      localStorage.setItem('cart', JSON.stringify(this.state.cartProducts));
    },
    removeCart({ commit }, product) {
      commit('REMOVE_CART', product);
      localStorage.setItem('cart', JSON.stringify(this.state.cartProducts));
    },

    delivery({ commit, dispatch }, data) {
      return axios.post('//localhost/api/purchases', data).then(({ pdt }) => {
        commit('SET_DELIVERY_DATA', pdt);
        const notification = {
          type: 'success',
          message: 'Your account have been created. Login !',
        };
        dispatch('addNotification', notification, { root: true });
      });
    },
  },
});

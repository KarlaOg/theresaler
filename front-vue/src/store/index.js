import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import ProductService from '../services/ProductService';
import UserService from '../services/UserService';
import jwt_decode from 'jwt-decode';
import { sendEmailRegister } from '../services/sendEmailRegister';
import PurchaseService from '../services/PurchaseService';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    users: [],
    admin: false,
    loading: true,
    cartProducts: JSON.parse(localStorage.getItem('cart')) || [],
    products: [],
    product: {},
    purchases: [],
    purchase: {},
    notifications: [],
    userInfo: null,
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
      return state.cartProducts
        .map((e) => e.quantity)
        .reduce(
          (accumulator, currentElement) => accumulator + currentElement,
          0
        );
    },

    getProductById: (state) => (id) => {
      return state.products.find((product) => product.id === id);
    },
    getPurchaseId: (state) => {
      return state.cartProducts.map(
        (e) => `/api/purchase_items/${e.purchaseId}`
      );
    },

    totalPrice(state) {
      return state.cartProducts
        .map((e) => e.price * e.quantity)
        .reduce(
          (accumulator, currentElement) =>
            parseInt(accumulator + currentElement),
          0
        );
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
    SET_DELIVERY(state, del) {
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
    SET_PURCHASE(state, purchase) {
      state.purchase = purchase;
    },
    SET_PURCHASES(state, purchase) {
      state.purchases = purchase;
    },
    DELETE_PRODUCT(state, product) {
      let index = state.products.findIndex((x) => x.id === product);
      return state.products.splice(index, 1);
    },
    ADD_CART(state, product) {
      const pdt = {
        id: product.id,
        name: product.name,
        price: product.price,
        brand: product.brand,
        description: product.description,
        mainPicture: product.mainPicture,
        quantity: product.quantity,
        totalPrice: product.totalPrice,
      };
      const indexItem = state.cartProducts.findIndex(
        (x) => x.id === product.id
      );
      if (indexItem >= 0) {
        state.cartProducts[indexItem].quantity += 1;
        state.cartProducts[indexItem].totalPrice += 1 * pdt.price;
      } else {
        pdt.quantity = 1;
        pdt.totalPrice = pdt.price;
        state.cartProducts.push(pdt);
      }

      localStorage.setItem('cart', JSON.stringify(this.state.cartProducts));
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
          sendEmailRegister(data.email, data.firstname);
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

    addCart({ commit, state }, product) {
      const productId = state.cartProducts.find((d) => d.id === product.id);
      commit('ADD_CART', product);
      if (productId === undefined) {
        return axios
          .post('//localhost/api/purchase_items', {
            product: `/api/products/${product.id}`,
            productName: product.name,
            productPrice: product.price,
            total: product.price,
            quantity: 1,
          })
          .then(function (reponse) {
            const id = reponse.data.id;
            const itemIndex = state.cartProducts.findIndex(
              (x) => x.id === product.id
            );
            state.cartProducts[itemIndex].purchaseId = id;
            localStorage.setItem('cart', JSON.stringify(state.cartProducts));
          });
      } else {
        const purchaseId = state.cartProducts.find(
          (d) => d.id === product.id
        ).purchaseId;
        const total = state.cartProducts.find(
          (d) => d.id === product.id
        ).totalPrice;
        const quantity = state.cartProducts.find(
          (d) => d.id === product.id
        ).quantity;
        return axios.put(`//localhost/api/purchase_items/${purchaseId}`, {
          product: `/api/products/${product.id}`,
          productName: state.cartProducts.name,
          productPrice: state.cartProducts.price,
          total: total,
          quantity: quantity,
        });
      }
    },

    removeCart({ state, commit }, product) {
      const purchaseId = state.cartProducts.find((d) => d.id === product);
      commit('REMOVE_CART', product);
      axios.delete(`//localhost/api/purchase_items/${purchaseId.purchaseId}`);
      localStorage.setItem('cart', JSON.stringify(this.state.cartProducts));
    },

    fetchPurchases({ commit, dispatch }) {
      return PurchaseService.getPurchases()
        .then(({ data }) => {
          commit('SET_PURCHASES', data);
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

    fetchPurchase({ commit, dispatch, state }) {
      return PurchaseService.getPurchase(state.userInfo.id)
        .then(({ data }) => {
          commit('SET_PURCHASE', data);
          commit('SET_LOADING', false);
        })
        .catch((error) => {
          const notification = {
            type: 'error',
            message: 'There was a problem fetching products: ' + error.message,
          };
          dispatch('addNotification', notification, { root: true });
        });
    },

    delivery({ commit, dispatch }, del) {
      return axios
        .post('//localhost/api/purchases', del)
        .then(({ data }) => {
          commit('SET_DELIVERY', data);
        })
        .catch((error) => {
          const notification = {
            type: 'error',
            message: 'There was a problem fetching products: ' + error.message,
          };
          dispatch('addNotification', notification, { root: true });
        });
    },
  },
});

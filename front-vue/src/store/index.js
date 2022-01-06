import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import ProductService from '../services/ProductService';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    infoPage: [],
    cartItems: [],
    items: [],
    loading: true,
  },
  // plugins: [createPersistedState()],
  getters: {
    items: (state) => {
      return state.items;
    },
    itemsNumber(state) {
      // Cart Component
      return state.cartItems.length;
    },
    totalPrice(state) {
      // Cart Component
      if (state.cartItems.length != 0) {
        return state.cartItems.reduce((a, b) => {
          console.log(state.cartItems);
          return parseInt(b.price) == null
            ? parseInt(a)
            : parseInt(a) + parseInt(b.price);
        }, 0);
      }
    },
    infoLength(state) {
      // Info Component
      if (state.infoPage.length > 0) {
        return state.infoPage.splice(0, 1);
      }
    },
    loggedIn(state) {
      return !!state.user && localStorage.getItem('user') !== null;
    },
  },
  mutations: {
    inCart(state, n) {
      // Cart Component
      return state.cartItems.push(n);
    },
    outCart(state, n) {
      // Cart Component
      let index = state.cartItems.findIndex((x) => x.id === n);
      return state.cartItems.splice(index, 1);
    },
    addtoInfo(state, n) {
      // Info Component
      return state.infoPage.push(n);
    },
    SET_USER_DATA(state, userData) {
      state.user = userData;
      localStorage.setItem('user', JSON.stringify(userData));
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${userData.token}`;
    },
    SET_USER_REGISTRATION_DATA(state, userData) {
      state.user = userData;
    },
    CLEAR_USER_DATA() {
      localStorage.removeItem('user');
      location.reload();
    },
    SET_ITEM(state, items) {
      state.items = items;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
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
    register({ commit }, credentials) {
      return axios
        .post('//localhost/api/users', credentials)
        .then(({ data }) => {
          commit('SET_USER_REGISTRATION_DATA', data);
        });
    },
    logout({ commit }) {
      commit('CLEAR_USER_DATA');
    },
    loadItems({ commit }) {
      return ProductService.getProducts()
        .then((response) => response.data)
        .then((items) => {
          commit('SET_ITEM', items);
          commit('SET_LOADING', false);
        })
        .catch((err) => console.log(err.message));
    },
  },
});

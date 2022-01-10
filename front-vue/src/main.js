import Vue from 'vue';
import './plugins/axios';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import store from './store';
import axios from 'axios';
// import { getAdminRole } from '@/services/auth';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,

  created() {
    // const admin = getAdminRole();
    // if (admin) {
    //   console.log('cest ADMIN !!!');
    // }
    const userString = localStorage.getItem('user');
    // const adminString = localStorage.getItem('admin');
    if (userString) {
      const userData = JSON.parse(userString);
      //   const adminData = JSON.parse(userString);
      this.$store.commit('SET_USER_DATA', userData);
    }

    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          this.$store.dispatch('logout');
        }
        return Promise.reject(error);
      }
    );
  },
  render: (h) => h(App),
}).$mount('#app');

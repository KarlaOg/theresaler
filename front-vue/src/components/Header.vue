<template>
  <div class="container-flex">
    <nav class="navbar navbar-light">
      <router-link to="/">
        <img src="@/assets/fi-logo.svg" width="50" height="50" />
        <span style="text-align: center">The Resealer</span>
      </router-link>
      <router-link v-if="loggedInAdmin" to="/admin/list-products">
        Dashboard <mark>ADMIN</mark>
      </router-link>
      <router-link v-if="loggedIn" to="/dashboard"> Dashboard </router-link>
      <router-link v-if="!loggedIn" to="/login" class="button">
        Login
      </router-link>
      <button v-else type="button" class="logoutButton" @click="logout">
        Logout
      </button>
      <div class="bag" @click="openCart">
        <img class="pb-1" src="@/assets/cart.svg" />
        <span class="mb-3" v-if="this.bagItemscount > 0">{{
          bagItemscount
        }}</span>
      </div>
      <!--Cart Component-->
      <Cart ref="cartMove" />
    </nav>
  </div>
</template>

<script>
import Cart from '@/components/Cart.vue';

import { authComputed } from '../store/helpers.js';
export default {
  components: {
    Cart,
  },
  computed: {
    ...authComputed,
    bagItemscount() {
      return this.$store.getters.productsNumber;
    },
  },
  methods: {
    openCart() {
      this.$refs.cartMove.cartON();
    },
    logout() {
      this.$store.dispatch('logout');
    },
  },
};
</script>

<style lang="scss" scoped>
a {
  font-weight: bold;
  color: #2c3e50;
  margin: auto 0.8em auto 0.4em;
  text-decoration: none;
  border-top: 2px solid transparent;
  border-bottom: 2px solid transparent;
}

button,
.button {
  margin-left: auto;
  text-decoration: none;
  color: #2c3e50;

  &.router-link-active {
    color: #2c3e50;
  }
}

.logoutButton {
  cursor: pointer;
}

nav {
  z-index: 100;
}
.navbar {
  border-bottom: 1px solid #dcdcdc;
  background-color: #f8f8f8;
}
.close {
  position: relative;
  bottom: 20px;
  left: 10px;
  font-size: 31px;
  color: #000;
}
.navbar-item.bc a {
  font-size: 17px;
  text-decoration: none;
  color: black;
}
.navbar-item.bc a:hover,
.navbar-item.bc a:active {
  color: #ffd700;
}
.btn-sm {
  border-radius: 0;
}
form .btn-xl.btn-success.mt-3 {
  position: relative;
  -webkit-transition-duration: 100ms;
  transition-duration: 100ms;
  width: 100%;
  height: 50px;
  font-size: 20px;
  outline: none;
  cursor: pointer;
  box-shadow: 0 26px 38px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.bag span {
  background-color: #6394f8;
  border-radius: 10px;
  color: white;
  position: absolute;
  font-size: 15px;
  line-height: 1;
  padding: 2px 3px 3px 3px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  margin-left: -9px;
  bottom: 1rem;
}
.bag img {
  cursor: pointer;
  width: 30px;
  height: auto;
}
.user {
  margin-right: 20px;
  padding-top: 10px;
}
.user:hover {
  text-decoration: underline;
}
</style>

<template>
  <div class="container-flex pt-2">
    <nav class="navbar header">
      <div v-if="!loggedIn" style="width: 110px"></div>
      <router-link v-if="admin && loggedIn" to="/admin/list-products">
        <mark>My account</mark>
      </router-link>
      <router-link v-if="!admin && loggedIn" to="/dashboard">
        My account
      </router-link>
      <div class="d-flex">
        <router-link to="/">
          <span style="text-align: center" class="logo">💸 THE RESEALER </span>
        </router-link>
      </div>
      <div class="d-flex">
        <router-link v-if="!loggedIn" to="/login" class="button">
          Login
        </router-link>
        <button v-else type="button" class="logoutButton" @click="logout">
          Logout
        </button>
        <div class="ml-4 bag">
          <router-link to="/cart">
            <img class="pb-1" src="@/assets/cart.svg" />
            <span class="mb-3" v-if="this.bagItemscount > 0">{{
              bagItemscount
            }}</span>
          </router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
export default {
  components: {},
  computed: {
    ...mapGetters(['loggedIn']),
    ...mapState(['admin']),
    bagItemscount() {
      return this.$store.getters.productsNumber;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push({ name: 'Home' });
    },
  },
};
</script>

<style lang="scss" scoped>
a {
  //   color: #2c3e50;
  margin: auto 0.8em auto 0.4em;
  text-decoration: none;
  border-top: 2px solid transparent;
  border-bottom: 2px solid transparent;
}

button,
.button {
  text-decoration: none;
}

.logoutButton {
  cursor: pointer;
}

nav {
  z-index: 100;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.bag span {
  background-color: #6394f8;
  border-radius: 10px;
  color: white;
  position: absolute;
  font-size: 10px;
  width: 15px;
  line-height: 1;
  padding: 3px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  margin-left: -9px;
  bottom: 2rem;
}
.bag img {
  cursor: pointer;
  width: 25px;
  height: auto;
}

.logo {
  font-weight: bold;
  font-size: 25px;
}

.header {
  height: 80px;
  padding-left: 5%;
  padding-right: 5%;
}
</style>

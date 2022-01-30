<template>
  <div class="container min-heigh">
    <h1 class="text-center mb-5">Cart</h1>

    <div v-if="this.cartContent.length === 0" class="text-center font-italic">
      Your cart is empty, try to Add stuff.
    </div>

    <div
      class="row"
      v-for="product in cartContent"
      v-bind:key="`${product.id}${Math.floor(Math.random() * 100000 + 1)}`"
    >
      <div class="col4 col-xl-4 col-lg-4 col-md-4 col-sm-4">
        <img :src="product.mainPicture" style="width: 90px" />
      </div>
      <div class="col6 col-xl-6 col-lg-6 col-md-6 col-sm-6">
        <h4>{{ product.name }}</h4>
        <h6>${{ product.price }}</h6>
      </div>
      <div class="col2 col-xl-2 col-lg-2 col-md-2 col-sm-2 pt-4">
        <span class="btn btn-danger" @click="removeProduct(product.id)"
          >remove</span
        >
      </div>
    </div>
    <div v-if="this.cartContent.length !== 0" class="flex-column pl-3">
      <h6>Quantity : {{ cartQty }}</h6>
      <h4>Total : ${{ cartPrice }}</h4>
    </div>
    <br />
    <div v-if="!loggedIn">
      <h3>You need to be connect to continue</h3>
      <div>
        <router-link to="/login">
          <button class="btn btn-primary">Login</button>
        </router-link>
        or
        <router-link to="/register">
          <button class="btn btn-secondary">Register</button>
        </router-link>
      </div>
    </div>
    <div v-if="this.cartPrice != undefined && loggedIn">
      <div class="d-flex justify-content-end">
        <router-link to="/">
          <button class="btn btn-warning" @click="confirmCart">Confirm</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
export default {
  components: {},
  name: 'PurchaseItem',
  computed: {
    ...mapGetters(['loggedIn']),

    cartContent() {
      return this.$store.state.cartProducts;
    },
    cartPrice() {
      return this.$store.getters.totalPrice;
    },
    cartQty() {
      return this.$store.getters.productsNumber;
    },
  },
  methods: {
    ...mapState(['cartProducts']),
    removeProduct(id) {
      this.$store.dispatch('removeCart', id);
    },
    confirmCart() {
      this.$store
        .dispatch('confirmCart', {
          product: ['/api/products/55', '/api/products/70'],
          productName: 'Emeline test lol',
          productPrice: 76,
          quantity: 2,
          total: 152,
        })
        .then(() => {
          //   this.$router.push({ name: 'Home' });
          console.log('hello');
        })
        .catch((err) => {
          this.errors = err.response.data.violations;
        });
    },
  },
};
</script>

<style scoped>
hr {
  border-color: grey;
}

.row {
  margin-top: 10px;
  margin-bottom: 10px;
  box-shadow: 0px 0px 15px #d1d1d1;
}
</style>

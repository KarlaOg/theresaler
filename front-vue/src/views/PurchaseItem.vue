<template>
  <div class="container min-heigh">
    <h1 class="text-center mb-5">Cart 🛍</h1>

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
        <h6>quantity : {{ product.quantity }}</h6>
      </div>
      <div
        class="col2 col-xl-2 col-lg-2 col-md-2 col-sm-2 pt-4 d-flex align-items-center"
      >
        <!-- <div class="d-flex align-items-center">
          <button class="btn-qty" @click="inc">+</button>
          <span>{{ product.quantity }}</span>
          <button class="btn-qty" @click="dec">-</button>
        </div> -->
        <span
          class="btn-red btn-danger ml-3 d-flex justify-content-center"
          @click="removeProduct(product.id)"
          >x</span
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
    <div v-if="this.cartContent.length !== 0 && loggedIn">
      <div class="d-flex justify-content-end">
        <Delivery />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import Delivery from '../components/Delivery.vue';

export default {
  components: {
    Delivery,
  },
  data() {
    return {
      quan: 1,
    };
  },
  name: 'PurchaseItem',
  computed: mapState({
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
  }),

  methods: {
    ...mapState(['cartProducts']),
    removeProduct(id) {
      this.$store.dispatch('removeCart', id);
    },
    inc() {
      //   this.$store.commit('INC_CART', id);
      //console.log(localStorage.getItem('cart'));
    },
    dec() {
      // Info box Decrememnt button
      //   console.log(this.$store.state.cartProducts);
      //   return this.product.quantity - 1;
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

.trash {
  width: 20px;
  height: fit-content;
  border-radius: 3px;
  cursor: pointer;
  background-color: red;
  margin-left: 30px;
}

.add-to-cart-button {
  width: 90px;
  padding: 20px;
  color: #fff;
  font-size: 10px;
  padding: 10px;
  cursor: pointer;
  margin-left: 20px;
}
.button-dark {
  background-color: #2c3539;
}
.button-disable {
  background-color: grey;
  cursor: not-allowed;
}

control.number {
  border: 0.2px solid lightgrey;
  font-size: 19px;
  font-weight: bold;
  height: 35px;
  width: 155px;
  margin-bottom: 30px;
}
.control.number {
  border: none;
  background: inherit;
  height: 35px;
  outline-style: none;
}
.control.number:active {
  background-color: lightgrey;
}
.control.number h5 {
  margin-left: 13px;
  margin-right: 13px;
}

.ptb-5 {
  padding: 15px;
}

.btn-qty {
  background-color: gainsboro;
  width: 30px;
  margin: 10px;
}
.btn-red {
  width: 30px;
  margin: auto;
  cursor: pointer;
}
</style>

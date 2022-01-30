<template>
  <div class="container py-5" style="padding-top: 70px">
    <div>
      <div class="d-flex mobil">
        <div class="col6 col-xl-6 col-lg-6 mr-5">
          <img class="img-fluid img-c" :src="product.mainPicture" />
        </div>

        <div
          class="col6 col-xl-6 col-lg-6 d-flex align-items-center justify-content-start"
        >
          <div class="info pt-xl-0 pt-lg-0 pt-5">
            <p v-if="product.stock <= 0" class="text-danger font-weight-bold">
              OUT OF STOCK 😱
            </p>

            <h1 class="font-weight-bold text-uppercase pt-3">
              {{ product.name }}
            </h1>
            <h5 class="text-uppercase pt-3">{{ product.brand }}</h5>
            <h4>${{ product.price }}</h4>
            <br /><br /><br />

            <button
              :class="[
                product.stock <= 0 ? 'button-disable' : 'button-dark',
                'add-to-cart-button',
              ]"
              @click="addtoCart(product, product.id)"
              :disabled="product.stock <= 0"
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
      <div class="more info d-flex justify-content-between text-center mt-5">
        <div class="col4 flex-fill">
          <h3 class="font-weight-bold text-left">DESCRIPTION</h3>
        </div>
      </div>
      <div class="container pt-3">
        <div class="row">
          <p>{{ product.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  props: ['id'],
  name: 'ProductShow',
  data() {
    return {
      quantity: 1,
    };
  },
  methods: {
    ...mapActions(['fetchProduct']),

    addtoCart(product) {
      for (var i = 0; i < this.quantity; i++) {
        this.$store.dispatch('addCart', product);
      }
    },
  },
  computed: mapState({
    product: (state) => state.product,
  }),
  created() {
    this.fetchProduct(this.id);
  },
};
</script>

<style scoped>
.img-fluid {
  min-width: 90% !important;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.add-to-cart-button {
  -webkit-transition-duration: 500ms;
  transition-duration: 500ms;
  width: 155px;
  height: 70px;
  color: #fff;
  font-size: 15px;
  padding: 0px 30px;
  cursor: pointer;
  position: relative;
  top: 0;
  z-index: 10;
  border: none;
  box-shadow: 0 26px 38px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.button-dark {
  background-color: #2c3539;
}
.button-disable {
  background-color: grey;
  cursor: not-allowed;
}

.button-dark:hover,
.button-dark:focus {
  background-color: inherit;
  color: black;
}
hr {
  width: 50px;
  border-bottom: 1px solid black;
}

.img-c {
  padding: 10px;
  background: linear-gradient(220.55deg, #ffed46 0%, #ff7ec7 100%);
}

@media screen and (max-width: 575px) {
  .mobil {
    flex-wrap: wrap;
  }
}
</style>

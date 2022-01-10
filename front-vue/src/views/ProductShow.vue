<template>
  <div class="container py-5" style="padding-top: 70px">
    <div>
      <div>
        <div class="col6 col-xl-6 col-lg-6 col-md-12 col-sm-12">
          <img class="img-fluid" :src="product.mainPicture" />
        </div>

        <div
          class="col6 col-xl-6 col-lg-6 col-md-12 col-sm-12 d-flex align-items-center justify-content-start"
        >
          <div class="info pt-xl-0 pt-lg-0 pt-5">
            <h1 class="font-weight-bold text-uppercase pt-3">
              {{ product.name }}
            </h1>
            <h5 class="text-uppercase pt-3">{{ product.brand }}</h5>
            <h4>${{ product.price }}</h4>
            <br /><br /><br />
            <div class="control number text-center">
              <button
                class="decrement-button"
                @click="dec"
                style="
                  border-right: 0.2px solid lightgrey;
                  float: left;
                  margin-right: 11px;
                "
              >
                −
              </button>
              <span>{{ quan }}</span>
              <button
                class="increment-button"
                @click="inc"
                style="border-left: 0.2px solid lightgrey; margin-left: 16px"
              >
                +
              </button>
              <br /><br />
            </div>
            <button
              class="add-to-cart-button"
              @click="addtoCart(product, product.id)"
            >
              ADD TO CART
            </button>
          </div>
        </div>
        <div class="more info d-flex justify-content-between text-center mt-5">
          <div class="col4 flex-fill">
            <h6 class="font-weight-bold">DESCRIPTION</h6>
          </div>
        </div>
        <div class="container pt-3">
          <div class="row">
            <p>{{ product.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductService from '@/services/ProductService';

export default {
  props: ['id'],
  name: 'ProductShow',
  data() {
    return {
      quan: 1,
      product: {},
    };
  },
  methods: {
    inc() {
      // Info box Incrememnt button
      if (this.quan <= 8) return this.quan++;
    },
    dec() {
      // Info box Decrememnt button
      if (this.quan >= 2) return this.quan--;
    },
    addtoCart(product, id) {
      // Info box Add to cart button
      for (var i = 0; i < this.quan; i++) {
        this.$store.commit('ADD_CART', product, id);
      }
    },
  },
  created() {
    ProductService.getProduct(this.id)
      .then((response) => {
        this.product = response.data;
      })
      .catch((err) => console.log(err.message));
  },
};
</script>

<style scoped>
.img-fluid {
  min-width: 90% !important;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.control.number {
  border: 0.2px solid lightgrey;
  font-size: 19px;
  font-weight: bold;
  height: 35px;
  width: 155px;
  margin-bottom: 30px;
}
.control.number button {
  border: none;
  background: inherit;
  width: 56px;
  height: 35px;
  outline-style: none;
}
.control.number button:active {
  background-color: lightgrey;
}
.control.number h5 {
  margin-left: 13px;
  margin-right: 13px;
}
.add-to-cart-button {
  -webkit-transition-duration: 500ms;
  transition-duration: 500ms;
  width: 155px;
  height: 70px;
  background-color: #2c3539;
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
.add-to-cart-button:hover,
.add-to-cart-button:focus {
  background-color: inherit;
  color: black;
}
hr {
  width: 50px;
  border-bottom: 1px solid black;
}
</style>

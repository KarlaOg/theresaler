<template>
  <div class="d-flex flex-row" :key="product.id">
    <div class="item mt-2 mb-3">
      <router-link
        :to="{ name: 'ProductShow', params: { id: product.id } }"
        class="text-decoration-none"
      >
        <div>
          <img
            class="card-img-top"
            :src="product.mainPicture"
            alt="Card image cap "
          />
          <p v-if="product.stock <= 0" class="out top-r">OUT OF STOCK 😱</p>
        </div>
        <div class="text-center d-flex flex-column p-2">
          <span>{{ product.name }}</span>
          <span>${{ product.price }}</span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: [String, Object, Number],
  },
  name: 'ProductCard',
  methods: {
    addtoCart(product) {
      this.$store.dispatch('addCart', product);
    },
  },
};
</script>

<style scoped>
img {
  height: 300px;
}

.disable {
  cursor: not-allowed;
}

.container {
  position: relative;
  text-align: center;
  color: white;
}

.top-r {
  position: absolute;
  top: 25px;
  right: 16px;
}

.out {
  color: white;
  font-weight: bold;
  background-color: red;
  padding: 3px 0px 3px 5px;
  font-size: 14px;
}
.item {
  position: relative;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  width: 300px;
}
</style>

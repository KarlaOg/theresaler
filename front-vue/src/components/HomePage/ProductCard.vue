<template>
  <div class="d-flex flex-row" :key="product.id">
    <div class="card mt-2 mb-3" style="width: 300px">
      <img
        class="card-img-top"
        :src="product.mainPicture"
        alt="Card image cap"
      />
      <div class="card-body">
        <p v-if="product.stock <= 0" class="text-danger">⚠️OUT OF STOCK⚠️</p>
        <h5 class="card-title">{{ product.name }}</h5>
        <p class="card-title">
          <b>{{ product.brand }}</b>
        </p>
        <p class="card-text">${{ product.price }}</p>
      </div>
      <div class="d-flex justify-content-around">
        <button
          type="button"
          :class="[
            product.stock <= 0 ? 'btn btn-secondary disable' : 'btn-success',
            'btn  btn-sm text-decoration-none text-white',
          ]"
          @click="addtoCart(product)"
          :disabled="product.stock <= 0"
        >
          Add +
        </button>
        <router-link :to="{ name: 'ProductShow', params: { id: product.id } }"
          ><button
            type="button"
            class="btn btn-info btn-sm text-decoration-none text-white"
          >
            Info
          </button></router-link
        >
      </div>
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
/* & Group style */
.fade-move {
  transition: transform 1s;
}
/* Card Style */
.card {
  transition: 500ms;
  position: relative;
  overflow: hidden;
}

.card img {
  z-index: 1;
}

.card button {
  width: 140px;
  margin-bottom: 10px;
}

img {
  width: 300px;
  height: 300px;
}

.disable {
  cursor: not-allowed;
}
</style>

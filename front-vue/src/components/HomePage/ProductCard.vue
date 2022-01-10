<template>
  <div class="d-flex flex-row" :key="product.id">
    <div class="card mt-2 mb-3" style="width: 300px">
      <img
        class="card-img-top"
        :src="product.mainPicture"
        alt="Card image cap"
      />
      <div class="overlay">
        <button
          type="button"
          class="btn btn-outline-secondary btn-lg"
          @click="addtoCart(product)"
        >
          Add +
        </button>
        <router-link :to="{ name: 'ProductShow', params: { id: product.id } }"
          ><button type="button" class="btn btn-outline-secondary btn-lg">
            Info
          </button></router-link
        >
      </div>
      <div class="card-body">
        <h5 class="card-title">{{ product.name }}</h5>
        <p class="card-title">
          <b>{{ product.brand }}</b>
        </p>
        <p class="card-text">${{ product.price }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: Object,
  },
  name: 'ProductCard',
  methods: {
    addtoCart(product) {
      this.$store.commit('ADD_CART', product);
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

.card:hover img {
  filter: blur(4px);
}

.card:hover .overlay {
  opacity: 0.8;
}

.card .overlay {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #232b34;
  opacity: 0;
  z-index: 100;
  transition: all 0.3s ease-in;
}

img {
  width: 300px;
  height: 300px;
}
</style>

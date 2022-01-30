<template>
  <div class="padd">
    <h1 class="news">✨ View all news ✨</h1>
    <div class="mt-4">
      <div v-if="loading" class="container text-center min-heigh">
        <h4 style="margin-left: 9rem; margin-right: 9rem">Loading data ...</h4>
      </div>
      <div v-else class="d-flex flex-wrap justify-content-around">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>
      <div class="d-flex align-items-center mb-4">
        <template v-if="page != 1">
          <router-link
            :to="{ name: 'Home', query: { page: page - 1 } }"
            rel="prev"
            ><b>Prev Page</b></router-link
          >
        </template>
        <template v-if="products.length >= 30">
          <router-link :to="{ name: 'Home', query: { page: page + 1 } }"
            ><b>Next Page</b></router-link
          >
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from './ProductCard.vue';
import { mapState } from 'vuex';
export default {
  name: 'ProductList',
  components: {
    ProductCard,
  },

  created() {
    this.$store.dispatch('fetchProducts', {
      page: this.page,
    });
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1;
    },
    ...mapState(['products', 'loading']),
  },
};
</script>

<style scoped>
.btn-outline-secondary {
  border-radius: 0 !important;
}

.card-selector {
  color: #dcdcdc;
  height: 40rem;
  background: #2c3539 !important;
  box-shadow: 0 8px 6px 0 rgba(0, 0, 0, 0.1), 0 26px 70px 0 rgba(0, 0, 0, 0.69);
}

.breadcrumb {
  background: inherit !important;
  color: #2c3539 !important;
  font-size: 20px;
}

.news {
  height: 60px;
  font-size: 20px;
  background: linear-gradient(220.55deg, #ffed46 0%, #ff7ec7 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}

.padd {
  padding-left: 5%;
  padding-right: 5%;
}
</style>

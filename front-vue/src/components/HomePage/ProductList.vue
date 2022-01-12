<template>
  <div>
    <h1 class="pt-3 text-center">New arrivals</h1>
    <nav class="row justify-content-center" aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item active" aria-current="page">Products</li>
      </ol>
    </nav>
    <div class="container grid">
      <div
        v-if="loading"
        class="col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12"
      >
        <h4 style="margin-left: 9rem; margin-right: 9rem">Loading data ...</h4>
      </div>
      <div v-else class="d-flex flex-wrap justify-content-around">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>
      <div class="d-flex align-items-center">
        <template v-if="page != 1">
          <router-link
            :to="{ name: 'Home', query: { page: page - 1 } }"
            rel="prev"
            ><b class="breadcrumb">Prev Page</b></router-link
          >
        </template>
        <template v-if="products.length >= 30">
          <router-link :to="{ name: 'Home', query: { page: page + 1 } }"
            ><b class="breadcrumb">Next Page</b></router-link
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
.container.grid {
  min-height: 60rem;
}

.container.grid a {
  cursor: pointer !important;
}

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

.breadcrumb > li > a {
  text-decoration: none !important;
  color: #2c3539 !important;
}

.breadcrumb > li {
  text-decoration: none !important;
  color: #f2be00 !important;
}
</style>

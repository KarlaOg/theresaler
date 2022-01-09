<template>
  <div>
    <h1 class="pt-3 text-center">New arrivals</h1>
    <nav class="row justify-content-center" aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item active" aria-current="page">Products</li>
      </ol>
    </nav>
    <div class="container grid">
      <div class="row justify-content-around">
        <div class="row justify-content-center">
          <div
            class="row col-xl-9 col-lg-9 col-md-12 col-sm-12 col-xs-12 text-center"
          >
            <!-- <div
              v-if="loading"
              class="col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12"
            >
              <h4 style="margin-left: 9rem; margin-right: 9rem">
                Loading data ...
              </h4>
            </div> -->
            <!-- <div v-else> -->
            <div>
              <ProductCard
                :CardArray="slicedCards"
                v-for="item in items"
                :key="item.id"
              />
              <div
                class="col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 py-5"
              >
                <button
                  type="button"
                  @click="incCardNumber"
                  class="btn btn-outline-secondary btn-lg btn-block"
                >
                  More +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from './ProductCard.vue';
// import { mapState } from 'vuex';
import ProductService from '@/services/ProductService';

export default {
  name: 'ProductList',
  components: {
    ProductCard,
  },
  //   mounted() {
  //     this.$store.dispatch('loadItems');
  //   },
  data() {
    return {
      items: [],
      showCards: 6,
    };
  },
  created() {
    ProductService.getProducts()
      .then((response) => {
        this.items = response.data;
      })
      .catch((err) => console.log(err.message));
  },
  computed: {
    slicedCards() {
      return this.items.slice(0, this.showCards);
    },
    // ...mapState(['items', 'loading']),
  },
  methods: {
    incCardNumber() {
      return (this.showCards += 6);
    },
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

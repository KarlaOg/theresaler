<template>
  <div class="d-flex flex-row">
    <Sidebar />
    <div
      v-if="loading"
      class="col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12"
    >
      <h4 style="margin-left: 9rem; margin-right: 9rem">Loading data ...</h4>
    </div>
    <div v-else>
      <div class="ml-3 mt-3">
        <router-link to="/admin/create-product">
          <button class="btn btn-warning">CREATE NEW PRODUCT</button>
        </router-link>
      </div>
      <div class="d-flex flex-wrap mt-5">
        <div class="m-3" v-for="product in products" :key="product.id">
          <div class="d-flex justify-content-between">
            <button @click="deleteProduct(product.id)" class="btn btn-danger">
              Delete
            </button>
            <button class="btn btn-info">Edit</button>
          </div>
          <router-link :to="{ name: 'ProductEdit', params: { id: product.id } }"
            ><button type="button" class="btn btn-outline-secondary btn-lg">
              KIKOOOOO
            </button></router-link
          >
          <div class="card mt-2 mb-3">
            <img
              class="card-img-top"
              :src="product.mainPicture"
              alt="Card image cap"
            />
            <div class="card-body">
              <h5 class="card-title">{{ product.name }}</h5>
              <p class="card-title">
                <b>{{ product.brand }}</b>
              </p>
              <p>{{ product.id }}</p>

              <p class="card-text">${{ product.price }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex align-items-center">
        <template v-if="page != 1">
          <router-link
            :to="{ name: 'ProductsList', query: { page: page - 1 } }"
            rel="prev"
            ><b class="breadcrumb">Prev Page</b></router-link
          >
        </template>
        <template v-if="products.length >= 30">
          <router-link :to="{ name: 'ProductsList', query: { page: page + 1 } }"
            ><b class="breadcrumb">Next Page</b></router-link
          >
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Admin/Sidebar.vue';
import { mapState } from 'vuex';

export default {
  components: {
    Sidebar,
  },
  props: {
    product: [String, Object, Number],
  },
  name: 'ProductsList',

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
  methods: {
    deleteProduct(id) {
      this.$store.dispatch('deleteProduct', id);
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
.card {
  width: 250px;
  height: 250px;
}

img {
  object-fit: contain;
  height: 100px;
}
</style>

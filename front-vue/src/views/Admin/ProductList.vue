<template>
  <div class="d-flex flex-row">
    <Sidebar />
    <div>
      <div class="ml-3 mt-3">
        <router-link to="/admin/create-product">
          <button class="btn btn-warning">CREATE NEW PRODUCT</button>
        </router-link>
      </div>
      <div class="d-flex flex-wrap">
        <div class="m-3" v-for="product in products" :key="product.id">
          <button @click="deleteProduct(product.id)" class="btn btn-danger">
            Delete
          </button>

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
              <p class="card-text">${{ product.price }}</p>
            </div>
          </div>
        </div>
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
  name: 'ProductList',

  created() {
    this.$store.dispatch('fetchProducts');
  },
  computed: mapState(['products', 'loading']),

  methods: {
    deleteProduct(id) {
      //   console.log(id);
      this.$store.dispatch('deleteProduct', id);
    },
    //   deleteProduct(id) {
    //   console.log(id);
    //   this.$store.commit('DELETE_PRODUCT', id);
    // },
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
  width: 200px;
}

img {
  width: 200px;
}
</style>

<template>
  <div class="d-flex min-heigh">
    <Sidebar />
    <div
      v-if="loading"
      class="col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12"
    >
      <h4 style="margin-left: 9rem; margin-right: 9rem">Loading data ...</h4>
    </div>
    <div class="container m-3">
      <h3 class="mb-2">All purchase</h3>
      <div
        v-for="(p, index) in purchases"
        :key="index"
        class="card mt-2 mb-3 p-3"
      >
        <h4>Purchase # {{ index + 1 }}</h4>
        <p>USER: {{ p.userPurchase }}</p>
        <p>Full name : {{ p.fullName }}</p>
        <p>Address : {{ p.address }}</p>
        <p>Postal code : {{ p.postalCode }}</p>
        <p>City : {{ p.city }}</p>
        <p>Total : ${{ p.total }}</p>
        <p>Status : {{ p.status }}</p>
        <p>Purchased at : {{ p.purchasedAt.substr(0, 10) }}</p>
        <div class="d-flex flex-wrap">
          <div
            v-for="(p, index) in p.purchaseItems"
            :key="index"
            class="card mt-2 mb-3 p-3"
            style="width: 300px"
          >
            <div class="card-body">
              <img
                style="height: 80px; width: 80px"
                :src="p.product.mainPicture"
              />
              <p>Name : {{ p.product.name }}</p>
              <p>Brand : {{ p.product.brand }}</p>
              <p>Description : {{ p.product.description }}</p>
              <p>Price by product: ${{ p.product.price }}</p>
              <p>Qty : {{ p.quantity }}</p>
              <p>Total : ${{ p.total }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex align-items-center justify-content-between">
        <template v-if="page != 1">
          <router-link
            :to="{ name: 'Purchases', query: { page: page - 1 } }"
            rel="prev"
            ><b class="breadcrumb">Prev Page</b></router-link
          >
        </template>
        <template v-if="purchases.length > 30">
          <router-link :to="{ name: 'Purchases', query: { page: page + 1 } }"
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
  name: 'Purchases',
  created() {
    this.$store.dispatch('fetchPurchases', {
      page: this.page,
    });
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1;
    },
    ...mapState(['userInfo', 'purchases', 'loading']),
  },
};
</script>

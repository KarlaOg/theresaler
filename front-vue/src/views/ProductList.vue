<template>
  <div class="container py-5" style="padding-top: 70px">
    <ProductCard :information="information" />
  </div>
</template>

<script>
import ProductCard from '@/components/ProductPage/ProductCard.vue';

export default {
  name: 'ProductList',
  components: {
    ProductCard,
  },
  data() {
    return {
      information: [],
    };
  },
  created() {
    this.information = this.infO;
  },
  computed: {
    infO() {
      return this.$store.getters.infoLength;
    },
    bringItems() {
      return this.$store.state.items;
    },
  },
  methods: {
    sendInfo(it, id) {
      this.$store.commit('addtoInfo', it, id);
    },
  },
};
</script>

<style scoped>
hr {
  width: 50px;
  border-bottom: 1px solid black;
}
.related-item {
  padding-left: 8rem;
  padding-right: 8rem;
  height: auto;
  text-align: center;
}
</style>

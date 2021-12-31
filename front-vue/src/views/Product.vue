<template>
  <div class="container py-5" style="padding-top: 70px">
    <ProductBox :information="information" />
    <ProductText />
  </div>
</template>

<script>
import ProductBox from '@/components/ProductPage/ProductBox.vue';
import ProductText from '@/components/ProductPage/ProductText.vue';

export default {
  name: 'Product',
  components: {
    ProductBox,
    ProductText,
  },
  data() {
    return {
      information: [],
      relatedItems: [],
    };
  },
  created() {
    this.information = this.infO;
    this.relatedItems = this.bringItems;
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

<template>
  <div class="min-heigh">
    <ProductList />
  </div>
</template>

<script>
import ProductList from '@/components/HomePage/ProductList.vue';

export default {
  components: {
    ProductList,
  },
};
</script>
<style>
.min-heigh {
  min-height: 75vh;
}
</style>

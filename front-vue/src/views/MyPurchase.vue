<template>
  <div class="d-flex min-heigh">
    <Sidebar />
    <div class="container m-3">
      <h3 class="mb-2">My purchase</h3>
      TODO
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';
import { mapState } from 'vuex';

export default {
  components: {
    Sidebar,
  },

  computed: mapState(['userInfo']),
};
</script>

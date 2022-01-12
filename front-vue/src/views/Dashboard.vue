<template>
  <div class="d-flex">
    <Sidebar />
    <div class="container m-3">
      <h3 class="mb-2">My info</h3>
      <p>email : {{ userInfo.username }}</p>
      <p>firstname : {{ userInfo.firstname }}</p>
      <p>lastname : {{ userInfo.lastname }}</p>
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

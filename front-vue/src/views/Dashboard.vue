<template>
  <div class="d-flex min-heigh">
    <Sidebar />
    <div class="container m-3">
      <h3 class="mb-2">My info</h3>
      <p>Email : {{ userInfo.username }}</p>
      <p>Firstname : {{ userInfo.firstname }}</p>
      <p>Lastname : {{ userInfo.lastname }}</p>
      <p class="mt-5">You want to change something ? contact admin@admin.com</p>
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

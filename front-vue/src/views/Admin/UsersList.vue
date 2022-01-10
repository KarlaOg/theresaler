<template>
  <div class="d-flex flex-row">
    <Sidebar />
    <div
      v-if="loading"
      class="col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12"
    >
      <h4 style="margin-left: 9rem; margin-right: 9rem">Loading data ...</h4>
    </div>
    <div v-else class="d-flex flex-wrap">
      <div class="m-3" v-for="user in users" :key="user.id">
        <div class="d-flex flex-wrap">
          <div class="card mt-2 mb-3">
            <div class="card-body">
              <h5 class="card-title">email : {{ user.email }}</h5>
              <p class="card-text">firstname : {{ user.firstname }}</p>
              <p class="card-text">lastname : {{ user.lastname }}</p>
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
  name: 'UsersList',

  created() {
    this.$store.dispatch('fetchUsers');
  },
  computed: mapState(['users', 'loading']),
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

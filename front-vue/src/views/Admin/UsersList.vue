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
              <p class="card-text">email : {{ user.email }}</p>
              <p class="card-text">firstname : {{ user.firstname }}</p>
              <p class="card-text">lastname : {{ user.lastname }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex align-items-center">
        <template v-if="page != 1">
          <router-link
            :to="{ name: 'UsersList', query: { page: page - 1 } }"
            rel="prev"
            ><b class="breadcrumb">Prev Page</b></router-link
          >
        </template>
        <template v-if="users.length >= 30">
          <router-link :to="{ name: 'UsersList', query: { page: page + 1 } }"
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
  name: 'UsersList',

  created() {
    this.$store.dispatch('fetchUsers', {
      page: this.page,
    });
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1;
    },
    ...mapState(['users', 'loading']),
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

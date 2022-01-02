<template>
  <div class="login">
    <h1>TO DO LOGIN + ADD FORM PAGE</h1>
    <router-link to="/register"
      >D'ont have a account ? register here</router-link
    >
    <div v-for="user in users" :key="user.id">
      {{ user }}
    </div>
  </div>
</template>
<script>
import UserService from '@/services/UserService';
export default {
  data() {
    return {
      users: [],
    };
  },
  created() {
    UserService.getUsers()
      .then((response) => {
        this.users = response.data;
      })
      .catch((error) => {
        console.log('There was ane error ' + error.response);
      });
  },
};
</script>

<template>
  <div class="container">
    <h1>Register</h1>
    <div class="d-flex">
      <form @submit.prevent="register">
        <label for="email"> Email: </label>
        <input v-model="email" type="email" name="email" value />

        <label for="firstname">firstname: </label>
        <input v-model="firstname" type="text" name="firstname" value />

        <label for="lastname">Lastname: </label>
        <input v-model="lastname" type="text" name="lastname" value />

        <label for="password"> Password: </label>
        <input v-model="password" type="password" name value />

        <button type="submit" name="button" class="btn">Register</button>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
    };
  },
  methods: {
    register() {
      this.$store
        .dispatch('register', {
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$router.push({ name: 'Dashboard' });
        })
        .catch((err) => {
          this.errors = console.log(err.response.data.errors);
        });
    },
  },
};
</script>

<style></style>

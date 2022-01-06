<template>
  <div class="container">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <label for="username"> Email: </label>
      <input v-model="username" type="email" name="username" value />

      <label for="password"> Password: </label>
      <input v-model="password" type="password" name="password" value />

      <p class="text-danger">{{ error }}</p>
      <button type="submit" name="button" class="btn">Login</button>

  ggpush>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      error: null,
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch('login', {
          username: this.username,
          password: this.password,
          errors: null,
        })
        .then(() => {
          this.$router.push({ name: 'Home' });
        })
        .catch((err) => {
          this.error = err.response.data.message;
        });
    },
  },
};
</script>

<style scoped>
/* Add padding to containers */
.container {
  padding: 16px;
}

/* Full-width input fields */
input[type='email'],
input[type='password'] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

input[type='password']:focus {
  background-color: #ddd;
  outline: none;
}

/* Set a style for the submit/register button */
.btn {
  background-color: black;
  color: white;
  padding: 16px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}

.btn:hover {
  opacity: 1;
}

/* Add a blue text color to links */
a {
  color: black;
}
</style>

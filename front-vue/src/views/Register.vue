<template>
  <div class="container min-heigh">
    <h1>Register</h1>
    <button @click="magic(), copyEmail()" class="btn btn-info btn-sm mb-3">
      Click on magic 🪄
    </button>
    <div class="d-flex">
      <form @submit.prevent="register">
        <label for="email"> Email: </label>
        <input v-model="email" type="email" name="email" value ref="myEmail" />

        <label for="firstname">firstname: </label>
        <input v-model="firstname" type="text" name="firstname" value />

        <label for="lastname">Lastname: </label>
        <input v-model="lastname" type="text" name="lastname" value />

        <label for="password"> Password: </label>
        <input v-model="password" type="password" name value />
        <ul class="text-danger">
          <li v-for="err in errors" :key="err.message">
            {{ err.message }}
          </li>
        </ul>
        <button type="submit" name="button" class="btn0">Register</button>

        <router-link to="/login"> Have an account? Login. </router-link>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Register',
  data: function () {
    return {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      errors: null,
    };
  },

  methods: {
    magic() {
      var chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
      var string = '';
      for (var i = 0; i < 15; i++) {
        string += chars[Math.floor(Math.random() * chars.length)];
      }
      this.firstname = 'Jean';
      this.lastname = 'Dupont';
      this.email = `${string}@gmail.com`;
      this.password = 'password';
    },
    async copyEmail() {
      await this.magic();
      const copyText = this.$refs.myEmail;
      copyText.select();
      document.execCommand('copy');
      alert(`
       Email "${copyText.value}" copied!
       Your password is "password"
       `);
    },
    register() {
      this.$store
        .dispatch('register', {
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$router.push({ name: 'Login' });
        })
        .catch((err) => {
          this.errors = err.response.data.violations;
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
input[type='text'],
input[type='email'],
input[type='password'] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

input[type='text']:focus,
input[type='password']:focus {
  background-color: #ddd;
  outline: none;
}

/* Set a style for the submit/register button */
.btn0 {
  background-color: black;
  color: white;
  padding: 16px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}

.btn0:hover {
  opacity: 1;
}

/* Add a blue text color to links */
a {
  color: black;
}
</style>

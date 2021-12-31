<template>
  <div>
    <p v-if="errors.length">
    <b>Please correct the following error(s):</b>
    <ul>
      <li v-for="error in errors" v-bind:key="error.id">{{ error }}</li>
    </ul>
  </p>

    <form action="" @submit="checkForm" method="POST">
      <input
        type="email"
        name=""
        id=""
        placeholder="email"
        v-model="infos.email"
      />
      <input
        type="password"
        name=""
        id=""
        placeholder="password"
        v-model="infos.password"
      />
      <input
        type="text"
        name=""
        id=""
        placeholder="firstname"
        v-model="infos.firstname"
      />
      <input
        type="text"
        name=""
        id=""
        placeholder="lastname"
        v-model="infos.lastname"
      />

      <p>
        <input type="submit" value="Submit" />
      </p>
    </form>
  </div>
</template>

<script>
export default {
  name: "Register",
  data: function () {
    return {
      errors: [],
      infos: { email: "", password: "", firstname: "", lastname: "" },
    };
  },

  methods: {
    checkForm: function (e) {
      if (
        this.infos.email &&
        this.infos.password &&
        this.infos.firstname &&
        this.infos.lastname
      ) {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.infos),
        };
        fetch("http://localhost/api/users", requestOptions)
          .then((response) => response.json())
          .then((data) => (this.postId = data.id));
      
      
        e.preventDefault();
        return true;
      }

      this.errors = [];

      if (!this.mail) {
        this.errors.push("Name required.");
      }
      if (!this.password) {
        this.errors.push("Age required.");
      }
      if (!this.firstname) {
        this.errors.push("Age required.");
      }
      if (!this.lastname) {
        this.errors.push("Age required.");
      }

      e.preventDefault();
    },
  },
};
</script>

<style>
</style>
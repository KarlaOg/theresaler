<template>
  <div class="container">
    <h1>Register</h1>
    <div class="d-flex">
      <Vuemik
      :initialValues="{initialValues}"
      :onSubmit="register"
      v-slot="{ handleSubmit, errors }"
      :validationSchema="ValidationSchema"
    >
      <Field name="email" component="input" type="email" />
      <p v-if="errors.email" class="alert-error">{{errors.email[0]}}</p>
      <Field name="firstname" component="input" type="text" />
      <p v-if="errors.firstname" class="alert-error">{{errors.firstname[0]}}</p>
      <Field name="lastname" component="input" type="text" />
      <p v-if="errors.lastname" class="alert-error">{{errors.lastname[0]}}</p>
      <Field name="password" component="input" type="password" />
      <p v-if="errors.password" class="alert-error">{{errors.password[0]}}</p>
      <Field name="submit" class="btn" component="input" type="submit" @click="handleSubmit" />
      </Vuemik>
    </div>
  </div>
</template>

<script>
import { Vuemik, Field } from '@/components/Vuemik';
import * as Yup from "yup";

export default {
  name: 'Register',
   components: {
      Vuemik,
      Field,
    },
    data: () => ({
       initialValues: {},
        ValidationSchema: Yup.object().shape({
            email: Yup.string().email("Invalid email").required("Required"),
            password: Yup.string().required("Password is required"),
            firstname: Yup.string().required("Firstname is required"),
            lastname: Yup.string().required("Lastname is required"),
        }),
      }),
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

.alert-error {
  margin-top: 10px;
  color: red;
}
</style>

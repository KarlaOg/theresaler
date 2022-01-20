<template>
  <div class="container">
    <h1>Confirm your purchase</h1>
    <div class="d-flex">
      <form @submit.prevent="delivery">
        <label for="fullName">Full name: </label>
        <input v-model="fullName" type="text" name="fullName" value />

        <label for="address">Address: </label>
        <input v-model="address" type="text" name="address" value />

        <label for="postalCode">PostalCode: </label>
        <input v-model="postalCode" type="text" name="postalCode" value />

        <label for="city">City: </label>
        <input v-model="city" type="text" name value />
        <ul class="text-danger">
          <li v-for="err in errors" :key="err.message">
            {{ err.message }}
          </li>
        </ul>
        <button type="submit" name="button" class="btn btn-warning">
          Confirm
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'Delivery',
  computed: {
    ...mapState(['userInfo']),
  },
  data: function () {
    return {
      fullName: '',
      address: '',
      postalCode: '',
      city: '',
      purchasedAt: new Date().toISOString(),
      userPurchase: userInfo.id,
      total: this.$store.getters.totalPrice,
      errors: null,
    };
  },
  methods: {
    delivery() {
      this.$store
        .dispatch('delivery', {
          fullName: this.fullName,
          address: this.address,
          postalCode: this.postalCode,
          city: this.city,
          purchasedAt: this.purchasedAt,
          userPurchase: this.userPurchase,
          total: this.total,
        })
        .then(() => {
          this.$router.push({ name: '/' });
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
input[type='text'] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

input[type='text']:focus {
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

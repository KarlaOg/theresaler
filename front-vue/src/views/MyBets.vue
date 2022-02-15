<template>
  <div class="d-flex min-heigh">
    <Sidebar />

    <div class="container m-3">
      <h3 class="mb-2">My Bet</h3>
      <div v-for="(bet, index) in bets" :key="index" class="card mt-2 mb-3 p-3">
        <span>
          Price offered :
          <p>{{ bet.priceOffer }}</p>
        </span>
        <span
          >Is Offer Accepted ?
          <p>{{ bet.isBetValidated }}</p></span
        >
        <span>
          Product reference :
          <p>{{ bet.productId }}</p></span
        >
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import { mapState } from "vuex";
import axios from "axios";

export default {
  components: {
    Sidebar,
  },
  data() {
    return {
      bets: null,
    };
  },
  methods: {},

  computed: {
    ...mapState(["userInfo"]),
  },

  created() {},

  mounted() {
    axios
      .get(`http://localhost:3001/api/v1/user/${this.userInfo.id}/bets`)
      .then((response) => (this.bets = response.data.bet));
  },
};
</script>

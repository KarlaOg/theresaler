<template>
  <div class="d-flex flex-row">
    <Sidebar />
    <div
      v-if="this.betsByProductId == null"
      class="col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12"
    >
      <h4 style="margin-left: 9rem; margin-right: 9rem">No bets</h4>
    </div>
    <div v-else>
      <div class="ml-3 mt-3">
        <div class="d-flex flex-wrap mt-5">
          <div
            class="m-3"
            v-for="(item, index) in betsByProductId.bet"
            :key="index.id"
          >
            <div class="card mt-2 mb-3">
              <div class="card-body">
                <h5 class="card-title">Bet n° {{index + 1 }}</h5>
                <p class="card-title">
                  <b>Price Offered : </b>
                  <b>{{ item.priceOffer }} $</b>
                </p>
                <p>User ID : {{ item.userId }}</p>
                <button class="btn btn-secondary btn-sm" disabled> Validate </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/Admin/Sidebar.vue";
import { mapState } from "vuex";
export default {
  name: "Bets",
  components: {
    Sidebar,
  },
  data() {
    return {};
  },

  computed: {
    ...mapState(["betsByProductId", "loading"]),
  },

  created() {},
};
</script>

<style>
</style>
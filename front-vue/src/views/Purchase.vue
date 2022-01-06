<template>
  <div class="container-fluid px-1 px-md-2 px-lg-4 py-5 mx-auto">
    <div class="row d-flex justify-content-center">
      <div class="col-xl-7 col-lg-8 col-md-9 col-sm-11">
        <div class="card border-0">
          <div class="row justify-content-center">
            <h3 class="mb-4">Credit Card Checkout</h3>
          </div>
          <div class="row">
            <div class="col-sm-7 border-line pb-3">
              <div class="form-group">
                <p class="text-muted text-sm mb-0">Name on the card</p>
                <input type="text" name="name" placeholder="Name" size="15" />
              </div>
              <div class="form-group">
                <p class="text-muted text-sm mb-0">Card Number</p>
                <div class="row px-3">
                  <input
                    type="text"
                    name="card-num"
                    placeholder="0000 0000 0000 0000"
                    size="18"
                    id="cr_no"
                    minlength="19"
                    maxlength="19"
                  />
                  <p class="mb-0 ml-3">/</p>
                  <img
                    class="image ml-1"
                    src="https://i.imgur.com/WIAP9Ku.jpg"
                  />
                </div>
              </div>
              <div class="form-group">
                <p class="text-muted text-sm mb-0">Expiry date</p>
                <input
                  type="text"
                  name="exp"
                  placeholder="MM/YY"
                  size="6"
                  id="exp"
                  minlength="5"
                  maxlength="5"
                />
              </div>
              <div class="form-group">
                <p class="text-muted text-sm mb-0">CVV/CVC</p>
                <input
                  type="password"
                  name="cvv"
                  placeholder="000"
                  size="1"
                  minlength="3"
                  maxlength="3"
                />
              </div>
            </div>
            <div
              class="col-sm-5 text-sm-center justify-content-center pt-4 pb-4"
            >
              <small class="text-sm text-muted">Payment amount</small>
              <div class="row px-3 justify-content-sm-center mt-2">
                <h2>
                  <span class="text-md font-weight-bold mr-2">$</span
                  ><span class="text-danger">{{ cartPrice }}</span>
                </h2>
              </div>
              <button type="submit" class="btn btn-red text-center mt-4">
                PAY
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    cartPrice() {
      return this.$store.getters.totalPrice;
    },
  },
};
</script>
<style scoped>
body {
  color: #000;
  overflow-x: hidden;
  height: 100%;
  background-color: black;
  background-repeat: no-repeat;
}

.card {
  padding: 30px 25px 35px 50px;
  border-radius: 30px;
  box-shadow: 0px 4px 8px 0px black;
  margin-top: 50px;
  margin-bottom: 50px;
}

.border-line {
  border-right: 1px solid #bdbdbd;
}

.text-sm {
  font-size: 13px;
}

.text-md {
  font-size: 18px;
}

.image {
  width: 60px;
  height: 30px;
}

::placeholder {
  color: grey;
  opacity: 1;
}

:-ms-input-placeholder {
  color: grey;
}

::-ms-input-placeholder {
  color: grey;
}

input {
  padding: 2px 0px;
  border: none;
  border-bottom: 1px solid lightgrey;
  margin-bottom: 5px;
  margin-top: 2px;
  box-sizing: border-box;
  color: #000;
  font-size: 16px;
  letter-spacing: 1px;
  font-weight: 500;
}

input:focus {
  -moz-box-shadow: none !important;
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
  border-bottom: 1px solid black;
  outline-width: 0;
}

button:focus {
  -moz-box-shadow: none !important;
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
  outline-width: 0;
}

.btn-red {
  background-color: #ef5350;
  color: #fff;
  padding: 8px 25px;
  border-radius: 50px;
  font-size: 18px;
  letter-spacing: 2px;
  border: 2px solid #fff;
}

.custom-checkbox .custom-control-input:checked ~ .custom-control-label::before {
  background-color: black;
}

@media screen and (max-width: 575px) {
  .border-line {
    border-right: none;
    border-bottom: 1px solid #eeeeee;
  }
}
</style>

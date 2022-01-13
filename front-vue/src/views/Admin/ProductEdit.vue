<template>
  <div class="d-flex">
    <Sidebar />

    <div class="container m-3">
      <h1>Edit product {{ product.name }}</h1>
      <form class="form-group" @submit.prevent="editProduct">
        <div class="field">
          <label>Name</label>
          <input
            v-model="product.name"
            type="text"
            placeholder="Add an product name"
            class="form-control"
          />

          <label>Description</label>
          <textarea
            v-model="product.description"
            type="text"
            placeholder="Add a description"
            class="form-control"
          />
          <label>Brand</label>
          <input
            v-model="product.brand"
            type="text"
            placeholder="Add a brand"
            class="form-control"
          />

          <label>Sales Type ?</label>
          <select v-model="product.salesType" class="form-control">
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
          <label>stock</label>
          <input
            v-model="product.stock"
            type="number"
            placeholder="Add a stock"
            class="form-control"
          />
          <label>price</label>
          <input
            v-model="product.price"
            type="number"
            placeholder="Add a price"
            class="form-control"
          />
          <div v-if="!mainPicture">
            <label>Upload image</label><br />
            <input type="file" @change="onFileChange" />
          </div>
          <div v-else>
            <br />
            <img :src="mainPicture" />
            <br />
            <br />
            <button @click="removeImage" class="btn btn-danger">
              Remove image
            </button>
          </div>
          <br />
          <ul class="text-danger">
            <li v-for="err in errors" :key="err.message">
              {{ err.message }}
            </li>
          </ul>
        </div>
        <button type="submit" name="button" class="btn btn-success">
          Submit
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Admin/Sidebar.vue';
import { mapState, mapActions } from 'vuex';

export default {
  props: ['id'],
  components: {
    Sidebar,
  },
  computed: mapState({
    product: (state) => state.product,
  }),
  data() {
    return {
      errors: null,
      mainPicture: '',
      date: new Date().toLocaleString(),
    };
  },
  methods: {
    ...mapActions(['fetchProduct']),
    editProduct() {
      this.$store
        .dispatch('editProduct', this.id, {
          name: this.product.name,
          description: this.product.description,
          brand: this.product.brand,
          price: this.product.price,
          mainPicture: this.mainPicture,
          salesType: this.product.salesType,
          date: this.date,
          stock: this.product.stock,
        })
        .then((response) => console.log('heyllo', response.data))
        .catch((err) => {
          console.log(err.message);
        });
    },
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      const reader = new FileReader();
      const vm = this;

      reader.onload = (e) => {
        vm.mainPicture = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage: function () {
      this.mainPicture = '';
    },
  },
  created() {
    this.fetchProduct(this.id);
  },
};
</script>
<style scoped>
.field {
  margin-bottom: 24px;
}
img {
  width: 300px;
}
</style>

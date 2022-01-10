<template>
  <div class="d-flex">
    <Sidebar />

    <div class="container m-3">
      <h1>Create product</h1>
      <form class="form-group" @submit.prevent="createProduct">
        <div class="field">
          <label>Name</label>
          <input
            v-model="name"
            type="text"
            placeholder="Add an product name"
            class="form-control"
          />

          <label>Description</label>
          <textarea
            v-model="description"
            type="text"
            placeholder="Add a description"
            class="form-control"
          />
          <label>Brand</label>
          <input
            v-model="brand"
            type="text"
            placeholder="Add a brand"
            class="form-control"
          />

          <label>Sales Type ?</label>
          <select v-model="salesType" class="form-control">
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
          <label>stock</label>
          <input
            v-model="stock"
            type="number"
            placeholder="Add a stock"
            class="form-control"
          />
          <label>price</label>
          <input
            v-model="price"
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

export default {
  components: {
    Sidebar,
  },
  data: function () {
    return {
      name: '',
      description: '',
      brand: '',
      price: '0',
      stock: 0,
      mainPicture: '',
      salesType: true,
      errors: null,
    };
  },
  methods: {
    createProduct() {
      this.$store
        .dispatch('createProduct', {
          name: this.name,
          description: this.description,
          brand: this.brand,
          price: this.price,
          mainPicture: this.mainPicture,
          salesType: this.salesType,
          stock: parseInt(this.stock),
        })
        .then(() => {
          this.name = '';
          this.description = '';
          this.brand = '';
          this.price = '0';
          this.stock = 0;
          this.price = '0';
          this.mainPicture = '0';
          this.salesType = true;
        })

        .catch((err) => {
          this.errors = err.response.data.violations;
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

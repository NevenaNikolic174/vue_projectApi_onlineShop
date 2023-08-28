<template>
  <div class="container">
    <div class="row justify-content-center align-items-center">
      <h1 class="mt-5">Add new product</h1>
      <form @submit.prevent="addProduct">
        <custom-input name="title" label="Title: " v-model="product.title" type="text" :error="getError('title')"  />
        <custom-input name="description" label="Description: " v-model="product.description" type="textarea" :error="getError('description')"  />
        <custom-input name="price" label="Price: " v-model="product.price" type="number" :error="getError('price')"  />
        <div class="form-group">
          <label for="image">Image: </label>
          <input type="file" id="image" ref="imageInput" @change="imageUpload" accept="image/*" />
        </div>
        <button type="submit" class="btn btn-primary">Add Product</button>
      </form>
    </div>
  </div>
</template>

<script>
import CustomInput from "./CustomInput.vue";

export default {
  components: {
    CustomInput
  },
  data() {
    return {
      product: {
        title: "",
        description: "",
        price: null,
        image: null,
      },
      submitted: false,
      errors: {},
    };
  },
  methods: {
    addProduct() {
      this.submitted = true;
      if (this.validateForm()) {
        var products = JSON.parse(localStorage.getItem("products")) || [];
        var lastProductId = products.length > 0 ? products[products.length - 1].id : 0;
        var newProductId = lastProductId + 1;
        var newProduct = {
          id: newProductId,
          ...this.product,
        };
        products.push(newProduct);
        localStorage.setItem("products", JSON.stringify(products));
        this.$store.commit("setProducts", products);
        this.$router.push("/products");
      }
    },
    imageUpload(event) {
      var file = event.target.files[0];
      if (file) {
        this.product.image = URL.createObjectURL(file);
      }
    },
    validateForm() {
      this.errors = {};
      let isValid = true;

      if (!this.product.title) {
        this.errors.title = "Title is required.";
        isValid = false;
      }

      if (!this.product.description) {
        this.errors.description = "Description is required.";
        isValid = false;
      }

      if (!this.product.price || this.product.price <= 0) {
        this.errors.price = "Price must be a positive number.";
        isValid = false;
      }

      return isValid;
    },
    getError(field) {
      if (this.submitted && this.errors[field]) {
        return this.errors[field];
      }
      return "";
    },
  },
};
</script>

<style scoped>
.container {
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.row {
  width: 100%;
  max-width: 400px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f7f7f7;
}

.form-group {
  margin-bottom: 15px;
}

.btn-primary {
  width: 100%;
}

.error {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}
</style>

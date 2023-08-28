<template>
  <div class="container">
    <div class="row justify-content-center align-items-center">
      <h1 class="mt-5">Edit product</h1>
      <form @submit.prevent="updateProduct">
        <custom-input name="title" label="Title:" v-model="product.title" type="text" :error="errors.title"  />
        <custom-input name="description" label="Description:" v-model="product.description" type="textarea" :error="errors.description"  />
        <custom-input name="price" label="Price:" :value="product.price" type="number" :error="errors.price"  />
        <div class="form-group">
          <label for="image">Image:</label>
          <input type="file" @change="handleFileChange" accept="image/*" />
        </div>
        <button type="submit" class="btn btn-primary">Edit product</button>
      </form>
    </div>
  </div>
</template>

<script>
import CustomInput from "./CustomInput.vue";

export default {
  name: "EditProductComponent",
  data() {
    return {
      product: {
        id: this.$route.params.id,
        title: "",
        description: "",
        price: 0,
        image: "",
      },
      errors: {
        title: "",
        description: "",
        price: "",
      },
    };
  },
  components: {
    CustomInput,
  },
  methods: {
    updateProduct() {
      if (this.validateForm()) {
        this.$store.commit("updateProduct", this.product);
        localStorage.setItem("updatedProduct", JSON.stringify(this.product)); 
        this.$router.push("/products");
      }
    },
    handleFileChange(event) {
      var file = event.target.files[0];
      this.convertImageToDataBase(file);
    },
    convertImageToDataBase(file) {
      var reader = new FileReader();
      reader.onload = (event) => {
        this.product.image = event.target.result;
      };
      reader.readAsDataURL(file);
    },
    validateForm() {
      this.clearErrors();
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
    clearErrors() {
      this.errors.title = "";
      this.errors.description = "";
      this.errors.price = "";
    },
  },
  created() {
    var product = this.$store.getters.getProductById(this.$route.params.id);
    if (product) {
      this.product.title = product.title;
      this.product.description = product.description;
      this.product.price = product.price;
      this.product.image = product.image;
    }
  },
  mounted() {
    var updatedProduct = JSON.parse(localStorage.getItem("updatedProduct"));
    if (updatedProduct && updatedProduct.id === this.product.id) {
      this.product = updatedProduct;
      localStorage.removeItem("updatedProduct"); 
    }
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
</style>

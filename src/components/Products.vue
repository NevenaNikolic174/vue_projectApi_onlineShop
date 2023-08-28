<template>
  <div class="container">
    <h1 class="mt-5">WEBIO SHOP</h1>
    <small class="mt-5">See our top products</small>
    <div class="row">
      <div class="col-md-6" id="searchStyle">
        <div class="input-group mb-3">
          <input type="text" class="form-control" v-model="searchTerm" placeholder="Search by title..." />
        </div>
      </div>
    </div>
    <div class="row">
      <div v-for="item in filteredProducts" :key="item.id" class="col-lg-3 col-md-4 col-sm-6">
        <div class="card mb-4">
          <div class="aspect-ratio">
            <img v-if="item.image" :src="item.image" :alt="item.title" class="card-img-top" />
          </div>
          <div class="card-body">
            <p class="card-text"><strong>ID:</strong> {{ item.id }}</p>
            <h5 class="card-title">{{ item.title }}</h5>
            <p class="card-text">{{ skratiTekst(item.description) }}</p>
            <p class="card-text"><strong>Price:</strong> ${{ item.price }}</p>
            <div class="text-center">
              <button v-if="isUserRole('user')" @click="addToCart(item)" class="btn btn-primary">Add to Cart</button>
              <button v-if="isAdmin" @click="editProduct(item)" class="btn btn-primary">Edit</button>
              <button v-if="isAdmin" @click="deleteProduct(item)" class="btn btn-danger">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ProductsComponent',
  data() {
    return {
      searchTerm: '',
    };
  },
  computed: {
    ...mapGetters(['getProducts', 'getProductById']),
    isAdmin() {
      var role = localStorage.getItem('role');
      return role === 'admin';
    },
    products() {
      return this.getProducts;
    },
    filteredProducts() {
      var searchTerm = this.searchTerm.toLowerCase();
      return this.products.filter(
        (product) =>
          product.title?.toLowerCase().includes(searchTerm) &&
          (this.isAdmin || this.isUserRole('user'))
      );
    },
  },
  methods: {
    ...mapActions(['fetchProducts', 'updateProduct', 'addToCart']),
    isUserRole(role) {
      var userRole = localStorage.getItem('role');
      return userRole === role;
    },
    editProduct(product) {
      this.$router.push({
        name: 'edit-product',
        params: {
          id: product.id,
        },
      });
    },
    deleteProduct(product) {
      if (confirm('Are you sure you want to delete this product?')) {
        this.$store.commit('deleteProduct', product.id);
        localStorage.setItem('deletedProduct', JSON.stringify(product.id));
      }
    },
    async fetchProducts() {
      var storedProducts = JSON.parse(localStorage.getItem('products'));
      if (storedProducts && storedProducts.length > 0) {
        this.$store.commit('setProducts', storedProducts);
      } else {
        try {
          await this.$store.dispatch('fetchProducts');
        } catch (error) {
          console.error(error);
        }
      }
    },
    addToCart(product) {
      var existingProductIndex = this.$store.state.cartItems.findIndex((item) => item.id === product.id);

      if (existingProductIndex !== -1) {
        this.$store.state.cartItems[existingProductIndex].quantity += 1;
      } else {
        product.quantity = 1;
        this.$store.commit('addToCart', product); 
      }

      var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      var existingCartItem = cartItems.find((item) => item.id === product.id);

      if (existingCartItem) {
        existingCartItem.quantity += 1; 
      } else {
        product.quantity = 1;
        cartItems.push(product);
      }

      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      this.$router.push('/cart');
    },
    skratiTekst(description) {
      const maxLength = 100;
      if (description.length <= maxLength) {
        return description;
      } else {
        return description.slice(0, maxLength) + '...';
      }
    },
  },
  created() {
    this.fetchProducts();
  },
  mounted() {
    var updatedProduct = JSON.parse(localStorage.getItem('updatedProduct'));
    if (updatedProduct) {
      this.$store.commit('updateProduct', updatedProduct);
      localStorage.removeItem('updatedProduct');
    }
  },
};
</script>

<style scoped>
.container {
  margin-top: 40px;
}

.card {
  border: 1px solid #dee2e6;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 2rem;
}

.aspect-ratio {
  padding-top: 100%;
  position: relative;
  overflow: hidden;
}

.card-img-top {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-body {
  padding: 1rem;
}

.card-title {
  margin-top: 0.5rem;
  margin-bottom: 0.75rem;
  font-size: 1.25rem;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-text {
  margin-bottom: 0.75rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

#searchStyle {
  margin-top: 2rem;
}

.btn {
  margin-top: 0.5rem;
}
</style>

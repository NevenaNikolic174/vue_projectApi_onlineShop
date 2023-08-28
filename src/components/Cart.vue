<template>
  <div>
    <h1>Cart</h1>
    <div v-if="cartItems.length === 0">
      <p>Cart is empty.</p>
    </div>
    <div v-else>
      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Image</th>
              <th>SN</th>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cartData" :key="item.id">
              <td>
                <img v-if="item.image" :src="item.image" :alt="item.title" width="150" />
              </td>
              <td>{{ item.id }}</td>
              <td>{{ item.title }}</td>
              <td>{{ skratiTekst(item.description) }}</td>
              <td>${{ item.price }}</td>
              <td>
                <div class="input-group">
                  <button @click="decreaseQuantity(item)" :disabled="item.quantity === 1" class="btn btn-outline-primary input-group-text">-</button>
                  <span class="form-control">{{ item.quantity }}</span>
                  <button @click="increaseQuantity(item)" class="btn btn-outline-primary input-group-text">+</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="text-end">
        <button @click="buyItems" class="btn btn-success">Kupi</button>
        <button @click="deleteAllItems" class="btn btn-danger">Obriši sve stavke</button>
      </div>
      <p class="alert alert-success">Total price: ${{ totalPrice }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartComponent',
  computed: {
    cartItems() {
      return this.$store.getters.getCartItems;
    },
    cartData() {
      var cartItems = this.cartItems;
      var cartData = [];

      cartItems.forEach((item) => {
        var existingItem = cartData.find((i) => i.id === item.id);
        if (existingItem) {
          existingItem.quantity += item.quantity; 
        } else {
          var itemWithQuantity = { ...item, quantity: item.quantity }; 
          cartData.push(itemWithQuantity);
        }
      });

      return cartData;
    },
    totalPrice() {
      return this.cartData.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      );
    },
  },
  methods: {
    skratiTekst(description) {
      var maxLength = 100; 
      if (description.length > maxLength) {
        return description.substr(0, maxLength) + '...'; 
      } else {
        return description; 
      }
    },
    increaseQuantity(item) {
      this.$store.dispatch('increaseCartItemQuantity', item.id);
    },
    decreaseQuantity(item) {
      this.$store.dispatch('decreaseCartItemQuantity', item.id);
    },
    deleteAllItems() {
      this.$store.commit('deleteAllCartItems');
    },
    buyItems() {
      this.$store.commit('deleteAllCartItems');
      this.$router.push('/products');
    },
  
  },
};
</script>

<style scoped>
.input-group {
  width: 120px;
  margin: auto;
}

.form-control {
  text-align: center;
  padding-left: 0;
  padding-right: 0;
  border: none;
}

.btn-outline-primary {
  border-color: #007bff;
  color: #007bff;
}

.btn-outline-primary:hover {
  background-color: #007bff;
  color: #fff;
}

.btn-danger {
  margin-right: 10px;
}

.btn-success {
  margin-right: 10px;
}
</style>

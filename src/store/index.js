import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const API_URL = 'https://fakestoreapi.com';

export default new Vuex.Store({
  state: {
    registrationData: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: '',
    },
    registeredUsers: [],
    products: [],
    cartItems: [],
  },
  mutations: {
    updateRegistrationData(state, data) {
      state.registrationData = data;
      localStorage.setItem('registrationData', JSON.stringify(data));
    },
    restoreRegistrationData(state) {
      var registrationData = JSON.parse(localStorage.getItem('registrationData'));
      if (registrationData) {
        state.registrationData = registrationData;
      }
    },
    addRegisteredUser(state, user) {
      state.registeredUsers.push(user);
      localStorage.setItem('registeredUsers', JSON.stringify(state.registeredUsers));
    },
    restoreRegisteredUsers(state) {
      var registeredUsers = JSON.parse(localStorage.getItem('registeredUsers'));
      if (registeredUsers) {
        state.registeredUsers = registeredUsers;
        state.products = JSON.parse(localStorage.getItem('products')) || [];
      }
    },
    persistRegisteredUsers(state) {
      localStorage.setItem('registeredUsers', JSON.stringify(state.registeredUsers));
    },
    setProducts(state, products) {
      state.products = products;
      localStorage.setItem('products', JSON.stringify(products));
    },
    setCartItems(state, cartItems) {
      state.cartItems = cartItems;
    },
    deleteProduct(state, productId) {
      var index = state.products.findIndex((product) => product.id === productId);
      if (index !== -1) {
        state.products.splice(index, 1);
        localStorage.setItem('products', JSON.stringify(state.products));
      }
    },
    updateProduct(state, updatedProduct) {
      var index = state.products.findIndex((product) => product.id === updatedProduct.id);
      if (index !== -1) {
        state.products.splice(index, 1, updatedProduct);
        localStorage.setItem('products', JSON.stringify(state.products));
      }
    },
    addToCart(state, product) {
      var existingProduct = state.cartItems.find((item) => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        var productWithQuantity = { ...product, quantity: 1 };
        state.cartItems.push(productWithQuantity);
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    increaseCartItemQuantity(state, productId) {
      var product = state.cartItems.find((item) => item.id === productId);
      if (product) {
        product.quantity += 1;
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      }
    },
    decreaseCartItemQuantity(state, productId) {
      var product = state.cartItems.find((item) => item.id === productId);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      }
    },
    deleteAllCartItems(state) {
      state.cartItems = [];
      localStorage.removeItem('cartItems');
    },
  },
  actions: {
    initializeStore({ commit, dispatch }) {
      commit('restoreRegistrationData');
      commit('restoreRegisteredUsers');
      dispatch('fetchProducts'); 
      dispatch('fetchCartItems');
    },
    async fetchProducts() {
      var storedProducts = JSON.parse(localStorage.getItem('products'));
      var store = this; 
    
      if (storedProducts && storedProducts.length > 0) {
        store.commit('setProducts', storedProducts);
      } else {
        try {
          await store.dispatch('fetchProductsFromAPI');
        } catch (error) {
          console.error(error);
        }
      }
    },
    async fetchProductsFromAPI({ commit }) {
      try {
        var response = await axios.get(`${API_URL}/products`);
        var products = response.data;
        commit('setProducts', products);
      } catch (error) {
        console.error(error);
      }
    },
    async fetchCartItems({ commit }) {
      var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      commit('setCartItems', cartItems);
    },
    addToCart({ commit }, product) {
      commit('addToCart', product);
    },
    increaseCartItemQuantity({ commit }, productId) {
      commit('increaseCartItemQuantity', productId);
    },
    decreaseCartItemQuantity({ commit }, productId) {
      commit('decreaseCartItemQuantity', productId);
    },
  },
  getters: {
    getRegisteredUsers(state) {
      return state.registeredUsers;
    },
    getProducts(state) {
      return state.products;
    },
    getProductById: (state) => (productId) => {
      return state.products.find((product) => product.id === productId);
    },
    getCartItems(state) {
      return state.cartItems;
    },
  },
});
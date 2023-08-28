import Vue from 'vue';
import App from './App.vue';

import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.js";
import "bootstrap/dist/js/bootstrap.min.js";

import Login from "./components/Login.vue";
import Products from './components/Products.vue';
import AddProduct from "./components/AddProduct.vue";
import EditProduct from "./components/EditProduct.vue";
import Register from "./components/Register.vue";
import Cart from "./components/Cart.vue";
import Author from "./components/Author.vue";

import VueRouter from 'vue-router';
import store from './store';

var routes = [
  { path: "/login", component: Login},
  { path: "/products", component: Products},
  { path: "/add-product", component: AddProduct, meta: { requiresAdmin: true } },
  { path: "/edit-product/:id", name: "edit-product", component: EditProduct, meta: { requiresAdmin: true } },
  { path: "/register", component: Register },
  { path: "/", component: Login},
  { path: "/cart", component: Cart },
  { path: "/author", component: Author },
];


const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  var requiresAdmin = to.matched.some((record) => record.meta.requiresAdmin);
  var role = localStorage.getItem("role");
  if (requiresAdmin && role !== "admin") {
    next("/products"); 
  } else {
    next();
  }
});

Vue.prototype.$baseApiUrl = 'https://online-movie-database.p.rapidapi.com/auto-complete'

Vue.use(VueRouter)

new Vue({
  router,
  store,
  beforeCreate() {
    this.$store.dispatch('initializeStore');
  },
  render: h => h(App)
}).$mount('#app')

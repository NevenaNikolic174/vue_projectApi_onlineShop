<template>
  <div id="app">
    <Head/>
      <body>
        <Nav :links="navigations" :isLoggedIn="isLoggedIn" @LoggedOut="onLogout" />
          <router-view @LoggedIn="onLogin"></router-view>
        <Footer/>
     </body>
  </div>
</template>

<script>
import Head from "./components/Head.vue";
import Nav from "./components/Nav.vue";
import Footer from "./components/Footer.vue";

export default {
  name: 'App',
  components: {
    Head,
    Nav,
    Footer
  },
  data() {
    return {
      isLoggedIn: false,
      userData: null
    };
  },
  mounted() {
    var token = localStorage.getItem("token");
    if (token) {
      
      this.userData = JSON.parse(localStorage.getItem("userData"));
      this.isLoggedIn = true;
    }
  },
  computed: {
    navigations() {
      if (!this.isLoggedIn) {
        return [
          {
            link: "/login",
            text: "Login",
          },
          {
            link: "/register",
            text: "Register",
          },
          {
            link: "/author",
            text: "Author",
          },
        ];
      } else {
        return [
          {
            link: "/products",
            text: "Products",
          },
          {
            link: "/add-product",
            text: "Add Product",
            requiresAdmin: true,
          },
          {
            link: "/cart",
            text: "Cart",
          },
        ];
      }
    },
  },
  methods: {
    onLogin(userData) {
      this.userData = userData;
      this.isLoggedIn = true;
    },
    onLogout() {
      localStorage.removeItem("token");
      this.isLoggedIn = false;
      this.userData = null;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

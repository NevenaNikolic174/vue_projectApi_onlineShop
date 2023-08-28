<template>
  <header id="header" class="header d-flex align-items-center fixed-top">
    <div class="container-fluid container-xl d-flex align-items-center justify-content-between">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Navbar</a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <router-link v-for="(link, index) in filteredLinks" :key="index" :to="link.link" class="nav-link">
              <span class="mr-2">{{ link.text }}</span>
            </router-link>
          </div>
          <span v-if="isLoggedIn" @click="logout" id="odjava" class="nav-link mr-2">Log out</span>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: "NavComponent",
  props: {
    links: {
      type: Array,
      required: true,
    },
    isLoggedIn: {
      type: Boolean,
    },
  },
  computed: {
    filteredLinks() {
      if (!this.isLoggedIn) {
        return this.links.filter((link) => link.text === "Login" || link.text === "Register" || link.text === "Author");
      } else {
        const role = localStorage.getItem("role");
        if (role === "admin") {
          return this.links.filter((link) => link.text !== "Login" && link.text !== "Register" && link.text !== "Cart");
        } else if (role === "user") {
          return this.links.filter((link) => link.text === "Products" || link.text === "Cart" || link.text === "Odjava");
        }
      }
      return [];
    },
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      localStorage.removeItem("role");
      this.$router.push("/login");
      this.$emit("LoggedOut");
    },
  },
};
</script>

<style scoped>
.header {
  background-color: #f8f9fa;
  padding: 10px 0;
}

.navbar {
  padding: 0;
}

.navbar-brand {
  font-size: 20px;
  font-weight: bold;
}

.navbar-toggler {
  border: none;
  outline: none;
}

.nav-link {
  font-size: 16px;
}

.nav-link:hover {
  text-decoration: none;
}

.nav-link:focus {
  outline: none;
}

#odjava{
  border: 2px solid #f1dbdb;
  border-radius: 4px;
  background-color: #f1dbdb;
  color:#000;
  width: 80px;
  padding: 2px;
}
</style>

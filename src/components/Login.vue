<template>
  <div class="container py-5 h-100">
    <div class="row d-flex align-items-center justify-content-center h-100">
      <h1 class="mt-5">Login</h1>
      <form @submit.prevent="login" class="col-lg-6">
        <custom-input name="email" label="Email:" v-model="email" type="email" placeholder="Enter email" />
        <custom-input name="password" label="Password:" v-model="password" type="password" placeholder="Enter password" />
        <button type="submit" class="btn btn-primary btn-block">Login</button>
        <p v-if="showError" :class="errorClass" class="mt-3">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import CustomInput from "./CustomInput.vue";

export default {
  name: "LoginComponent",
  components: {
    CustomInput
  },
  data() {
    return {
      email: "",
      password: "",
      showError: false,
      errorMessage: "",
    };
  },
  methods: {
    login() {
      this.showError = false;

      if (!this.validateFields()) {
        return;
      }

      const registeredUser = this.findRegisteredUser();

      if (!registeredUser) {
        this.showError = true;
        this.errorMessage = "Wrong credentials";
        return;
      }

      try {
        const token = "53049f4220msh8959990d895484fp100e0ajsn4747dd0ce868";
        const userData = {
          email: registeredUser.email,
          password: registeredUser.password,
        };

        localStorage.setItem("token", token);
        localStorage.setItem("userData", JSON.stringify(userData));
        localStorage.setItem("role", registeredUser.role);

        this.$emit("LoggedIn", userData);
        this.$router.push("/products");
      } catch (error) {
        this.showError = true;
        this.errorMessage = "An error occurred while logging in.";
      }
    },
    findRegisteredUser() {
      return this.$store.state.registeredUsers.find((user) => user.email === this.email && user.password === this.password);
    },
    validateFields() {
      if (this.email.trim() === "" || this.password.trim() === "") {
        this.showError = true;
        this.errorMessage = "Please fill in all fields";
        return false;
      }
      return true;
    },
   
  },
  computed: {
    errorClass() {
      return this.showError ? "alert alert-danger" : "";
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
  max-width: 400px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f7f7f7;
}

.btn-primary {
  width: 100%;
}
</style>

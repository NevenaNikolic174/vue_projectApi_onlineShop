<!--Register.vue-->
<template>
  <div class="container">
    <div class="row justify-content-center align-items-center">
      <h1 class="mt-5">Registration</h1>
    <form @submit.prevent="submitForm">
      <custom-input name="firstName" label="First Name" v-model="firstName" placeholder="Enter first name" />
      <custom-input name="lastName" label="Last name" v-model="lastName" placeholder="Enter last name" />
      <custom-input name="email" label="Email" v-model="email" type="email" placeholder="Enter email" />
      <custom-input name="password" label="Password" v-model="password" type="password" placeholder="Password" />
      <button type="submit" class="btn btn-primary">Registration</button>
    </form>
      <div v-if="hasError" class="alert alert-danger">
        <p v-if="!firstName.trim()">First name is required.</p>
        <p v-if="!lastName.trim()">Last name is required.</p>
        <p v-if="!email.trim()">Email is required.</p>
        <p v-if="!password.trim()">Password is required.</p>
        <p v-if="duplicateEmail">Email already exists.</p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex';

import CustomInput from "./CustomInput.vue";

export default {
  name: "RegisterComponent",
  components: {
    CustomInput
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      hasError: false,
      registrationSuccess: false,
      duplicateEmail: false,
    };
  },
  methods: {
    ...mapMutations(['updateRegistrationData', 'addRegisteredUser', 'persistRegisteredUsers']),
    submitForm() {
      if (this.validateForm()) {
        this.saveDataToStore();
        this.hasError = false;
        this.registrationSuccess = true;
      } else {
        this.hasError = true;
        this.registrationSuccess = false;
      }
    },
    validateForm() {
      if (
        this.firstName.trim() === "" ||
        this.lastName.trim() === "" ||
        this.email.trim() === "" ||
        this.password.trim() === ""
      ) {
        return false;
      }

      var duplicateEmail = this.$store.state.registeredUsers.some(
        (user) => user.email === this.email
      );
      if (duplicateEmail) {
        this.duplicateEmail = true; 
        return false;
      }

      return true;
    },

    saveDataToStore() {
      const data = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        role: 'user',
      };

      var duplicateEmail = this.$store.state.registeredUsers.some(
        (user) => user.email === this.email
      );
      if (duplicateEmail) {
     
        return;
      }

      this.updateRegistrationData(data);
      this.addRegisteredUser(data);
      this.persistRegisteredUsers();
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
.error-message {
  margin-top: 10px;
  color: red;
}
</style>

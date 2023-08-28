<template>
  <div class="form-group">
    <label :for="name">{{ label }}</label>
    <input :id="name" :name="name" :value="value" :type="type" @input="$emit('input', $event.target.value)" :required="required" />
    <span class="alert alert-danger greska" v-if="error">{{ error }}</span>
  </div>
</template>

<script>
export default {
  name: "CustomInput",
  props: {
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    value: {
      type: [String, Number],
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    error: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
};
</script>


<style scoped>
.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}

.form-control:focus {
  color: #495057;
  background-color: #fff;
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}
.greska{
  padding:2px;
  display:inline-block;
}
</style>

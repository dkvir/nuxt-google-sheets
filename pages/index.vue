<template>
  <div class="home-page flex-center">
    <form @submit.prevent="submitForm" class="form">
      <input
        v-model="form.name"
        name="name"
        type="text"
        class="input"
        placeholder="name..."
        required
      />
      <input
        v-model="form.lastName"
        name="lastName"
        type="text"
        class="input"
        placeholder="last name..."
        required
      />
      <input
        v-model="form.email"
        name="email"
        type="email"
        class="input"
        placeholder="email..."
        required
      />
      <input
        v-model="form.subscribe"
        type="checkbox"
        name="some question"
        class="input"
        required
      />
      <button class="button" @submit.prevent="submitForm">Submit</button>
    </form>
  </div>
</template>

<script setup>
import { allRows } from "@/composables/useSheet";

const { data } = await allRows().then((res) => {
  console.log("res", res);
});

const form = reactive({
  name: "",
  lastName: "",
  email: "",
  subscribe: false,
});

const submitForm = () => {
  console.log("Form submitted:", form);

  form.value = {
    name: "",
    lastName: "",
    email: "",
    subscribe: false,
  };
};
</script>

<style lang="scss" scoped>
.home-page {
  width: 100vw;
  height: 100vh;
  .form {
    width: css-clamp(300px, 800px);
    border-radius: 10px;

    .input {
      width: 100%;
      padding: 10px;
      margin: 10px 0;
      border: 1px solid var(--color-black);
      border-radius: 5px;
    }

    .button {
      padding: 20px 40px;
      background-color: var(--color-yellow);
      border-radius: 10px;
    }
  }
}
</style>
